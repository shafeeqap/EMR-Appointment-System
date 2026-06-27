import { z } from "zod";

// create appointment validation
export const createAppointmentSchema = z.object({
  doctorId: z.string(),
  patientId: z.string(),
  departmentId: z.string(),
  date: z.string(),
  slotTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)")
    .refine((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
    }, "Invalid time value"),
  notes: z.string(),
});

// update appointment validation
export const updateAppointmentSchema = z.object({
  date: z.string(),
  doctorId: z.string().min(1, "Doctor is required"),
  slotTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)")
    .refine((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
    }, "Invalid time value"),
  notes: z.string(),
});

// get appointment validation
export const getAppontmentSchema = z.object({
  doctorId: z.string("Doctor ID is required"),
  date: z.string("Date is required"),
});
