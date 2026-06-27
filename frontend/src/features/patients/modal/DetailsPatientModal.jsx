import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPatientDetailsQuery } from "../patientsApiSlice";
import { Button, Loader, Pagination } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import { closeModal } from "../../../components/modal/modalSlice";
import { History, X } from "lucide-react";
import Table from "../../../components/table/Table";
import { getAptHistoryColumns } from "../TableColumns";

const DetailsPatientModal = () => {
  const [page, setPage] = useState(1);

  const { patientId } = useSelector((state) => state.modal.modalProps || {});

  const {
    data: patientData,
    isLoading,
    error,
  } = useGetPatientDetailsQuery(patientId);

  const dispatch = useDispatch();

  const patient = patientData?.patient || [];
  const appointment = patientData?.appointments || [];
  // console.log(patient, "Patient...");
  // console.log(appointment, "Appointment...");

  const columns = getAptHistoryColumns({});

  const initials = patient?.name
  ?.split(" ")
  .map((word) => word[0])
  .join("")
  .toUpperCase();

  if (isLoading) {
    <Loader />;
  }

  if (error) {
    <ErrorMessage />;
  }

  return (
    <div className="p-5 sm:p-0 w-fit sm:w-96 md:w-[700px]">
      <div className="flex items-center justify-between border-b px-2 py-4">
        <h2 className="text-xl font-semibold mb-4">Patient Details</h2>

        <button
          onClick={() => dispatch(closeModal())}
          className="text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Patients */}
        <div className="border rounded-xl p-5">
          <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between">
            <div className="flex flex-col items-center sm:flex-row gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-100 flex items-center justify-center text-xl md:text-2xl font-bold text-indigo-700">
                {initials}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="md:text-xl font-semibold">{patient?.name}</h3>
                  <span className="hidden md:block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {patient?.patientId}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mt-1">Active</p>
              </div>
            </div>

            <div className="space-x-4">
              <Button variant="secondary">Edit</Button>
              <Button>Book Appointment</Button>
            </div>
          </div>

          <div className="border-t mt-5 py-5">
            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="font-medium text-gray-800">Phone</p>
                <span className="text-gray-500">{patient?.mobile}</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Age</p>
                <span className="text-gray-500">{patient?.age}</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Gender</p>
                <span className="text-gray-500 capitalize">
                  {patient?.gender}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment History */}
        <div className="border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <History className="text-blue-600" />

            <h3 className="font-semibold text-lg">Appointment History</h3>
          </div>

          <Table columns={columns} data={appointment} />

          {appointment.totalPages > 1 && (
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={appointment?.totalPages || 1}
            />
          )}
        </div>
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
