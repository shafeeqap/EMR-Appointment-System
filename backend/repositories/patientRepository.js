import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import { Patient } from "../models/Patient.js";

export const createPatientRepo = async (data) => {
  return Patient.create(data);
};

export const findPatient = async (filter, skip, limit) => {
  return Patient.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
};

export const findPatientsBySearchQuery = (query) => {
  return Patient.find(query);
};

export const findOnePatient = async (filter) => {
  return Patient.findOne(filter);
};

export const findPatientById = async (id) => {
  return Patient.findById(id);
};

// =============> Find Patient Details <=============
export const findPatientDetails = async (id, skip, limit) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid patient ID");
  }

  const pipeline = [
    {
      $match: { patientId: new mongoose.Types.ObjectId(id) },
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
  ];

  pipeline.push({
    $facet: {
      patient: [
        {
          $limit: 1,
        },
        {
          $project: {
            "patient.name": 1,
            "patient.mobile": 1,
            "patient.age": 1,
            "patient.gender": 1,
            "patient.patientId": 1,
          },
        },
      ],

      history: [
        {
          $project: {
            _id: 1,
            status: 1,
            date: 1,
            slotTime: 1,
            tokenNumber: 1,
            notes: 1,
            createdAt: 1,

            "doctor._id": 1,
            "doctor.firstName": 1,
            "doctor.lastName": 1,

            "department._id": 1,
            "department.name": 1,
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

  const patientData = result[0]?.patient?.[0] || null;
  console.log(patientData, "Patient Data from Repository...");
  
  const history = result[0]?.history || [];
  const total = result[0]?.totalCount[0]?.total || 0;

  return { patientData, history, total };
};

export const findPatientByIdAndUpdate = async (id, update, options) => {
  return Patient.findByIdAndUpdate(id, update, options);
};

export const findPatientByIdAndDelete = async (id) => {
  return Patient.findByIdAndDelete(id);
};

export const countPatientDocuments = async (doctorId, filter) => {
  return Patient.countDocuments(doctorId, filter);
};
