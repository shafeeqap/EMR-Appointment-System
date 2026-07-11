import { getReceptionistDashboardServices } from "../../services/dashboard/receptionistDashboardService.js";

export const getReceptionistDashboard = async (req, res, next) => {
  try {
    const dashboardData = await getReceptionistDashboardServices(req.user);

    res.status(200).json({ data: dashboardData });
  } catch (error) {
    next(error);
  }
};
