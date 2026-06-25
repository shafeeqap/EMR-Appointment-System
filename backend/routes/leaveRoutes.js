import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  applyLeave,
  cancelLeave,
  getLeaveById,
  getLeaves,
  updateLeaveStatus,
} from "../controllers/leaveController.js";
import { validate } from "../middleware/validationMiddleware.js";
import { leaveValidatorSchema } from "../validators/leaveValidator.js";

const router = express.Router();

router.post("/", protect, validate(leaveValidatorSchema), applyLeave);
router.get("/", protect, getLeaves);
router.get("/:id", protect, getLeaveById);
router.put("/:id/status", protect, authorize("super_admin"), updateLeaveStatus);
router.put("/:id/cancel", protect, cancelLeave);

export const leaveRoutes = router;
