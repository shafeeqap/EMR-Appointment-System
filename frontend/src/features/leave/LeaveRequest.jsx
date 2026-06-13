import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, FilterOption, InputField, Loader } from "../../components/ui";
import { useDispatch } from "react-redux";
import { leaveRequestSchema } from "../../validator/leaveRequest";
import { leaveCategoryOption, leaveTypeOption } from "./optionValue";


const LeaveRequest = () => {
  const [leaveType, setLeaveType] = useState("");
  const [leaveCategory, setLeaveCategory] = useState("");

  console.log(leaveType, leaveCategory);
  
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: { name: "" },
  });

  const isLoading = false; // Replace with actual loading state from API call

  const onSubmit = async (data) => {
    try {
      //   const res = await createPatient(data).unwrap();
      //   dispatch(
      //     setSuccessFeedback({
      //       message: res.message || "Patient created successfully",
      //     })
      //   );
      //   setTimeout(() => {
      //     dispatch(closeModal());
      //     dispatch(resetSuccessFeedback());
      //   }, 1500);
    } catch (error) {
      console.error("Error creating patient:", error);
      //   handleApiError(error, setError);
    }
  };

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Leave Request</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <InputField
              label="Start Date"
              type="date"
              {...register("startDate")}
              error={errors.name}
              placeholder="Enter Start Date"
              className="focus:ring focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <InputField
              label="End Date"
              type="date"
              {...register("endDate")}
              error={errors.age}
              placeholder="Enter End Date"
              className="focus:ring focus:border-primary"
            />
          </div>
          <div className="mb-4">
            <InputField
              label="Reason"
              type="text"
              {...register("reason")}
              maxLength={10}
              error={errors.mobile}
              placeholder="Enter reason"
              className="focus:ring focus:border-primary"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <FilterOption
              label="Leave Type"
              value={leaveType}
              onChange={setLeaveType}
              options={leaveTypeOption}
              error={errors.leaveType}
              className="focus:ring focus:border-primary"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <FilterOption
              label="Leave Category"
              value={leaveCategory}
              onChange={setLeaveCategory}
              options={leaveCategoryOption}
              error={errors.mobile}
              placeholder="Enter mobile number"
              className="focus:ring focus:border-primary"
            />
          </div>
          <div className="">
            <Button
              onClick={"() => dispatch(closeModal())"}
              type="button"
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
      <div className="bg-white p-4 rounded">List</div>
    </div>
  );
};

export default LeaveRequest;
