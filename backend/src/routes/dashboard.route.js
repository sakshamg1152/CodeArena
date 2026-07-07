console.log("Dashboard Route Loaded");

import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("Dashboard Route HIT");
    next();
}, authMiddleware, getDashboard);

export default router;