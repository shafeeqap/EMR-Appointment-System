import React, { useEffect, useState } from "react";
import { useGetPatientQuery } from "./patientsApiSlice";
import {
  Button,
  FilterOption,
  FilterSearch,
  Loader,
  Pagination,
} from "../../components/ui";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/table/Table";
import { getColumns } from "./TableColumns";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/modalSlice";
import { Plus } from "lucide-react";

const Patients = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetPatientQuery({
    page,
    limit: 5,
    search,
  });

  const patients = data?.patients || [];
  console.log(patients, 'patients');
  

  useEffect(() => {
    if (data && page > data.totalPages) {
      setPage(data.totalPages);
    }
  }, [search, data, page]);

  const handleAddModalOpen = () => {
    dispatch(openModal({ modalType: "ADD_PATIENT", modalProps: {} }));
  };

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "EDIT_PATIENT",
        modalProps: { patientId: row._id },
      })
    );
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "DELETE_PATIENT",
        modalProps: { patientData: row },
      })
    );
  };
  const handleDetailsModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "DETAILS_PATIENT",
        modalProps: { patientId: row._id },
      })
    );
  };

  const columns = getColumns({
    onEdit: handleEditModalOpen,
    onDelete: handleDeleteModalOpen,
    onDetails: handleDetailsModalOpen,
  });

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) return <ErrorMessage />;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex justify-between sm:w-1/2 md:w-1/4">
          <FilterSearch
            value={search}
            onChange={setSearch}
            className="w-full"
          />
        </div>

        <div className="h-10">
          <Button
            onClick={handleAddModalOpen}
            className="w-full h-full flex justify-center items-center"
          >
            <Plus size={20} />
          </Button>
        </div>
      </div>

      {/* <FilterOption status={status} setStatus={setStatus} /> */}

      {patients.length === 0 ? (
        <div className="flex justify-center items-center bg-gray-100 mt-5 rounded min-h-20">
          <p>{search ? "No results found" : "No patients available"}</p>
        </div>
      ) : (
        <Table columns={columns} data={patients} />
      )}

      {data.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data?.totalPages || 1}
        />
      )}
    </>
  );
};

export default Patients;
