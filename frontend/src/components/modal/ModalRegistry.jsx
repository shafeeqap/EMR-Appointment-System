import {
  CreateAppointmentModal,
  DeleteAppointmentModal,
  EditAppointmentModal,
  AppointmentDetailsModal,
  UpdateAppointmentStatusModal,
} from "../../features/appointments/modal";
import {
  AddDoctorModal,
  DeleteDoctorModal,
  EditDoctorModal,
  PatientDetails,
  UpdateDoctorStatusModal,
} from "../../features/dashboard/doctors/components";
import {
  UpdateDepartmentStatusModal,
  AddDepartmentModal,
  EditDepartmentModal,
  DeleteDepartmentModal,
} from "../../features/departments/components";
import {
  CancelLeaveRequestModal,
  LeaveDetailsModal,
  UpdateLeaveStatusModal,
} from "../../features/leave/modal";
import {
  AddPatientModal,
  DeletePatientModal,
  DetailsPatientModal,
  EditPatientModal,
} from "../../features/patients/modal";
import {
  AddUserModal,
  DeleteUserModal,
  EditUserModal,
  UpdateUserStatusModal,
} from "../../features/users/components";

export const MODAL_COMPONENTS = {
  // Doctor Modals
  ADD_DOCTOR: AddDoctorModal,
  EDIT_DOCTOR: EditDoctorModal,
  DELETE_DOCTOR: DeleteDoctorModal,
  UPDATE_DOCTOR_STATUS: UpdateDoctorStatusModal,
  PATIENT_DETAILS: PatientDetails,

  // Patient Modals
  ADD_PATIENT: AddPatientModal,
  EDIT_PATIENT: EditPatientModal,
  DELETE_PATIENT: DeletePatientModal,
  DETAILS_PATIENT: DetailsPatientModal,

  // Appointment Modals
  ADD_APPOINTMENT: CreateAppointmentModal,
  EDIT_APPOINTMENT: EditAppointmentModal,
  DELETE_APPOINTMENT: DeleteAppointmentModal,
  DETAILS_APPOINTMENT: AppointmentDetailsModal,
  UPDATE_APPOINTMENT_STATUS: UpdateAppointmentStatusModal,

  // Department Modals
  ADD_DEPARTMENT: AddDepartmentModal,
  EDIT_DEPARTMENT: EditDepartmentModal,
  DELETE_DEPARTMENT: DeleteDepartmentModal,
  UPDATE_DEPARTMENT_STATUS: UpdateDepartmentStatusModal,

  // User Modals
  ADD_USER: AddUserModal,
  EDIT_USER: EditUserModal,
  DELETE_USER: DeleteUserModal,
  UPDATE_USER_STATUS: UpdateUserStatusModal,

  // Leave Modals
  CANCEL_LEAVE_REQUEST: CancelLeaveRequestModal,
  UPDATE_LEAVE_STATUS: UpdateLeaveStatusModal,
  LEAVE_DETAILS: LeaveDetailsModal,
};
