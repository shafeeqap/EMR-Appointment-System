import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetPatientDetailsQuery } from "../patientsApiSlice";
import { Loader, Pagination } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import { Contact } from "lucide-react";
import Table from "../../../components/table/Table";
import { getAptHistoryColumns } from "../TableColumns";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Histories from "../components/Histories";
import ModalHeader from "../../../components/modal/ModalHeader";

const DetailsPatientModal = () => {
  const [page, setPage] = useState(1);

  const { patientId } = useSelector((state) => state.modal.modalProps || {});

  const { data, isLoading, error } = useGetPatientDetailsQuery({
    id: patientId,
    page,
    limit: 5,
  });

  const patient = data?.patientData?.patient || null;
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
    <div className="p-3 w-72 sm:p-0 sm:w-[500px] md:w-[700px]">
      <ModalHeader
        title="Patient Details"
        icon={<Contact size={40} className="text-primary" />}
        description="View patient information and appointment history"
      />

      <div className="p-6 space-y-6">
        {/* Patients */}
        <Header initials={initials} patient={patient} />

        {/* Appointment History */}
        <div className="border rounded-xl p-5">
          <div>
            <Histories />
          </div>

          <Table columns={columns} data={history} />

          {data?.totalPages > 1 && (
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data?.totalPages || 1}
            />
          )}
        </div>
      </div>

      <Footer isLoading={isLoading} />
    </div>
  );
};

export default DetailsPatientModal;
