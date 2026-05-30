import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { useGetDoctorsQuery } from "./doctorsApiSlice";
import {
  Button,
  Loader,
  Pagination,
  FilterSearch,
  FilterOption,
} from "../../../components/ui";
import { getColumns } from "./TableColumns";
import { useDispatch } from "react-redux";
import { openModal } from "../../../components/modal/modalSlice";
import { Plus } from "lucide-react";
import ErrorMessage from "../../../components/ErrorMessage";
import { statusOptions } from "./config/doctor.config";

const Doctors = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, error } = useGetDoctorsQuery({
    page,
    limit: 5,
    search,
    status,
  });

  const dispatch = useDispatch();

  const doctors = data?.doctors || [];

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleAddModalOpen = () => {
    dispatch(openModal({ modalType: "ADD_DOCTOR", modalProps: {} }));
  };

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "EDIT_DOCTOR", modalProps: { doctorId: row._id } })
    );
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "DELETE_DOCTOR",
        modalProps: { doctorData: row },
      })
    );
  };

  const handleStatusModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "UPDATE_DOCTOR_STATUS",
        modalProps: { doctorData: row },
      })
    );
  };

  const columns = getColumns({
    onEdit: handleEditModalOpen,
    onDelete: handleDeleteModalOpen,
    onUpdateStatus: handleStatusModalOpen,
  });

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );

  if (error) return <ErrorMessage />;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
        <div className="flex flex-col md:flex-row items-center md:space-x-5 space-y-3 md:space-y-0 sm:w-1/2">
          <FilterSearch
            value={search}
            onChange={setSearch}
            className="w-full"
          />

          <FilterOption
            status={status}
            onChange={setStatus}
            options={statusOptions}
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

      {doctors.length === 0 ? (
        <div className="flex justify-center items-center bg-gray-100 mt-5 rounded min-h-20">
          <p>{search ? "No results found" : "No doctors available"}</p>
        </div>
      ) : (
        <Table columns={columns} data={doctors} />
      )}

      {data.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data.totalPages || 1}
        />
      )}
    </>
  );
};

export default Doctors;
