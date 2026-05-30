import { z } from "zod";

// create patient validation
export const createPatientSchema = z.object({
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
  // patientId: z
  //   .string()
  //   .min(3, "Patient ID must be at least 3 characters")
  //   .max(20, "Patient ID too long")
  //   .regex(/^[A-Z0-9_-]+$/, "Invalid Patient ID format"),
});

// search patient validation
export const searchPatientSchema = z.object({
  mobile: z
    .string("Mobile number is required")
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
});

// update patient validation
export const updatePatientSchema = z.object({
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
