import { Router } from "express";
import {createProblem , getAllProblems , getProblemById , updateProblem , deleteProblem}  from "../controllers/problem.controller.js"
const router = Router();

router.post("/create",createProblem);
router.get("/all",getAllProblems);
router.get("/:id",getProblemById);
router.put("/update/:id",updateProblem);
router.delete("/delete/:id",deleteProblem);

export default router;
