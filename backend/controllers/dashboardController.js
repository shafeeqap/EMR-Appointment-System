import { getDashboardDataService } from "../services/dashboard/admin/dashboardService.js";

export const getDashboardData = async (req, res, next) => {
  try {
    const dashboardData = await getDashboardDataService(req.user);

    res.status(200).json({ data: dashboardData });
  } catch (error) {
    next(error);
  }
};
