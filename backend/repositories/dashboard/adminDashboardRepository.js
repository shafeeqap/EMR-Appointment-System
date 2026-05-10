import mongoose from "mongoose";
import Appointment from "../../models/Appointment.js";
import { Doctor } from "../../models/Doctor.js";
import { Patient } from "../../models/Patient.js";
import { User } from "../../models/User.js";

export const getDashboard = async () => {
  // if (!mongoose.Types.ObjectId.isValid(doctorId)) {
  //   throw new Error("Invalid doctor ID");
  // }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [
    totalUsers,
    totalDoctors,
    totalPatients,
    totalAppointments,
    appointmentsByStatus,
    appointmentsByMonth,
  ] = await Promise.all([
    User.countDocuments(),
    Doctor.countDocuments(),
    Patient.countDocuments(),
    Appointment.countDocuments(),

    // appointment by status
    Appointment.aggregate([
      {
        $group: {
          _id: "$status",

          total: { $sum: 1 },
        },
      },
    ]),

    // appointment by month
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

    // appointment by day
    // Appointment.aggregate([
    //   {
    //     $match: {
    //       // doctorId: new mongoose.Types.ObjectId(doctorId),

    //       date: {
    //         $gte: sevenDaysAgo,
    //         $lte: endOfDay,
    //       },
    //     },
    //   },

    //   {
    //     $group: {
    //       _id: {
    //         date: {
    //           $dateToString: {
    //             format: "%Y-%m-%d",
    //             date: "$date",
    //           },
    //         },
    //       },
    //       total: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $sort: {
    //       "_id.date": 1,
    //     },
    //   },
    // ]),
  ]);

  return {
    totalUsers,
    totalDoctors,
    totalPatients,
    totalAppointments,
    // todaysAppointments,
    // checkedInPatients,
    // totalCompleted,

    appointmentsByStatus,
    appointmentsByMonth,
    // appointmentsByDay,
  };
};
