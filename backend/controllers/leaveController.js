import {
  applyLeaveService,
  getLeavesService,
  cancelLeaveService,
  getLeaveByIdService,
  updateLeaveStatusService,
} from "../services/leaveService.js";

// ===========> Apply leave controller <===========
export const applyLeave = async (req, res, next) => {
  try {
    const leave = await applyLeaveService(req.validatedData, req.user);
    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (error) {
    next(error);
  }
};

// ===========> Get leaves controller <===========
export const getLeaves = async (req, res, next) => {
  try {
    const leaves = await getLeavesService(req.query, req.user);
    res.status(200).json({ message: "Leaves fetched successfully", leaves });
  } catch (error) {
    next(error);
  }
};

// ===========> Get leave by ID controller <===========
export const getLeaveById = async (req, res, next) => {
  try {
    const leave = await getLeaveByIdService(req.params);

    res.status(200).json({ message: "Leave fetched successfully", leave });
  } catch (error) {
    next(error);
  }
};

// ===========> Cancel leave controller <===========
export const cancelLeave = async (req, res, next) => {
  try {
    const leave = await cancelLeaveService(req.params, req.user);
    res.status(200).json({ message: "Leave cancelled successfully", leave });
  } catch (error) {
    next(error);
  }
};

// ==========> Update leave status controller <===========
export const updateLeaveStatus = async (req, res, next) => {
  try {
    const leave = await updateLeaveStatusService(req.params, req.body, req.user);
    res.status(200).json({ message: "Leave status updated successfully", leave });
  } catch (error) {
    next(error);
  }
}