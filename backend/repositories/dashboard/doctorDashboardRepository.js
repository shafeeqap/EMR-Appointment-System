import mongoose from "mongoose";
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
    todaysTotalAppointments,
    todaysArrivedAppointments,
    todaysTotalCompleted,
    appointmentsByDay,
    todaysAppointments,
  ] = await Promise.all([
    // Total patients
    Appointment.distinct("patientId", {
      doctorId: new mongoose.Types.ObjectId(doctorId),
    }).then((patients) => patients.length),

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

    // Today's Appointment List
    Appointment.aggregate([
      {
        $match: {
          doctorId: new mongoose.Types.ObjectId(doctorId),

          status: {
            $in: ["arrived", "ongoing", "waiting", "completed"],
          },

          date: { $gte: startOfDay, $lte: endOfDay },
        },
      },

      {
        $sort: {
          date: 1,
          slotTime: 1,
        },
      },

      // Join Patient
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patient",
        },
      },
      { $unwind: "$patient" },

      {
        $project: {
          _id: 1,
          status: 1,
          date: 1,
          slotTime: 1,
          tokenNumber: 1,
          notes: 1,

          patientObjectId: "$patient._id",
          patientId: "$patient.patientId",
          name: "$patient.name",
          mobile: "$patient.mobile",
          age: "$patient.age",
          gender: "$patient.gender"
        },
      },
    ]),
  ]);

  return {
    totalPatients,
    todaysTotalAppointments,
    todaysArrivedAppointments,
    todaysTotalCompleted,
    todaysAppointments,

    appointmentsByDay,
  };
};
