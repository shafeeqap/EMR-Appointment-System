import mongoose from "mongoose";
import { Patient } from "../../models/Patient.js";
import Appointment from "../../models/Appointment.js";

export const getDoctorDashboardRepo = async (doctorId) => {
  console.log(doctorId, 'DotorId...');
  
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    throw new Error("Invalid doctor ID");
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  console.log(endOfDay, 'End of day...');
  

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);
  console.log(sevenDaysAgo, 'Seven days ago...');
  

  const [
    totalPatients,
    totalAppointments,
    totalCompleted,
    todaysAppointments,
    checkedInPatients,
    appointmentsByDay,
  ] = await Promise.all([

    // Total patients
    Patient.countDocuments({}),

    // Total appointments
    Appointment.countDocuments(),

    // Total doctor consulting completed
    Appointment.countDocuments({ status: "completed" }),

    // Today's appointments
    Appointment.countDocuments({
      status: "booked",
      date: { $gte: startOfDay, $lte: endOfDay },
    }),

    // checked in patients
    Appointment.countDocuments({
      status: "arrived",
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
    totalAppointments,
    todaysAppointments,
    checkedInPatients,
    totalCompleted,
    appointmentsByDay,
  };
};
