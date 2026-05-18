import { getDoctorDashboardRepo } from "../../repositories/dashboard/doctorDashboardRepository.js";
import { findDoctorOne } from "../../repositories/doctorRepository.js";
import { AppError } from "../../utils/AppError.js";

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

export const getDoctorDashboardServices = async (params) => {
  const userId = params.id;

  const doctor = await findDoctorOne({ userId });

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  const data = await getDoctorDashboardRepo(doctor._id);
  // console.log(data, "Data...");

  const formattedAppointmentsByDays = data.appointmentsByDay.map((item) => ({
    name: DAYS[new Date(item._id.date).getDay()],
    // name: new Date(item._id.date).toLocaleDateString("en-US", {
    //   month: "short",
    //   day: "numeric",
    // }),
    appointment: item.total,
  }));

  return {
    stats: {
      totalPatients: data.totalPatients,
      todaysAppointments: data.todaysTotalAppointments,
      todaysPatients: data.todaysArrivedAppointments,
      todaysCompleted: data.todaysTotalCompleted,
      todaysAppointmentsList: data.todaysAppointments,
    },

    charts: {
      appointmentsByDay: formattedAppointmentsByDays,
    },
  };
};
