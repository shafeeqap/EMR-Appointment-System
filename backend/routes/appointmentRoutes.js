import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAppointmentById,
  getAvailableSlots,
  updateAppointments,
  updateAppointmentStatus,
  startConsultation,
  getAppointmentFullDetails,
} from "../controllers/appointmentController.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  createAppointmentSchema,
  getAppontmentSchema,
  updateAppointmentSchema,
} from "../validators/appointmentValidator.js";

const router = express.Router();

router.get("/", protect, getAppointments);
router.get("/slots", protect, getAvailableSlots);
router.get("/:id", protect, getAppointmentById);
router.get("/:id/details", protect, getAppointmentFullDetails);
router.post("/", protect, validate(createAppointmentSchema), createAppointment);
router.put(
  "/:id/reschedule",
  protect,
  validate(updateAppointmentSchema),
  updateAppointments
);
router.patch("/:id/status", protect, updateAppointmentStatus);
router.delete("/:id", protect, deleteAppointment);
router.patch("/start-consultation", protect, startConsultation);

export const appointmentRoutes = router;
