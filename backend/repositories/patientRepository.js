import { Patient } from "../models/Patient.js";

export const createPatientRepo = async (data) => {
  return Patient.create(data);
};

export const findPatient = async ( filter, skip, limit) => {
  return Patient.find( filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
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

export const findPatientByIdAndUpdate = async (id, update, options) => {
  return Patient.findByIdAndUpdate(id, update, options);
};

export const findPatientByIdAndDelete = async (id) => {
  return Patient.findByIdAndDelete(id);
};

export const countPatientDocuments = async (doctorId, filter) => {
  return Patient.countDocuments(doctorId, filter);
};
