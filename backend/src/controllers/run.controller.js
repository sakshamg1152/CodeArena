import executeCode from "../utils/wandbox.util.js";
import { Problem } from "../models/problem.model.js";


const runCode = async (req, res) => {
    try {

        const { code, language, input, problemId } = req.body;

        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                success: false,
                output: "Problem not found"
            });
        }

        const startTime = Date.now();

        const result = await executeCode(
            code,
            language,
            input,
            problem
        );

        const endTime = Date.now();

        let status = "Accepted";
        let output = "";

        if (result.compile_output) {
            status = "Compilation Error";
            output = result.compile_output;
        } else if (result.stderr) {
            status = "Runtime Error";
            output = result.stderr;
        } else {
            output = result.stdout;
        }

        res.status(200).json({
            success: true,
            status,
            input,
            output,
            executionTime: `${endTime - startTime} ms`,
            memory: "N/A"
        });

    } catch (error) {

    console.log("RUN CONTROLLER ERROR");
    console.log(error);

    res.status(500).json({
        success: false,
        status: "Internal Server Error",
        output: error.message
    });

}
};

export default runCode;