import { Doctor } from "../models/Doctor.js";

export const createDoctorRepo = async (data) => {
  return Doctor.create(data);
};

// export const findDoctors = async (filter, skip, limit) => {
//   return Doctor.find(filter)
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 })
//     .populate("userId", "firstName lastName")
//     .populate("departmentId", "name");
// };

// =============> Get doctors with search, filter, pagination, and department details <=============
export const getDoctors = async ({ search, status, skip, limit }) => {
  const filter = {};

  if (status === "active") {
    filter.isActive = true;
  } else if (status === "inactive") {
    filter.isActive = false;
  }

  const pipeline = [
    {
      $lookup: {
        from: "departments",
        localField: "departmentId",
        foreignField: "_id",
        as: "department",
      },
    },

    { $unwind: "$department" },

    {
      $match: {
        $or: [
          { firstName: { $regex: `^${search}`, $options: "i" } },
          { lastName: { $regex: `^${search}`, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { "department.name": { $regex: search, $options: "i" } },
        ],
      },
    },
  ];

  if (status) {
    pipeline.push({ $match: filter });
  }

  pipeline.push({
    $facet: {
      data: [
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            workingHours: 1,
            breakTimes: 1,
            slotDuration: 1,
            isActive: 1,
            createdAt: 1,
            department: { _id: "$department._id", name: "$department.name" },
          },
        },
      ],

      totalCount: [{ $count: "total" }],
    },
  });

  const result = await Doctor.aggregate(pipeline);

  const doctors = result[0]?.data || [];
  const total = result[0]?.totalCount[0]?.total || 0;

  return { doctors, total };
};

export const findDoctorsBySearchQuery = (query) => {
  return Doctor.find({ ...query, isActive: true })
    .populate("departmentId", "name")
    .limit(10);
};

export const findDoctorById = (id) => {
  return Doctor.findById(id)
    .populate("userId", "firstName lastName")
    .populate("departmentId", "name");
};
export const findDoctorOne = async (id) => {
  return Doctor.findOne(id);
};

export const findDoctorByIdAndUpdate = async (id, update, options) => {
  return Doctor.findByIdAndUpdate(id, update, options);
};

export const findDoctorByEmail = async (email) => {
  return Doctor.findOne({ email });
};

export const findDoctorByIdAndDelete = async (id) => {
  return Doctor.findByIdAndDelete(id);
};

export const countDoctorDocuments = async (fliter) => {
  return Doctor.countDocuments(fliter);
};
