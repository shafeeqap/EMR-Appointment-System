import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPatientDetailsQuery } from "../patientsApiSlice";
import { Button, Loader } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import { getFullName } from "../../../utils/userHelpers";
import { closeModal } from "../../../components/modal/modalSlice";

const DetailsPatientModal = () => {
  const { patientId } = useSelector((state) => state.modal.modalProps || {});

  const {
    data: patientData,
    isLoading,
    error,
  } = useGetPatientDetailsQuery(patientId);

  const dispatch = useDispatch();

  const patient = patientData?.patient || [];
  const appointment = patientData?.appointments || [];

  if (isLoading) {
    <Loader />;
  }

  if (error) {
    <ErrorMessage />;
  }

  return (
    <div className="p-5 sm:p-0 md:p-5 w-fit sm:w-96 md:w-[900px]">
      <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm">Patient Info</legend>
          <p className="font-semibold">Name: {patient.name}</p>
          <div className="text-[#383838]">
            <p>Age: {patient.age}</p>
            <p>Mobile: {patient.mobile}</p>
            <p>ID No: {patient.patientId}</p>
          </div>
        </fieldset>

        {appointment.length === 0 ? (
          <div className="mb-5 flex justify-center items-center py-5 px-5 border rounded">
            <p className="capitalize">Appointment not found</p>
          </div>
        ) : (
          <fieldset className="mb-4 border border-gray-300 rounded p-4 overflow-y-auto h-64">
            <legend className="px-2 text-sm">Appointments</legend>
            {appointment.map((appt, index) => {
              const fullName = getFullName(appt.doctorId);
              const date = new Date(appt.date);

              return (
                <div key={index} className="pt-3 pb-3 border-b border-gray-300">
                  <p className="font-semibold">Doctor Name: {fullName}</p>
                  <div className="text-[#383838]">
                    <p>Department: Cardiology</p>
                    <p>
                      Date:
                      <span className="text-blue-600 ml-1">
                        {date.toLocaleDateString("en-GB")}
                      </span>
                    </p>
                    <p>
                      Time:
                      <span className="text-red-600 ml-1">{appt.slotTime}</span>
                    </p>
                    <p>
                      Slot:
                      <span className="text-primary ml-1">
                        {appt.tokenNumber}
                      </span>
                    </p>
                    <p className="uppercase ">
                      Status:
                      <span
                        className={`ml-1 bg-gray-200 px-1 cursor-pointer hover:bg-gray-300 ${
                          appt.status === "booked"
                            ? "text-green-500 hover:text-green-600"
                            : appt.status === "arrived"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </p>

                    <p className="capitalize">
                      Visit Type:{" "}
                      <span className="text-red-600">{appt.notes}</span>{" "}
                    </p>
                  </div>
                </div>
              );
            })}
          </fieldset>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => dispatch(closeModal())}
          type="button"
          variant="secondary"
          className="mr-2 px-4 py-2 transition duration-200"
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isLoading ? <Loader size="small" /> : "OK"}
        </Button>
      </div>
    </div>
  );
};

export default DetailsPatientModal;
