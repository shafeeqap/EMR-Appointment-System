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
router.get("/:id", protect, getDepartmentById);
router.put(
  "/:id",
  protect,
  authorize("super_admin"),
  validate(updateDepartmentSchema),
  updateDepartment
);
router.delete("/:id", protect, authorize("admin"), deleteDepartment);

export const departmentRoutes = router;
