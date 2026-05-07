import Appointment from "../models/Appointment.js";
import { Doctor } from "../models/Doctor.js";
import { Patient } from "../models/Patient.js";
import { User } from "../models/User.js";

export const getDashboard = async () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const [
    totalUsers,
    totalDoctors,
    totalPatients,
    totalAppointments,
    totalCompleted,
    todaysAppointments,
    checkedInPatients,
    appointmentsByStatus,
    appointmentsByMonth,
  ] = await Promise.all([
    User.countDocuments(),
    Doctor.countDocuments(),
    Patient.countDocuments(),
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: "completed" }),
    Appointment.countDocuments({
      status: "booked",
      date: { $gte: start, $lte: end },
    }),
    Appointment.countDocuments({
      status: "arrived",
      date: { $gte: start, $lte: end },
    }),

    Appointment.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
    ]),

    Appointment.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]),
  ]);

  return {
    totalUsers,
    totalDoctors,
    totalPatients,
    totalAppointments,
    todaysAppointments,
    checkedInPatients,
    totalCompleted,

    appointmentsByStatus,
    appointmentsByMonth,
  };
};
