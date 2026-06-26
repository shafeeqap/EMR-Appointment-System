import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";

export const createAppointmentRepo = async (data) => {
  return Appointment.create(data);
};

export const findAppointmentById = async (id) => {
  return Appointment.findById(id)
    .populate("doctorId", "firstName lastName")
    .populate("patientId", "name age mobile")
    .sort({ createdAt: -1 });
};

// =============> Get appointment by ID with patient and doctor details <=============
export const getAppointmentById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid appointment ID");
  }

  const pipeline = [
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },

    // Join Patient
    {
      $lookup: {
        from: "patients",
        localField: "patientId",
        foreignField: "_id",
        as: "patient",
      },
    },
    { $unwind: "$patient" },

    // Join Doctor
    {
      $lookup: {
        from: "doctors",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctor",
      },
    },
    { $unwind: "$doctor" },

    // Join Department
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
      $project: {
        _id: 1,
        status: 1,
        date: 1,
        slotTime: 1,
        tokenNumber: 1,
        notes: 1,
        createdAt: 1,
        "patient._id": 1,
        "patient.name": 1,
        "patient.mobile": 1,
        "patient.age": 1,
        "patient.patientId": 1,
        "doctor._id": 1,
        "doctor.firstName": 1,
        "doctor.lastName": 1,
        "department._id": 1,
        "department.name": 1,
      },
    },

    { $sort: { createdAt: -1 } },
  ];

  const result = await Appointment.aggregate(pipeline);
  return result[0] || null;
};

// =============> Find appointments with doctor and patient details <=============
export const findAppointment = (filter) => {
  return Appointment.find(filter)
    .populate("doctorId", "firstName lastName")
    .populate("patientId", "name")
    .sort({ createdAt: -1 });
};

// =============> Get appointments with search, filter, pagination, and doctor/patient details <=============
export const getAppointment = async ({
  doctorId,
  search,
  status,
  date,
  skip,
  limit,
}) => {
  const isNumeric = /^\d+$/.test(search);

  const baseMatch = {
    status: {
      $in: [
        "booked",
        "arrived",
        "ongoing",
        "waiting",
        "completed",
        "cancelled",
        "no_show",
      ],
    },
  };

  if (doctorId) {
    baseMatch.doctorId = new mongoose.Types.ObjectId(doctorId);
  }

  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    baseMatch.date = {
      $gte: start,
      $lte: end,
    };
  }

  const pipeline = [
    {
      $match: baseMatch,
    },

    // Join Patient
    {
      $lookup: {
        from: "patients",
        localField: "patientId",
        foreignField: "_id",
        as: "patient",
      },
    },
    { $unwind: "$patient" },

    // Join Doctor
    {
      $lookup: {
        from: "doctors",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctor",
      },
    },
    { $unwind: "$doctor" },
  ];

  const matchConditions = [];

  if (search) {
    matchConditions.push({
      $or: [
        { "patient.name": { $regex: search, $options: "i" } },
        { "doctor.firstName": { $regex: search, $options: "i" } },
        { "doctor.lastName": { $regex: search, $options: "i" } },
        { "patient.patientId": { $regex: search, $options: "i" } },
        ...(isNumeric
          ? [
              { "patient.mobile": { $regex: search } },
              { "patient.age": { $regex: search } },
            ]
          : []),
      ],
    });
  }

  if (status) {
    matchConditions.push({ status });
  }

  if (matchConditions.length) {
    pipeline.push({ $match: { $and: matchConditions } });
  }

  pipeline.push({
    $facet: {
      data: [
        {
          $project: {
            _id: 1,
            status: 1,
            date: 1,
            slotTime: 1,
            tokenNumber: 1,
            notes: 1,
            createdAt: 1,
            "patient.name": 1,
            "patient.mobile": 1,
            "patient.age": 1,
            "patient.patientId": 1,
            doctor: { firstName: 1, lastName: 1 },
            "doctor.department": 1,
          },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ],

      totalCount: [{ $count: "total" }],
    },
  });

  const result = await Appointment.aggregate(pipeline);

  const appointments = result[0]?.data || [];
  const total = result[0]?.totalCount[0]?.total || 0;

  return { appointments, total };
};

export const findAppointmentDetails = (patientId) => {
  return Appointment.find({ patientId })
    .populate("doctorId", "firstName lastName")
    .populate("patientId", "name")
    .sort({ createdAt: -1 });
};

export const findAppointmentByIdAndUpdate = (id, update, options) => {
  return Appointment.findByIdAndUpdate(id, update, options);
};

export const findAppointmentByIdAndDelete = async (id) => {
  return Appointment.findByIdAndDelete(id);
};

export const findAppointmentOne = async (filter) => {
  return Appointment.findOne(filter);
};

export const countAppointmentDocuments = async (filter) => {
  return Appointment.countDocuments(filter);
};

export const getAppointmentDistinctValue = async (field, query, option) => {
  return Appointment.distinct(field, query, option);
};
