import {
  createDepartmentService,
  deleteDepartmentService,
  getDepartmentByIdService,
  getDepartmentsService,
  updateDepartmentService,
} from "../services/departmentService.js";

// ================> create department controller <=============
export const createDepartment = async (req, res, next) => {
  try {
    const data = await createDepartmentService(req.body, req.user);

    res.status(201).json({
      message: "Department created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ================> get departments controller <=============
export const getDepartments = async (req, res, next) => {
  try {
    const { departments, page, totalPages } = await getDepartmentsService(
      req.query,
      req.user
    );

    res.status(200).json({
      departments,
      page,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

// ================> get department by id controller <=============
export const getDepartmentById = async (req, res, next) => {
  try {
    const department = await getDepartmentByIdService(req.params);

    res.status(200).json({
      department,
    });
  } catch (error) {
    next(error);
  }
};

// ================> update department controller <=============
export const updateDepartment = async (req, res, next) => {
  try {
    const updatedDepartment = await updateDepartmentService(
      req.params,
      req.validatedData,
      req.user
    );

    res.status(200).json({
      message: "Department updated successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    next(error);
  }
};

// ================> delete department controller <=============
export const deleteDepartment = async (req, res, next) => {
  try {
    await deleteDepartmentService(req.params, req.user);

    res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
