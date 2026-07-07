import httpStatus from "http-status";
import { Submission } from "../models/submission.model.js";
import { Problem } from "../models/problem.model.js";

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch submissions
    const submissions = await Submission.find({ userId })
      .populate("problemId")
      .sort({ createdAt: -1 });

    // Remove submissions whose problem no longer exists
    const validSubmissions = submissions.filter(
      (sub) => sub.problemId !== null
    );

    const totalSubmissions = validSubmissions.length;

    const acceptedSubmissions = validSubmissions.filter(
      (sub) => sub.status === "Accepted"
    );

    // Unique solved problems
    const solvedProblems = new Set(
      acceptedSubmissions.map((sub) => sub.problemId._id.toString())
    ).size;

    const acceptanceRate =
      totalSubmissions === 0
        ? 0
        : Math.round(
            (acceptedSubmissions.length / totalSubmissions) * 100
          );

    // Last 5 submissions
    const recentSubmissions = validSubmissions.slice(0, 5);

    // Continue Solving
    const continueProblems = [];
    const visited = new Set();

    for (const sub of validSubmissions) {
      const id = sub.problemId._id.toString();

      if (!visited.has(id)) {
        visited.add(id);
        continueProblems.push(sub.problemId);
      }

      if (continueProblems.length === 3) break;
    }

    // Recommended Problems
    const solvedIds = acceptedSubmissions.map((sub) =>
      sub.problemId._id.toString()
    );

    const recommendedProblems = await Problem.find({
      _id: { $nin: solvedIds },
    }).limit(3);

    return res.status(httpStatus.OK).json({
      success: true,
      solvedProblems,
      totalSubmissions,
      acceptedSubmissions: acceptedSubmissions.length,
      acceptanceRate,
      recentSubmissions,
      continueProblems,
      recommendedProblems,
    });
  } catch (error) {
    console.log(error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export { getDashboard };