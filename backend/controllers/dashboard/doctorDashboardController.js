import { getDoctorDashboardServices } from "../../services/dashboard/doctorDashboardService.js";

export const getDoctorDashboard = async (req, res, next) => {

  try {
    const dashboardData = await getDoctorDashboardServices(req.user);

    res.status(200).json({ data: dashboardData });
  } catch (error) {
    next(error);
  }
};
