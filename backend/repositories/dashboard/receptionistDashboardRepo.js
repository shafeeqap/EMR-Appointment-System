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
    totalDoctors,
    appointmentsByStatus,
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
    //   date: { $gte: startOfDay, $lte: endOfDay },
    }),

    // appointment by status
    Appointment.aggregate([
      {
        $group: {
          _id: "$status",

          total: { $sum: 1 },
        },
      },
    ]),
  ]);

  return {
    todaysAppointments,
    checkedInPatients,
    cancelledAppointments,
    totalDoctors,
    appointmentsByStatus,
  };
};
