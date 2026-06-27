import { getAdminDashboardRepo } from "../../repositories/dashboard/adminDashboardRepository.js";

const MONTHS = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getAdminDashboardDataService = async () => {
  const data = await getAdminDashboardRepo();
  // console.log(data, "Data...");

  const formattedAppointmentsByMonth = data.appointmentsByMonth.map((item) => ({
    name: MONTHS[item._id.month],
    appointment: item.total,
  }));

  return {
    stats: {
      totalUsers: data.totalUsers,
      totalDoctors: data.totalDoctors,
      totalPatients: data.totalPatients,
      totalAppointments: data.totalAppointments,
    },

    charts: {
      appointmentsByStatus: data.appointmentsByStatus,
      appointmentsByMonth: formattedAppointmentsByMonth,
    },
  };
};
