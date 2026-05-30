import { getReceptionistDashboardRepo } from "../../repositories/dashboard/receptionistDashboardRepo.js";
import { findUserOne } from "../../repositories/userRepository.js";

export const getReceptionistDashboardServices = async (params) => {
  const userId = params.id;

  const user = await findUserOne({ _id: userId });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const data = await getReceptionistDashboardRepo();
  console.log(data, "Data...");

  return {
    stats: {
      todaysAppointments: data.todaysAppointments,
      checkedInPatients: data.checkedInPatients,
      cancelledAppointments: data.cancelledAppointments,
      totalDoctors: data.totalDoctors,
    },
  };
};
