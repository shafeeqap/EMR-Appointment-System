import { getDoctorDashboardServices } from "../../services/dashboard/doctor/doctorDashboardService.js";

export const getDoctorDashboard = async (req, res, next) => {
    console.log(req.params);
    
  try {
    const dashboardData = await getDoctorDashboardServices(req.params);

    res.status(200).json({ data: dashboardData });
  } catch (error) {
    next(error);
  }
};
