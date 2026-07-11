import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.MONGO_URI);

await mongoose.connect(process.env.MONGO_URI);

const hashed = await bcrypt.hash("admin123", 10);

await User.create({
  firstName: "Super",
  lastName: "Admin",
  email: "admin@clinic.com",
  password: hashed,
  role: "super_admin",
});

console.log("Admin user created");

process.exit(0);
