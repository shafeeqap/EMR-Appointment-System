import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      unique: true,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
