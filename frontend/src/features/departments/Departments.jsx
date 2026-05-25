import React, { useState } from 'react'
import { Button, FilterSearch, Loader, Pagination } from '../../components/ui';
import Table from '../../components/table/Table';
import { getColumns } from './TableColumns';
import ErrorMessage from '../../components/ErrorMessage';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../components/modal/modalSlice';
import { useGetDepartmentsQuery } from './departmentApiSlice';

const Departments = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetDepartmentsQuery({
    page,
    limit: 5,
    search,
  });

  const departments = data?.departments || [];
  console.log("DEPARTMENTS DATA", departments);
  

  const handleAddModalOpen = (row) => {
    dispatch(openModal({ modalType: "ADD_DEPARTMENT", modalProps: {} }));
    console.log("ADD DEPARTMENT CLICKED", row);
  };

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "EDIT_DEPARTMENT",
        modalProps: { departmentId: row._id },
      })
    );
    console.log("EDIT CLICKED", row);
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "DELETE_DEPARTMENT",
        modalProps: { departmentData: row },
      })
    );
    console.log("DELETE CLICKED", row);
  };

  const handleStatusModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "UPDATE_DEPARTMENT_STATUS",
        modalProps: { departmentData: row },
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

      {departments.length === 0 ? (
        <div className="flex justify-center items-center bg-gray-100 mt-5 rounded min-h-20">
          <p>{search ? "No results found" : "No departments available"}</p>
        </div>
      ) : (
        <Table columns={columns} data={departments} />
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



export default Departments