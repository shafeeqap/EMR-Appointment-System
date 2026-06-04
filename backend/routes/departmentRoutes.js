import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "../validators/departmentValidator.js";
import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
  updateDepartmentStatus,
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", protect, getDepartments);
router.post(
  "/",
  protect,
  authorize("super_admin"),
  validate(createDepartmentSchema),
  createDepartment
);
// router.get("/search", protect, searchDepartments);
router.get("/:id", protect, getDepartmentById);
router.put(
  "/:id",
  protect,
  authorize("super_admin"),
  validate(updateDepartmentSchema),
  updateDepartment
);
router.patch(
  "/:id/status",
  protect,
  authorize("super_admin"),
  updateDepartmentStatus
);
router.delete("/:id", protect, authorize("super_admin"), deleteDepartment);

export const departmentRoutes = router;
