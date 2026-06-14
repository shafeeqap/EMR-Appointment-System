import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { applyLeave, getLeaves } from "../controllers/leaveController.js";
import { validate } from "../middleware/validationMiddleware.js";
import { leaveValidatorSchema } from "../validators/leaveValidator.js";

const router = express.Router();

router.post(
  "/",
  protect,
  // authorize(["doctor", "receptionist"]),
  validate(leaveValidatorSchema),
  applyLeave
);
router.get(
  "/",
  protect,
  // authorize(["super_admin", "doctor", "receptionist"]),
  getLeaves
);
router.get(
  "/:id",
  protect,
  authorize(["super_admin", "doctor", "receptionist"]),
  // getLeaveById
);
router.put(
  "/:id/status",
  protect,
  authorize(["super_admin", "doctor", "receptionist"]),
  // updateLeaveStatus
);
router.put(
  "/:id/cancel",
  protect,
  authorize(["super_admin", "doctor", "receptionist"]),
  // cancelLeave
);

export const leaveRoutes = router;
