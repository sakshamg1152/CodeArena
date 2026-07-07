import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { submitCode} from "../controllers/sumbit.controller.js";
import getSubmissions from "../controllers/getSubmission.controller.js";

const router = express.Router();

router.post("/submit", authMiddleware, submitCode);

router.get(
    "/history/:problemId",
    authMiddleware,
    getSubmissions
);


export default router;