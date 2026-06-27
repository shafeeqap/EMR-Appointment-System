import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { getColumns } from "./TableColumns";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/modalSlice";
import { useGetAppointmentsQuery } from "./appointmentApiSlice";
import {
  Button,
  FilterOption,
  FilterSearch,
  InputField,
  Loader,
  Pagination,
} from "../../components/ui";
import { Plus } from "lucide-react";
import ErrorMessage from "../../components/ErrorMessage";
import { appointmentOptions } from "./appointmentOptions";

const Booking = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [date, setDate] = useState("");

  const { data, isLoading, error } = useGetAppointmentsQuery({
    page,
    limit: 5,
    search,
    date,
    status: filter,
  });

  const appointments = data?.appointments || [];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!search && !filter) return;

    setPage(1);
  }, [search, filter]);

  const handleAddModalOpen = () => {
    dispatch(openModal({ modalType: "ADD_APPOINTMENT", modalProps: {} }));
  };

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "EDIT_APPOINTMENT",
        modalProps: { appointmentId: row._id },
      })
    );
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "DELETE_APPOINTMENT",
        modalProps: { appointmentData: row },
      })
    );
  };

  const handleDetailsModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "DETAILS_APPOINTMENT",
        modalProps: { appointmentId: row._id },
      })
    );
  };

  const handleStatusModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "UPDATE_APPOINTMENT_STATUS",
        modalProps: { appointment: row },
      })
    );
  };

  const columns = getColumns({
    onEdit: handleEditModalOpen,
    onDelete: handleDeleteModalOpen,
    onDetails: handleDetailsModalOpen,
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
        <div className="flex flex-col md:items-center md:flex-row md:space-x-5 space-y-3 md:space-y-0 sm:w-1/2">
          <FilterSearch
            value={search}
            onChange={setSearch}
            className="w-full"
          />

          <FilterOption
            value={filter}
            onChange={(e)=> setFilter(e.target.value)}
            options={appointmentOptions}
            className="w-full"
          />
        </div>

        <div className="flex flex-col sm:items-end md:flex-row md:space-x-5 space-y-3 md:space-y-0">
          <InputField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className=" sm:w-72 md:w-80"
          />
          <div className="h-10">
            <Button
              onClick={handleAddModalOpen}
              className="w-full h-full flex justify-center items-center"
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="flex justify-center items-center bg-gray-100 mt-5 rounded min-h-20">
          <p>{search ? "No results found" : "No appointments available"}</p>
        </div>
      ) : (
        <Table columns={columns} data={appointments} />
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

export default Booking;
