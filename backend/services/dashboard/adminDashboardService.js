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

  // const formattedAppointmentsByDays = data.appointmentsByDay.map((item) => ({
  //   name: DAYS[new Date(item._id.date).getDay()],
  //   name: new Date(item._id.date).toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //   }),
  //   appointment: item.total,
  // }));

  return {
    stats: {
      totalUsers: data.totalUsers,
      totalDoctors: data.totalDoctors,
      totalPatients: data.totalPatients,
      totalAppointments: data.totalAppointments,
      // todaysAppointments: data.todaysAppointments,
      // checkedInPatients: data.checkedInPatients,
      // totalCompleted: data.totalCompleted,
    },

    charts: {
      appointmentsByStatus: data.appointmentsByStatus,
      appointmentsByMonth: formattedAppointmentsByMonth,
      // appointmentsByDay: formattedAppointmentsByDays,
    },
  };
};
