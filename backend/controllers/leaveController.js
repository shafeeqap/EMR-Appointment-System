import { applyLeaveService, getLeavesService } from "../services/leaveService.js";

export const applyLeave = async (req, res, next) => {
  try {
    const leave = await applyLeaveService(req.validatedData, req.user);
    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (error) {
    next(error);
  }
};

export const getLeaves = async (req, res, next) => {
  try {
    const leaves = await getLeavesService(req.query);
    res
      .status(200)
      .json({ message: "Leaves fetched successfully", leaves });
  } catch (error) {
    next(error);
  }
};
