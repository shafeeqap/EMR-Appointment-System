import { z } from "zod";

// create department validation
export const createDepartmentSchema = z.object({
  name: z.string().min(2, "Department name too short"),
  description: z.string().optional(),
});

// update department validation
export const updateDepartmentSchema = z.object({
  name: z.string().min(2, "Department name too short").optional(),
  description: z.string().optional(),
});