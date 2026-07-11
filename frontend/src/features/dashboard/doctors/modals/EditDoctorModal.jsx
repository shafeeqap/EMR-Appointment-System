import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { closeModal } from "../../../../components/modal/modalSlice";
import {
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
} from "../doctorsApiSlice";
import { editDoctorSchema } from "../../../../validator/editDoctorValidator";
import {
  AutocompleteInput,
  Button,
  InputField,
} from "../../../../components/ui";
import { getFullName } from "../../../../utils/userHelpers";
import { toast } from "react-toastify";
import { handleApiError } from "../../../../utils/handleApiError";
import { useGetDepartmentsQuery } from "../../../departments/departmentApiSlice";

const EditDoctorModal = () => {
  const [searchDept, setSearchDept] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);
  const [breakTime, setBreakTime] = useState(false);

  const dispatch = useDispatch();

  const { doctorId } = useSelector((state) => state.modal.modalProps || {});

  const { data: doctorData } = useGetDoctorByIdQuery(doctorId);

  const [updateDoctor, { isLoading }] = useUpdateDoctorMutation();

  const { data: departmentResponse } = useGetDepartmentsQuery({
    page: 1,
    limit: 100,
    search: searchDept,
  });

  const departments = departmentResponse?.departments ?? [];

  const form = useForm({
    resolver: zodResolver(editDoctorSchema),
    defaultValues: {
      name: "",
      department: "",
      slotDuration: "",
      workingStart: "",
      workingEnd: "",
      breakStart: "",
      breakEnd: "",
      hasBreak: "",
    },
  });

  useEffect(() => {
    if (!doctorData?.doctor) return;

    const doctor = doctorData.doctor;

    form.reset({
      name: getFullName(doctor),
      department: doctor.departmentId?.name || "",
      workingStart: doctor.workingHours?.start || "",
      workingEnd: doctor.workingHours?.end || "",
      breakStart: doctor.breakTimes?.[0]?.start || "",
      breakEnd: doctor.breakTimes?.[0]?.end || "",
      slotDuration: String(doctor.slotDuration),
      hasBreak: doctor.breakTimes?.length > 0,
    });
  }, [doctorData, form]);

  const onSubmit = async (data) => {
    const hasChanges =
      Object.keys(form.formState.dirtyFields).length > 0 ||
      selectedDept !== null;

    if (!hasChanges) {
      toast.info("No changes detected");
      return;
    }

    const payload = {
      departmentId: selectedDept?._id || doctorData?.doctor?.departmentId?._id,
      workingHours: {
        start: data.workingStart,
        end: data.workingEnd,
      },

      slotDuration: Number(data.slotDuration),

      breakTimes:
        data.breakStart && data.breakEnd
          ? [{ start: data.breakStart, end: data.breakEnd }]
          : [],
    };

    try {
      const res = await updateDoctor({ id: doctorId, ...payload }).unwrap();
      console.log(res, "Doctor updated successfully");
      toast.success(res.message || "Doctor updated successfully");

      dispatch(closeModal());
    } catch (error) {
      console.error("Error updating doctor:", error);
      handleApiError(error, form.setError);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Update Doctor</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-56 sm:w-fit">
        <div className="mb-4">
          <InputField
            label="Doctor name"
            type="text"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
            placeholder="Enter doctor name"
            className="focus:ring focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <Controller
            name="department"
            control={form.control}
            render={({ field }) => (
              <AutocompleteInput
                label="Specialization/Department"
                value={field.value ?? ""}
                placeholder="Enter specialization or department"
                onChange={(value) => {
                  field.onChange(value);
                  setSearchDept(value);
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
                error={form.formState.errors.department?.message}
                className="focus:ring focus:border-primary"
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
              {...form.register("workingStart")}
              error={form.formState.errors.workingStart?.message}
              className="w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
            />

            <InputField
              label="End"
              type="time"
              {...form.register("workingEnd")}
              error={form.formState.errors.workingEnd?.message}
              className=" w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
            />
          </div>
        </fieldset>

        <div className="mb-4">
          <input
            type="checkbox"
            {...form.register("hasBreak")}
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
                {...form.register("breakStart")}
                error={form.formState.errors.breakStart?.message}
                className="w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
              />

              <InputField
                label="End"
                type="time"
                {...form.register("breakEnd")}
                error={form.formState.errors.breakEnd?.message}
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
            {...form.register("slotDuration")}
            error={form.formState.errors.slotDuration?.message}
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
            {isLoading ? "Updating..." : "Update Doctor"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditDoctorModal;
