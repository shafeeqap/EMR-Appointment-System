import { getReceptionistDashboardRepo } from "../../repositories/dashboard/receptionistDashboardRepo.js";
import { findUserOne } from "../../repositories/userRepository.js";

export const getReceptionistDashboardServices = async (user) => {
  const userId = user.id;

  const receptionist  = await findUserOne({ _id: userId });
  if (!receptionist ) {
    throw new AppError("User not found", 404);
  }

  const data = await getReceptionistDashboardRepo();
  console.log(data, "Data...");

  const appointmentsDistribution = data.departmentAppointmentDistribution.map(
    (item) => ({
      name: item.department,
      value: item.total,
    })
  );

  const doctorWorkload = data.doctorWorkload.map((item) => ({
    name: item.doctorName,
    value: item.total,
    department: item.department,
  }));

  return {
    stats: {
      todaysAppointments: data.todaysAppointments,
      checkedInPatients: data.checkedInPatients,
      cancelledAppointments: data.cancelledAppointments,
      doctorsAvailable: data.doctorsAvailable,
    },

    charts: {
      departmentAppointmentDistribution: appointmentsDistribution,
      doctorWorkload: doctorWorkload,
    },
  };
};
