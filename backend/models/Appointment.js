import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    slotTime: {
      type: String,
      required: true,
    },
    tokenNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "booked",
        "arrived",
        "ongoing",
        "waiting",
        "cancelled",
        "completed",
        "no_show",
      ],
      default: "booked",
    },
    notes: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

appointmentSchema.index(
  { doctorId: 1, date: 1, slotTime: 1 },
  { unique: true, partialFilterExpression: { status: "booked" } }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
