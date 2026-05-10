import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboard/adminDashboardController.js";

const router = express.Router();

router.get("/", protect, getDashboardData);

export const adminDashboardRoutes = router;
