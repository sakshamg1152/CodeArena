import { Submission } from "../models/submission.model.js";

const getSubmissions = async (req, res) => {

    try {

        const { problemId } = req.params;

        const submissions = await Submission.find({
            problemId,
            userId: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            submissions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export default getSubmissions;