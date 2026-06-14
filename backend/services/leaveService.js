import {
  createLeaveRepo,
  findLeaves,
  findOneLeave,
} from "../repositories/leaveRepository.js";
import { findUserById } from "../repositories/userRepository.js";
import { AppError } from "../utils/AppError.js";
import { logAction } from "../utils/auditLogger.js";

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


export const getLeavesService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const search = query.search?.trim();
  const status = query.status;

  const filter = {};

  if (search) {
    filter.$or = [
      { reason: { $regex: search, $options: "i" } },
      { leaveType: { $regex: search, $options: "i" } },
      { leaveCategory: { $regex: search, $options: "i" } },
    ];
  }

  const leaves = await findLeaves(filter, { page, limit, status });

  return leaves;
};
