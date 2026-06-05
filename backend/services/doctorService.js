import { findDepartmentById } from "../repositories/departmentRepository.js";
import {
  countDoctorDocuments,
  createDoctorRepo,
  findDoctorByEmail,
  findDoctorById,
  findDoctorByIdAndDelete,
  findDoctorByIdAndUpdate,
  findDoctors,
  findDoctorsBySearchQuery,
} from "../repositories/doctorRepository.js";
import { findUserById } from "../repositories/userRepository.js";
import { AppError } from "../utils/AppError.js";
import { logAction } from "../utils/auditLogger.js";

// =============> create doctor service <=============
export const createDoctorService = async (data, user) => {
  const { userId, departmentId, workingHours, slotDuration, breakTimes } = data;

  const userData = await findUserById(userId);

  if (!userData) {
    throw new AppError("User not found", 404);
  }

  const departmentData = await findDepartmentById(departmentId);

  if (!departmentData) {
    throw new AppError("Department not found", 404);
  }

  if (userData.role !== "doctor") {
    throw new AppError("Assigned user must have doctor role", 400);
  }

  const existingDoctor = await findDoctorByEmail(userData.email);

  if (existingDoctor) {
    throw new AppError("Doctor already exists", 409);
  }

  const doctor = await createDoctorRepo({
    userId: userData._id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    departmentId: departmentData._id,
    workingHours,
    slotDuration,
    breakTimes,
    createdBy: user.id,
  });

  await logAction({
    userId: user.id,
    role: user.role,
    action: "CREATE_DOCTOR",
    entity: "Doctor",
    entityId: doctor._id,
    metadata: {
      doctorId: doctor._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
    },
  });

  return doctor;
};

// =============> search doctors by search query service <=============
export const searchDoctorService = async (query) => {
  const { search } = query;

  if (!search) {
    throw new AppError("Search query is required", 400);
  }

  const searchQuery = search
    ? {
        $or: [
          { firstName: { $regex: `^${search}`, $options: "i" } },
          { lastName: { $regex: `^${search}`, $options: "i" } },
          { department: { $regex: `^${search}`, $options: "i" } },
        ],
      }
    : {};

  const doctors = await findDoctorsBySearchQuery(searchQuery);

  return doctors;
};

// =============> get all doctors service <=============
export const getDoctorsServices = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const skip = (page - 1) * limit;
  const search = query.search?.trim();
  const status = query.status;

  const filter = {};

  if (search) {
    filter.$or = [
      { firstName: { $regex: `^${search}`, $options: "i" } },
      { lastName: { $regex: `^${search}`, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { department: { $regex: search, $options: "i" } },
    ];
  }

  if (status === "active") {
    filter.isActive = true;
  } else if (status === "inactive") {
    filter.isActive = false;
  }

  const total = await countDoctorDocuments(filter);

  const doctors = await findDoctors(filter, skip, limit);

  const totalPages = Math.ceil(total / limit);

  return { doctors, page, totalPages };
};

// =============> get doctor by id service <=============
export const getDoctorByIdServices = async (doctorId) => {
  if (!doctorId) {
    throw new AppError("Doctor id is required", 400);
  }

  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  return doctor;
};

// =============> update doctor service <=============
export const updateDoctorService = async (params, data, user) => {
  const doctorId = params.id;

  const { departmentId, workingHours, slotDuration, breakTimes } = data;

  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  const updatedData = await findDoctorByIdAndUpdate(
    doctorId,
    {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      email: doctor.email,
      departmentId,
      workingHours,
      slotDuration,
      breakTimes,
    },
    { returnDocument: "after" }
  );

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_DOCTOR",
    entity: "Doctor",
    entityId: doctor._id,
    metadata: {
      doctorId: doctor._id,
      previousData: {
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email,
        department: doctor.departmentId,
        workingHours: doctor.workingHours,
        slotDuration: doctor.slotDuration,
        breakTime: doctor.breakTimes,
      },
      updatedData: {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        departmentId: updatedData.departmentId,
        workingHours,
        slotDuration,
        breakTimes,
      },
    },
  });

  return updatedData;
};

// =============> Update doctor status service <=============
export const updateDoctorStatusService = async (params, data, user) => {
  const id = params.id;
  const { status } = data;

  const doctor = await findDoctorById(id);
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  doctor.isActive = status;
  await doctor.save();

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_DOCTOR_STATUS",
    entity: "Doctor",
    entityId: doctor._id,
    metadata: {
      oldStatus: status,
      newStatus: doctor.isActive,
    },
  });

  return doctor;
};

// =============> Delete doctor service <=============
export const deleteDoctorService = async (params, user) => {
  const doctorId = params.id;

  const deletedDoctor = await findDoctorByIdAndDelete(doctorId);

  if (!deletedDoctor) {
    throw new AppError("Doctor not found", 404);
  }

  await logAction({
    userId: user.id,
    role: user.role,
    action: "DELETE_DOCTOR",
    entity: "Doctor",
    entityId: deletedDoctor._id,
    metadata: {
      firstName: deletedDoctor.firstName,
      lastName: deletedDoctor.lastName,
      department: deletedDoctor.departmentId,
      workingHours: deletedDoctor.workingHours,
      slotDuration: deletedDoctor.slotDuration,
      breakTimes: deletedDoctor.breakTimes,
    },
  });
};
