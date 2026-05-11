import mongoose from "mongoose";
import { Patient } from "../../models/Patient.js";
import Appointment from "../../models/Appointment.js";

export const getDoctorDashboardRepo = async (doctorId) => {
  console.log(doctorId, "DotorId...");

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    throw new Error("Invalid doctor ID");
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [
    totalPatients,
    todaysAppointments,
    todaysPatients,
    todaysCompleted,
    appointmentsByDay,
  ] = await Promise.all([
    // Total patients
    Appointment.distinct("patientId", {
      doctorId: new mongoose.Types.ObjectId(doctorId),
    }),

    // Today's total appointments
    Appointment.countDocuments({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      // status: "booked",
      date: { $gte: startOfDay, $lte: endOfDay },
    }),

    // Today's total patients
    Appointment.countDocuments({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      status: "arrived",
      date: { $gte: startOfDay, $lte: endOfDay },
    }),

    // Today's total completed appointment
    Appointment.countDocuments({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      status: "completed",
      date: { $gte: startOfDay, $lte: endOfDay },
    }),

    // appointment by day
    Appointment.aggregate([
      {
        $match: {
          doctorId: new mongoose.Types.ObjectId(doctorId),

          date: {
            $gte: sevenDaysAgo,
            $lte: endOfDay,
          },
        },
      },

      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$date",
              },
            },
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.date": 1,
        },
      },
    ]),
  ]);

  return {
    totalPatients,
    todaysAppointments,
    todaysPatients,
    todaysCompleted,

    appointmentsByDay,
  };
};
