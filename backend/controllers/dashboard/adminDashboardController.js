import { getAdminDashboardDataService } from "../../services/dashboard/adminDashboardService.js";

export const getDashboardData = async (req, res, next) => {
  try {
    const dashboardData = await getAdminDashboardDataService();

    res.status(200).json({ data: dashboardData });
  } catch (error) {
    next(error);
  }
};
