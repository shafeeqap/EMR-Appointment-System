import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { doctorRoutes } from "./routes/doctorRoutes.js";
import { appointmentRoutes } from "./routes/appointmentRoutes.js";
import { patientRoutes } from "./routes/patientRoutes.js";
import cookieParser from "cookie-parser";
import { notFound } from "./middleware/notFoundMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { adminDashboardRoutes } from "./routes/adminDashboardRoutes.js";
import { doctordashboardRoutes } from "./routes/doctorDashboardRoutes.js";
import { receptionistdashboardRoutes } from "./routes/receptionistDashboardRoutes.js";
import { departmentRoutes } from "./routes/departmentRoutes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/dcotor/dashboard", doctordashboardRoutes);
app.use("/api/receptionist/dashboard", receptionistdashboardRoutes);

// 404 handler
app.use(notFound);

// global error handler
app.use(errorHandler);

app.listen(PORT, () => [
  console.log(`Server is running on port http://localhost:${PORT}`),
]);
