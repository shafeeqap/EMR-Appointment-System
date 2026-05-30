import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getReceptionistDashboard } from "../controllers/dashboard/receptionistController.js";

const router = express.Router();

router.get("/:id", protect, getReceptionistDashboard);

export const receptionistdashboardRoutes = router;