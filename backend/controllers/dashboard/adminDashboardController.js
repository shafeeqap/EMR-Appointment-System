import { getDashboardDataService } from "../../services/dashboard/admin/adminDashboardService.js";

export const getDashboardData = async (req, res, next) => {
  try {
    const dashboardData = await getDashboardDataService();

    res.status(200).json({ data: dashboardData });
  } catch (error) {
    next(error);
  }
};
