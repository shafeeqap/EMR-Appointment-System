import { z } from "zod";

const timeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}$/, "Time must be HH:MM")
  .refine((time) => {
    const [h, m] = time.split(":").map(Number);
    return h >= 0 && h < 24 && m >= 0 && m < 60;
  }, "Invalid time value");

// create doctor validation
export const createDoctorSchema = z.object({
  userId: z.string(),
  departmentId: z.string(),
  workingHours: z
    .object({
      start: timeSchema,
      end: timeSchema,
    })
    .refine(
      ({ start, end }) => start < end,
      "Working hours start time must be before end time"
    ),

  slotDuration: z.number().int().positive("Slot duration must be positive"),

  breakTimes: z
    .array(
      z
        .object({
          start: timeSchema,
          end: timeSchema,
        })
        .refine(
          ({ start, end }) => start < end,
          "Breaking hours start time must be before end time"
        )
    )
    .optional(),
});

// update doctor validation
export const updateDoctorSchema = z.object({
  departmentId: z.string(),
  workingHours: z
    .object({
      start: timeSchema,
      end: timeSchema,
    })
    .refine(
      ({ start, end }) => start < end,
      "Working hours start time must be before end time"
    ),

  slotDuration: z.number().int().positive("Slot duration must be positive"),

  breakTimes: z.array(
    z
      .object({
        start: timeSchema,
        end: timeSchema,
      })
      .refine(
        ({ start, end }) => start < end,
        "Breaking hours start time must be before end time"
      )
      .optional()
  ),
});
