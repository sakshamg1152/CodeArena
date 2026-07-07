import express from "express";
import { getSubmissionById } from "../controllers/sumbit.controller.js";

const router = express.Router();

router.get("/:id", getSubmissionById);

export default router;