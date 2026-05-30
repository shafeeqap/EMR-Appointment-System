import { Department } from "../models/Department.js";

export const createDepartmentRepo = async (data) => {
  return Department.create(data);
};

export const findDepartments = async (filter, skip, limit) => {
  return Department.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
};

export const findDepartmentById = (id) => {
  return Department.findById(id);
};

export const findOneDepartment = (filter) => {
  return Department.findOne(filter);
};

export const findDepartmentByIdAndUpdate = async (id, update, options) => {
  return Department.findByIdAndUpdate(id, update, options);
};

export const findDepartmentByIdAndDelete = async (id) => {
  return Department.findByIdAndDelete(id);
};

export const countDepartmentDocuments = async (fliter) => {
  return Department.countDocuments(fliter);
};
