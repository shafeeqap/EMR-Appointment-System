import { z } from "zod";

// create department validation
export const createDepartmentSchema = z.object({
  name: z
    .string()
    .min(1, "Department is required")
    .min(3, "Department name too short"),
  description: z.string().optional(),
});

// update department validation
export const updateDepartmentSchema = z.object({
  name: z
    .string()
    .min(1, "Department is required")
    .min(3, "Department name too short"),
  description: z.string().optional(),
});
