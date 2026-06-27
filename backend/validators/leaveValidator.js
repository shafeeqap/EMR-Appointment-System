import e from "express";
import { z } from "zod";

export const leaveValidatorSchema = z
  .object({
    // employeeId: z.string().min(1, "Employee ID is required"),
    // employeeType: z.enum(["doctor", "receptionist", "super_admin"]),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z.string().trim().min(5, "Reason must be at least 5 characters"),
    leaveType: z.enum(["full-day", "half-day"]),
    leaveCategory: z.enum(["paid", "unpaid", "annual", "sick", "emergency"]),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be greater than or equal to start date",
    path: ["endDate"],
  });
