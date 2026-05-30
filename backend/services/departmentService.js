import {
  countDepartmentDocuments,
  createDepartmentRepo,
  findDepartmentById,
  findDepartmentByIdAndDelete,
  findDepartmentByIdAndUpdate,
  findDepartments,
  findOneDepartment,
} from "../repositories/departmentRepository.js";
import { AppError } from "../utils/AppError.js";
import { logAction } from "../utils/auditLogger.js";

// =============> create department service <=============
export const createDepartmentService = async (data, user) => {
  const { name, description } = data;

  const existingDepartment = await findOneDepartment({ name });

  if (existingDepartment) {
    throw new AppError("Department already exists", 400);
  }

  const department = await createDepartmentRepo({
    name,
    description,
  });

  await logAction({
    userId: user.id,
    role: user.role,
    action: "CREATE_DEPARTMENT",
    entity: "Department",
    entityId: department._id,
    metadata: {
      name,
      description,
    },
  });

  return department;
};

// =============> get departments service <=============
export const getDepartmentsService = async (query, user) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const skip = (page - 1) * limit;
  const search = query.search?.trim();

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: `^${search}`, $options: "i" } },
      { description: { $regex: `^${search}`, $options: "i" } },
    ];
  }

  const total = await countDepartmentDocuments(filter);

  const departments = await findDepartments(filter, skip, limit);

  const totalPages = Math.ceil(total / limit);

  return { departments, page, totalPages };
};

// =============> get department by id service <=============
export const getDepartmentByIdService = async (params) => {
  const departmentId = params.id;

  const department = await findDepartmentById(departmentId);
  if (!department) {
    throw new AppError("Department not found", 404);
  }

  return department;
};

// =============> update department service <=============
export const updateDepartmentService = async (params, data, user) => {
  const id = params.id;
  const { name, description } = data;

  const department = await findDepartmentById(id);
  if (!department) {
    throw new AppError("Department not found", 404);
  }

  const updatedDepartment = await findDepartmentByIdAndUpdate(
    id,
    { name, description },
    { returnDocument: "after" }
  );

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_DEPARTMENT",
    entity: "Department",
    entityId: department._id,
    metadata: {
      departmentId: department._id,
      previousData: {
        name: department.name,
        description: department.description,
      },
      updatedData: {
        name,
        description,
      },
    },
  });

  return updatedDepartment;
};

// =============> update department status service <=============
export const updateDepartmentStatusService = async (params, data, user) => {
  const id = params.id;
  const { status } = data;

  const department = await findDepartmentById(id);
  if (!department) {
    throw new AppError("Department not found", 404);
  }

  department.isActive = status;
  await department.save();

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_DEPARTMENT_STATUS",
    entity: "Department",
    entityId: department._id,
    metadata: {
      departmentId: department._id,
      previousStatus: department.status,
      updatedStatus: status,
    },
  });

  return department;
};

// =============> delete department service <=============
export const deleteDepartmentService = async (params, user) => {
  const departmentId = params.id;

  const deletedDepartment = await findDepartmentByIdAndDelete(departmentId);

  if (!deletedDepartment) {
    throw new AppError("Department not found", 404);
  }

  await logAction({
    userId: user.id,
    role: user.role,
    action: "DELETE_DEPARTMENT",
    entity: "Department",
    entityId: deletedDepartment._id,
    metadata: {
      name: deletedDepartment.name,
      description: deletedDepartment.description,
    },
  });
};
