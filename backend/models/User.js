import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "doctor", "receptionist"],
      required: true,
    },

    // OTP fields
    resetOtp: {
      type: String,
    },
    resetOtpExpire: {
      type: Date,
    },
    resetOtpAttempts: {
      type: Number,
      default: 0,
    },

    lastLoginIP: {
      type: String,
    },
    lastDevice: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
