import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  FilterOption,
  FilterSearch,
  InputField,
  Loader,
  Pagination,
} from "../../components/ui";
import { leaveRequestSchema } from "../../validator/leaveRequest";
import { leaveCategoryOption, leaveTypeOption } from "./optionValue";
import { handleApiError } from "../../utils/handleApiError";
import { useApplyLeaveMutation, useGetLeavesQuery } from "./leaveApiSlice";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/ErrorMessage";
import { formatDate } from "../../utils/formatDate";
import { categories } from "./config/leave.config";
import { LeaveCard } from "./components";

const LeaveRequest = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  console.log(search, "Current search value");

  const [applyLeave, { isLoading }] = useApplyLeaveMutation();

  const { data: leaveData, error } = useGetLeavesQuery({
    page,
    limit: 3,
    search,
    category,
  });

  // console.log(leaveData, "Fetched leave data");

  const leaves = leaveData?.leaves?.leaves || [];

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leaveRequestSchema),
  });

  const handleFilterChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const onSubmit = async (formData) => {
    const payload = {
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      leaveType: formData.leaveType,
      leaveCategory: formData.leaveCategory,
    };

    try {
      const res = await applyLeave(payload).unwrap();
      console.log(res, "Leave applied successfully");
      toast.success(res.message || "Leave applied successfully");
      reset();
    } catch (error) {
      console.error("Error creating leave:", error);
      handleApiError(error, setError);
    }
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) return <ErrorMessage />;

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <div className="bg-white p-5 rounded">
        <h2 className="text-xl font-semibold">Leave Request</h2>
        <p className="text-gray-600 mb-2">
          Use the form below to submit a new leave request. Please provide all
          the necessary details for processing your request.
        </p>

        {/* Border line */}
        <div className="border mb-4" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <InputField
              label="Start Date"
              type="date"
              {...register("startDate")}
              error={errors.startDate}
              placeholder="Enter Start Date"
              className="focus:ring focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <InputField
              label="End Date"
              type="date"
              {...register("endDate")}
              error={errors.endDate}
              placeholder="Enter End Date"
              className="focus:ring focus:border-primary"
            />
          </div>
          <div className="mb-4">
            <InputField
              label="Reason"
              type="text"
              {...register("reason")}
              error={errors.reason}
              placeholder="Enter reason"
              className="focus:ring focus:border-primary"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <FilterOption
              label="Leave Type"
              options={leaveTypeOption}
              error={errors.leaveType}
              {...register("leaveType")}
              className="focus:ring focus:border-primary"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <FilterOption
              label="Leave Category"
              options={leaveCategoryOption}
              error={errors.leaveCategory}
              {...register("leaveCategory")}
              className="focus:ring focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Button
              type="button"
              onClick={() => reset()}
              variant="secondary"
              className="mr-2 px-4 py-2 transition duration-200"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isLoading ? <Loader /> : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>

      {/* Leave History */}
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold">Leave Request History</h2>
        <p className="text-gray-600 mb-2">
          View your past leave requests and their statuses here.
        </p>

        {/* Border line */}
        <div className="border mb-4" />

        {/* Navigation */}
        <menu className="sm:bg-gray-200 rounded">
          <div className="grid grid-cols-3 sm:grid-cols-4 sm:py-2 sm:px-2 gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => handleFilterChange(cat.value)}
                variant={category === cat.value ? "primary" : "secondary"}
                className="w-full transition duration-200 text-center"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </menu>

        <div className="mt-4">
          <FilterSearch value={search} onChange={setSearch} />
        </div>

        {/* Display past leave */}
        {leaves.length === 0 ? (
          <div>
            <p className="text-gray-600 mt-4 p-5">
              No leave requests found. Your leave history will appear here once
              you submit a request.
            </p>
          </div>
        ) : (
          <>
            {/* Leave Card */}
            {leaves.map((leave) => {
              return (
                <LeaveCard
                  key={leave._id}
                  leaveId={leave._id}
                  month={new Date(leave.startDate).toLocaleString("default", {
                    month: "long",
                  })}
                  leaveCategory={leave.leaveCategory}
                  leavePeriod={`${formatDate(leave.startDate)} - ${formatDate(
                    leave.endDate
                  )}`}
                  leaveType={leave.leaveType}
                  reason={leave.reason}
                  status={leave.status}
                />
              );
            })}
          </>
        )}

        {leaveData?.leaves?.totalPages > 1 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={leaveData?.leaves?.totalPages || 1}
          />
        )}
      </div>
    </div>
  );
};

export default LeaveRequest;
