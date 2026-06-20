import { Leave } from "../models/Leave.js";

export const createLeaveRepo = async (leaveData) => {
  return Leave.create(leaveData);
};

export const findOneLeave = async (query) => {
  return Leave.findOne(query);
};

export const findLeaves = async (filter, options = {}) => {
  const { page = 1, limit = 3, status } = options;
  const skip = (page - 1) * limit;

  // if (status) {
  //   filter.status = status;
  // }

  const [leaves, totalLeaves] = await Promise.all([
    Leave.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("employeeId", "firstName lastName")
      .sort({ createdAt: -1 }),

    Leave.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalLeaves / limit);

  return {
    leaves,
    totalLeaves,
    totalPages,
    currentPage: page,
  };
};

export const findLeaveById = async (id) => {
  return Leave.findById(id);
};
