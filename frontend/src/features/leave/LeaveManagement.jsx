import React, { useState } from 'react'
import { useGetLeavesQuery } from './leaveApiSlice';
import { getColumns } from './TableColumns';
import { useDispatch } from 'react-redux';
import { openModal } from '../../components/modal/modalSlice';
import { Button, FilterOption, FilterSearch, Loader, Pagination } from '../../components/ui';
import ErrorMessage from '../../components/ErrorMessage';
import { Plus } from 'lucide-react';
import Table from '../../components/table/Table';

const LeaveManagement = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  // const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const { data: leaveData, isLoading, error } = useGetLeavesQuery({
    page,
    limit: 3,
    search,
    status,
  });

  const leaves = leaveData?.leaves?.leaves || [];

console.log(leaves, "Fetched leave data in LeaveManagement");


  const handleStatusModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "UPDATE_LEAVE_STATUS",
        modalProps: { leaveId: row._id },
      })
    );
  };


  const columns = getColumns({
    // onEdit: handleEditModalOpen,
    // onDelete: handleDeleteModalOpen,
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

          {/* <FilterOption
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={"statusOptions"}
            className="w-full"
          /> */}
        </div>

        <div className="h-10">
          <Button
            // onClick={"handleAddModalOpen"}
            className="w-full h-full flex justify-center items-center"
          >
            <Plus size={20} />
          </Button>
        </div>
      </div>

      {leaves.length === 0 ? (
        <div className="flex justify-center items-center bg-gray-100 mt-5 rounded min-h-20">
          <p>{search ? "No results found" : "No users available"}</p>
        </div>
      ) : (
        <Table columns={columns} data={leaves} />
      )}

      {leaveData.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={leaveData?.totalPages || 1}
        />
      )}
    </>
  )
}

export default LeaveManagement