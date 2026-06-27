import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    employeeType: {
      type: String,
      enum: ["doctor", "receptionist", "admin", "super_admin"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      trim: true,
    },

    leaveType: {
      type: String,
      enum: ["full-day", "half-day"],
      required: true,
    },

    leaveCategory: {
      type: String,
      enum: ["paid", "unpaid", "annual", "sick", "emergency"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Leave = mongoose.model("Leave", leaveSchema);
