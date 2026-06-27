import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../components/modal/modalSlice";
import {
  AutocompleteInput,
  Button,
  InputField,
} from "../../../../components/ui";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoctorSchema } from "../../../../validator/addDoctorValidator";
import { useCreateDoctorMutation } from "../doctorsApiSlice";
import { handleApiError } from "../../../../utils/handleApiError";
import { toast } from "react-toastify";
import { useSearchUsersQuery } from "../../../users/userApiSlice";
import { getFullName } from "../../../../utils/userHelpers";
import { useGetDepartmentsQuery } from "../../../departments/departmentApiSlice.js";

const AddDoctorModal = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [searchDept, setSearchDept] = useState("");
  const [breakTime, setBreakTime] = useState(false);

  const dispatch = useDispatch();

  const [createDoctor, { isLoading }] = useCreateDoctorMutation();

  const { data: users = [] } = useSearchUsersQuery(searchUser, {
    refetchOnMountOrArgChange: false,
    skip: searchUser.length < 2,
  });

  const { data } = useGetDepartmentsQuery({
    page: 1,
    limit: 100,
    search: searchDept,
  });

  const departments = data?.departments || [];

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addDoctorSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data) => {
    if (!selectedUser) {
      setError("name", { message: "Please select a user" });
      return;
    }

    const payload = {
      userId: selectedUser._id,

      departmentId: selectedDept._id,

      workingHours: {
        start: data.workingStart,
        end: data.workingEnd,
      },

      slotDuration: Number(data.slotDuration),

      breakTimes:
        data.breakStart && data.breakEnd
          ? [
              {
                start: data.breakStart,
                end: data.breakEnd,
              },
            ]
          : [],
    };

    try {
      const res = await createDoctor(payload).unwrap();
      toast.success(res.message || "Doctor created successfully");

      dispatch(closeModal());
    } catch (error) {
      console.error("Error creating doctor:", error);
      handleApiError(error, setError);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add Doctor</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-56 sm:w-fit">
        {/* Search user */}
        <div className="mb-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <AutocompleteInput
                label="Search user"
                value={field.value ?? ""}
                placeholder="Type to search for users..."
                onChange={(val) => {
                  field.onChange(val);
                  setSearchUser(val);
                  setSelectedUser(null);
                }}
                onSelect={(user) => {
                  const fullName = getFullName(user);

                  field.onChange(fullName);
                  setSearchUser(fullName);
                  setSelectedUser(user);
                }}
                fetchItems={async () => users}
                renderItem={(user) => {
                  const fullName = getFullName(user);

                  return (
                    <div className="text-sm border-b py-2">
                      <p>{fullName}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                      <p className="text-gray-500 text-xs">{user.mobile}</p>
                    </div>
                  );
                }}
                error={errors?.name}
              />
            )}
          />
        </div>

        {/* Selected User */}
        {selectedUser && (
          <div className="mb-4 text-xs mt-2 p-2 bg-gray-200 rounded">
            <p>
              <strong>Name:</strong> {selectedUser.firstName}{" "}
              {selectedUser.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Mobile:</strong> {selectedUser.mobile}
            </p>
          </div>
        )}

        {/*Search departments */}
        <div className="mb-4">
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <AutocompleteInput
                label="Specialization/Department"
                value={field.value ?? ""}
                placeholder="Enter specialization or department"
                onChange={(val) => {
                  field.onChange(val);
                  setSearchDept(val);
                  setSelectedDept(null);
                }}
                onSelect={(dept) => {
                  field.onChange(dept.name);
                  setSearchDept(dept.name);
                  setSelectedDept(dept);
                }}
                fetchItems={async () => departments}
                renderItem={(dept) => {
                  return (
                    <div className="text-sm border-b py-2">
                      <p>{dept?.name}</p>
                    </div>
                  );
                }}
                error={errors?.department}
              />
            )}
          />
        </div>

        {/* Working Hours */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm font-medium">Work Time</legend>

          <div className="flex flex-col sm:flex-row mb-4 gap-5 ">
            <InputField
              label="Start"
              type="time"
              error={errors.workingStart}
              {...register("workingStart")}
              className="w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
            />

            <InputField
              label="End"
              type="time"
              error={errors.workingEnd}
              {...register("workingEnd")}
              className=" w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
            />
          </div>
        </fieldset>

        <div className="mb-4">
          <input
            type="checkbox"
            {...register("hasBreak")}
            onClick={() => setBreakTime(!breakTime)}
            className="mr-1"
          />
          <label htmlFor="" className="text-gray-700">
            Does the doctor have a break during working hours?
          </label>
        </div>

        {/* Break Time */}
        {breakTime && (
          <fieldset className="mb-4 border border-gray-300 rounded p-4">
            <legend className="px-2 text-sm font-medium">Break Time</legend>

            <div className="flex flex-col sm:flex-row gap-5 mb-4 ">
              <InputField
                label="Start"
                type="time"
                {...register("breakStart")}
                error={errors.breakStart}
                className="w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
              />

              <InputField
                label="End"
                type="time"
                {...register("breakEnd")}
                error={errors.breakEnd}
                className="w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
              />
            </div>
          </fieldset>
        )}

        {/* Slot Duration */}
        <div className="mb-4">
          <InputField
            label="Slot Duration (minutes)"
            type="number"
            {...register("slotDuration")}
            error={errors.slotDuration}
            placeholder="Enter slot duration in minutes"
            className="focus:ring focus:border-primary"
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => dispatch(closeModal())}
            type="button"
            variant="secondary"
            className="mr-2 px-4 py-2 transition duration-200"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isLoading} Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorModal;
