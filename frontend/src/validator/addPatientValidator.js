import { z } from "zod";

export const addPatientSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  age: z.string().min(1, "Age required"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({
      message: "Please select a gender",
    }),
  }),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
});
