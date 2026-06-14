import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/modalSlice";
import { useGetUserQuery } from "./userApiSlice";
import { getColumns } from "./TableColumns";
import {
  Button,
  FilterOption,
  FilterSearch,
  Loader,
  Pagination,
} from "../../components/ui";
import { Plus } from "lucide-react";
import ErrorMessage from "../../components/ErrorMessage";
import { statusOptions } from "./statusOptions";

const Users = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, error } = useGetUserQuery({
    page,
    limit: 5,
    search,
    status,
  });

  const dispatch = useDispatch();

  const users = data?.users || [];

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleAddModalOpen = () => {
    dispatch(openModal({ modalType: "ADD_USER", modalProps: {} }));
  };

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "EDIT_USER", modalProps: { userId: row._id } })
    );
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "DELETE_USER", modalProps: { userData: row } })
    );
  };

  const handleStatusModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "UPDATE_USER_STATUS",
        modalProps: { userId: row._id },
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
      <div>
        <Loader />
      </div>
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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

      {users.length === 0 ? (
        <div className="flex justify-center items-center bg-gray-100 mt-5 rounded min-h-20">
          <p>{search ? "No results found" : "No users available"}</p>
        </div>
      ) : (
        <Table columns={columns} data={users} />
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

export default Users;
