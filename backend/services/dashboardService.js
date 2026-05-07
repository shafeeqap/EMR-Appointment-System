import { getDashboard } from "../repositories/dashboardRepository.js";
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

export const getDashboardDataService = async () => {
  const data = await getDashboard();

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
      todaysAppointments: data.todaysAppointments,
      checkedInPatients: data.checkedInPatients,
      totalCompleted: data.totalCompleted,
    },

    charts: {
      appointmentsByStatus: data.appointmentsByStatus,
      appointmentsByMonth: formattedAppointmentsByMonth,
    },
  };
};
