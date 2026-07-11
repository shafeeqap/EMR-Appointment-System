import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDoctorDashboard } from "../controllers/dashboard/doctorDashboardController.js";
const router = express.Router();

router.get("/", protect, getDoctorDashboard);

export const doctordashboardRoutes = router;
