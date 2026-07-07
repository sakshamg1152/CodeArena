import httpStatus from "http-status";
import { Problem } from "../models/problem.model.js";
import { Submission } from "../models/submission.model.js";
import executeCode from "../utils/wandbox.util.js";

const submitCode = async (req, res) => {
    try {

        const { problemId, code, language } = req.body;

        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "Problem not found"
            });
        }

        let status = "Accepted";
        let passedTestCases = 0;
        let lastOutput = "";
        let totalRuntime = 0;
        const memory = Math.floor(Math.random() * 2500) + 1000;

        for (const testCase of problem.testCases) {

            const start = Date.now();

            const result = await executeCode(
                code,
                language,
                testCase.input,
                problem
            );

            totalRuntime += Date.now() - start;

            if (result.compile_output) {
                status = "Compilation Error";
                lastOutput = result.compile_output.trim();
                break;
            }

            if (result.stderr) {
                status = "Runtime Error";
                lastOutput = result.stderr.trim();
                break;
            }

            const actualOutput = result.stdout.trim();
            lastOutput = actualOutput;

            console.log("----------------------------");
            console.log("Input:");
            console.log(testCase.input);
            console.log("Expected:", testCase.output);
            console.log("Actual:", actualOutput);

            if (actualOutput !== testCase.output.trim()) {
                status = "Wrong Answer";
                break;
            }

            passedTestCases++;
        }

        const submission = await Submission.create({

            userId: req.user._id,
            problemId,
            code,
            language,

            status,

            runtime: totalRuntime,
            memory,

            submittedAt: Date.now(),

            input: problem.testCases[0].input,
            output: lastOutput,
            expectedOutput: problem.testCases[0].output,

            passedTestCases,
            totalTestCases: problem.testCases.length

        });

        return res.status(httpStatus.CREATED).json({

            success: true,

            submission,

            result: {

                status,

                language,

                input: problem.testCases[0].input,

                expected: problem.testCases[0].output,

                output: lastOutput,

                runtime: totalRuntime,

                memory,

                passed: passedTestCases,

                total: problem.testCases.length

            }

        });

    } catch (error) {

        console.log(error);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        });

    }
};

const getSubmissionById = async (req, res) => {

    try {

        const submission = await Submission.findById(req.params.id);

        if (!submission) {

            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "Submission not found"
            });

        }

        return res.json({
            success: true,
            submission
        });

    } catch (error) {

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        });

    }

};

export { submitCode, getSubmissionById };