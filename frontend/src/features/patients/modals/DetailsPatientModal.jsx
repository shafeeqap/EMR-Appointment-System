import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetPatientDetailsQuery } from "../patientsApiSlice";
import { Loader } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import { Contact } from "lucide-react";
import { getAptHistoryColumns } from "../TableColumns";
import PatientInfo from "../components/PatientInfo";
import Footer from "../components/Footer";
import Histories from "../components/Histories";
import ModalHeader from "../../../components/modal/ModalHeader";

const DetailsPatientModal = () => {
  const [page, setPage] = useState(1);

  const { patientId } = useSelector((state) => state.modal.modalProps || {});

  const { data, isLoading, error } = useGetPatientDetailsQuery(
    {
      id: patientId,
      page,
      limit: 5,
    },
    { skip: !patientId }
  );

  const patient = data?.patient || null;
  const history = data?.history || [];

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
    <div className="p-3 w-[80vw] sm:p-0 max-w-5xl">
      <ModalHeader
        title="Patient Details"
        icon={<Contact size={40} className="text-primary" />}
        description="View patient information and appointment history"
      />

      <div className="p-6 space-y-6">
        {/* Patients */}
        <PatientInfo initials={initials} patient={patient} />

        {/* Appointment History */}
        <div className="border rounded-xl p-5">
          {history.length === 0 ? (
            <div className="text-center text-gray-500">
              No appointment history found.
            </div>
          ) : (
            <Histories
              columns={columns}
              patientData={data}
              history={history}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </div>

      <Footer isLoading={isLoading} />
    </div>
  );
};

export default DetailsPatientModal;
