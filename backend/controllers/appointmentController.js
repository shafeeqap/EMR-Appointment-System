import { generateAvailableSlots } from "../services/slotService.js";
import {
  createAppointmentService,
  getAppointmentsService,
  updateAppointmentStatusService,
  updateAppointmentService,
  deleteAppointmentService,
  getAppointmentByIdService,
  startConsultationService,
  getAppointmentFullDetailsService,
} from "../services/appointmentService.js";

// =============> Create a new appointment <=============
export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await createAppointmentService(
      req.validatedData,
      req.user
    );
    res
      .status(201)
      .json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      throw new Error(
        "Slot just got booked by someone else. Please choose another."
      );
    }

    next(error);
  }
};

// =============> Get appointments By doctorId and date <=============
export const getAppointments = async (req, res, next) => {
  try {
    const { appointments, page, totalPages } = await getAppointmentsService(
      req.query,
      req.user
    );

    res.status(200).json({ appointments, page, totalPages });
  } catch (error) {
    next(error);
  }
};

// =============> Get appointments By doctorId <=============
export const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await getAppointmentByIdService(req.params);

    res.status(200).json({ appointment });
  } catch (error) {
    next(error);
  }
};
// =============> Get appointments By doctorId <=============
export const getAppointmentFullDetails = async (req, res, next) => {
  try {
    const { appointment, page, totalPages } =
      await getAppointmentFullDetailsService(req.params, req.query);

    res.status(200).json({ appointment, page, totalPages });
  } catch (error) {
    next(error);
  }
};

// =============> Get available time slots for a doctor <=============
export const getAvailableSlots = async (req, res, next) => {
  try {
    const { isOnLeave, availableSlots, bookedSlots, leaveReason, leaveType } =
      await generateAvailableSlots(req.query);

    res
      .status(200)
      .json({ isOnLeave, availableSlots, bookedSlots, leaveReason, leaveType });
  } catch (error) {
    next(error);
  }
};

// =============> Update appointment status <=============
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const appointment = await updateAppointmentStatusService(
      req.params,
      req.body,
      req.user
    );

    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// =============> Update appointment <=============
export const updateAppointments = async (req, res, next) => {
  try {
    const updatedAppointment = await updateAppointmentService(
      req.params,
      req.validatedData,
      req.user
    );

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};

// =============> Delete Appointment <=============
export const deleteAppointment = async (req, res, next) => {
  try {
    await deleteAppointmentService(req.params, req.user);

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// =============> Start Consultation <=============
export const startConsultation = async (req, res, next) => {
  try {
    const data = await startConsultationService(req.body, req.user);

    res.status(200).json({
      message: "Start doctor consultation",
      data,
    });
  } catch (error) {
    next(error);
  }
};
