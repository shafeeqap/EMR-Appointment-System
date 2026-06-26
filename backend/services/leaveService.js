import {
  createLeaveRepo,
  findLeaveById,
  findLeaves,
  findOneLeave,
} from "../repositories/leaveRepository.js";
import { findUserById } from "../repositories/userRepository.js";
import { AppError } from "../utils/AppError.js";
import { logAction } from "../utils/auditLogger.js";

// ===========> Apply leave service <===========>
export const applyLeaveService = async (data, user) => {
  const { startDate, endDate, reason, leaveType, leaveCategory } = data;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const employeeId = user.id;
  const employeeType = user.role;

  const userData = await findUserById({ _id: employeeId });

  if (!userData) {
    throw new AppError("User not found", 404);
  }

  if (userData.role !== employeeType) {
    throw new AppError("Employee type mismatch", 400);
  }

  if (!userData.isActive) {
    throw new AppError("Inactive users cannot apply for leave", 403);
  }

  const existingLeave = await findOneLeave({
    employeeId,
    status: { $in: ["pending", "approved"] },

    startDate: { $lte: end },
    endDate: { $gte: start },
  });

  if (existingLeave) {
    throw new AppError("Leave request overlaps with an existing leave", 400);
  }

  const leave = await createLeaveRepo({
    employeeId,
    employeeType,
    startDate,
    endDate,
    reason,
    leaveType,
    leaveCategory,
  });

  await logAction({
    userId: user.id,
    role: user.role,
    action: "CREATE_LEAVE",
    entity: "Leave",
    entityId: leave._id,
    metadata: {
      employeeId,
      employeeType,
      firstName: userData.firstName,
      lastName: userData.lastName,
    },
  });

  return leave;
};

// ===========> Get leaves service <===========>
export const getLeavesService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const search = query.search?.trim();
  const status = query.status || "";
  const category = query.category || "";

  const filter = {};

  if (category) {
    filter.leaveCategory = category;
  }

  if (status) {
    filter.status = status;
  }

  const leaves = await findLeaves(filter, search, { page, limit });

  return leaves;
};

// ===========> Cancel leave service <===========>
export const cancelLeaveService = async (params, user) => {
  const leaveId = params.id;

  const leave = await findOneLeave({ _id: leaveId });

  if (!leave) {
    throw new AppError("Leave not found", 404);
  }

  if (leave.employeeId.toString() !== user.id.toString()) {
    throw new AppError("You are not authorized to cancel this leave", 403);
  }

  if (leave.status !== "pending") {
    throw new AppError("Only pending leaves can be cancelled", 400);
  }

  leave.status = "cancelled";

  await leave.save();

  await logAction({
    userId: user.id,
    role: user.role,
    action: "CANCEL_LEAVE",
    entity: "Leave",
    entityId: leave._id,
    metadata: {
      employeeId: leave.employeeId,
      employeeType: leave.employeeType,
      startDate: leave.startDate,
      endDate: leave.endDate,
    },
  });

  return leave;
};

// ===========> Get leave by ID service <===========>
export const getLeaveByIdService = async (params) => {
  const leaveId = params.id;

  const leave = await findOneLeave({ _id: leaveId });
  console.log(leave);
  

  if (!leave) {
    throw new AppError("Leave not found", 404);
  }

  return leave;
};

// ===========> Update leave status service <===========>
export const updateLeaveStatusService = async (params, body, user) => {
  const id = params.id;
  const { status } = body;

  const leave = await findLeaveById(id);
  if (!leave) {
    throw new AppError("Leave not found", 404);
  }

  const oldStatus = leave.status;

  leave.status = status;

  if (status === "approved" || status === "rejected") {
    leave.approvedBy = user.id;
    leave.approvedAt = new Date();
  }

  await leave.save();

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_LEAVE_STATUS",
    entity: "Leave",
    entityId: leave._id,
    metadata: {
      oldStatus,
      newStatus: status,
    },
  });

  return leave;
};
