import { Patient } from "../models/Patient.js";
import {
  createPatientService,
  deletePatientService,
  getPatientByIdService,
  getPatientFullDetailsService,
  getPatientService,
  searchPatientService,
  updatePatientService,
} from "../services/patientService.js";

// ===========> Create patient <===========
export const createPatient = async (req, res, next) => {
  try {
    const patient = await createPatientService(req.validatedData, req.user);

    return res
      .status(201)
      .json({ message: "Patien created successfully", patient });
  } catch (error) {
    next(error);
  }
};

// ===========> Get all patient <===========
export const getPatients = async (req, res, next) => {
  try {
    const { patients, page, totalPages } = await getPatientService(
      req.query,
      req.user
    );

    res.status(200).json({ patients, page, totalPages });
  } catch (error) {
    next(error);
  }
};

// =============> Search patients by search query <=============
export const searchPatients = async (req, res, next) => {
  try {
    const data = await searchPatientService(req.query);

    res.status(200).json({ patients: data });
  } catch (error) {
    next(error);
  }
};

// ===========> Get Patinet full details <===========
export const getPatientFullDetails = async (req, res, next) => {
  try {
    const { patientData, history, page, totalPages } =
      await getPatientFullDetailsService(req.params, req.query);

    res.status(200).json({ patientData, history, page, totalPages });
  } catch (error) {
    next(error);
  }
};

// ===========> Get patient by ID <===========
export const getPatientById = async (req, res, next) => {
  try {
    const patient = await getPatientByIdService(req.params);

    console.log(patient, "Patient...");

    res.status(200).json({ patient });
  } catch (error) {
    next(error);
  }
};

// ===========> Update patient <===========
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await updatePatientService(
      req.params,
      req.validatedData,
      req.user
    );

    res.status(200).json({
      message: "Patient updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// ===========> Delete patient <===========
export const deletePatient = async (req, res, next) => {
  try {
    await deletePatientService(req.params, req.user);

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    next(error);
  }
};
