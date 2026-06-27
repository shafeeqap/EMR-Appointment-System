import Appointment from "../../models/Appointment.js";
import { Doctor } from "../../models/Doctor.js";

export const getReceptionistDashboardRepo = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [
    todaysAppointments,
    checkedInPatients,
    cancelledAppointments,
    doctorsAvailable,
    departmentAppointmentDistribution,
    doctorWorkload,
  ] = await Promise.all([
    // Today's total appointments
    Appointment.countDocuments({
      date: { $gte: startOfDay, $lte: endOfDay },
    }),

    // Checked-in patients
    Appointment.countDocuments({
      status: "arrived",
      date: { $gte: startOfDay, $lte: endOfDay },
    }),

    // Cancelled appointments
    Appointment.countDocuments({
      status: "cancelled",
      date: { $gte: startOfDay, $lte: endOfDay },
    }),

    // Dcotor availability
    Doctor.countDocuments({
        date: { $gte: startOfDay, $lte: endOfDay },
        isActive: true,
    }),

    // Department Appointment Distribution
    Appointment.aggregate([
      {
        $match: {
          date: { $gte: startOfDay, $lte: endOfDay },
          status: { $ne: "cancelled" },
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department",
        },
      },
      { $unwind: "$department" },
      {
        $group: {
          _id: "$department.name",

          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          total: 1,
        },
      },
      { $sort: { total: -1 } },
    ]),

    // Doctor Workload
    Appointment.aggregate([
      {
        $match: {
          date: { $gte: startOfDay, $lte: endOfDay },
          status: { $in: ["booked", "arrived", "ongoing", "waiting"] },
        },
      },

      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctor",
        },
      },
      { $unwind: "$doctor" },

      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department",
        },
      },
      { $unwind: "$department" },

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
        $group: {
          _id: "$doctor._id",
          departmentName: { $first: "$department.name" },
          firstName: { $first: "$doctor.firstName" },
          lastName: { $first: "$doctor.lastName" },

          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          doctorId: "$_id",
          doctorName: { $concat: ["$firstName", " ", "$lastName"] },
          department: "$departmentName",
          total: 1,
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]),
  ]);

  return {
    todaysAppointments,
    checkedInPatients,
    cancelledAppointments,
    doctorsAvailable,
    departmentAppointmentDistribution,
    doctorWorkload,
  };
};
