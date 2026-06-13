import { z } from "zod";

export const leaveRequestSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  reason: z.string().trim().min(5, "Reason must be at least 5 characters"),
  leaveType: z.enum(["full-day", "half-day"], {
    errorMap: () => ({
      message: "Please select a leave type",
    }),
  }),
  leaveCategory: z
    .enum(["paid", "unpaid", "annual", "sick", "emergency"], {
      errorMap: () => ({
        message: "Please select a leave category",
      }),
    })
    .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
      message: "End date must be greater than or equal to start date",
      path: ["endDate"],
    }),
});
