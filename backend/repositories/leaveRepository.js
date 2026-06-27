import { Leave } from "../models/Leave.js";

export const createLeaveRepo = async (leaveData) => {
  return Leave.create(leaveData);
};

export const findOneLeave = async (query) => {
  return Leave.findOne(query)
    .populate("employeeId", "firstName lastName")
    .populate("approvedBy", "firstName lastName role");
};

export const findLeaves = async (filter, search, options = {}) => {
  const { page = 1, limit = 3 } = options;
  const skip = (page - 1) * limit;

  const pipeline = [
    { $match: filter },

    // Employee lookup
    {
      $lookup: {
        from: "users",
        localField: "employeeId",
        foreignField: "_id",
        as: "employee",
      },
    },

    { $unwind: "$employee" },
  ];

  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { reason: { $regex: search, $options: "i" } },
          { leaveType: { $regex: search, $options: "i" } },
          { leaveCategory: { $regex: search, $options: "i" } },
          { status: { $regex: search, $options: "i" } },

          { "employee.firstName": { $regex: search, $options: "i" } },
          { "employee.lastName": { $regex: search, $options: "i" } },
          { "employee.mobile": { $regex: search } },
        ],
      },
    });
  }

  pipeline.push(
    {
      $addFields: {
        totalDays: {
          $add: [
            {
              $dateDiff: {
                startDate: "$startDate",
                endDate: "$endDate",
                unit: "day",
              },
            },
            1,
          ],
        },
      },
    },

    {
      $project: {
        _id: 1,
        employeeId: 1,
        employeeType: 1,
        startDate: 1,
        endDate: 1,
        reason: 1,
        leaveType: 1,
        leaveCategory: 1,
        status: 1,
        totalDays: 1,
        createdAt: 1,
        updatedAt: 1,

        "employee.firstName": 1,
        "employee.lastName": 1,
        "employee.mobile": 1,
      },
    },

    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        total: [{ $count: "count" }],
      },
    }
  );

  const result = await Leave.aggregate(pipeline);

  const leaves = result[0].data || [];

  const totalLeaves = result[0].total[0]?.count || 0;

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
