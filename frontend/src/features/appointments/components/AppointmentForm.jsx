import React, { useState } from "react";
import { AutocompleteInput, InputField } from "../../../components/ui";
import { Controller, useFormContext } from "react-hook-form";
import { getFullName } from "../../../utils/userHelpers";
import { useSearchDoctorQuery } from "../../dashboard/doctors/doctorsApiSlice";

const AppointmentForm = () => {
  const [search, setSearch] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { data: doctors = [] } = useSearchDoctorQuery(search, {
    refetchOnMountOrArgChange: false,
    skip: search.length < 2,
  });

  return (
    <div className="bg-white border border-gray-300 px-5 py-5 space-y-4 rounded w-full">
      <h1 className="font-semibold text-lg uppercase">Select Doctor & Time</h1>

      {/* Search doctor Input */}
      <Controller
        name="doctor"
        control={control}
        render={({ field }) => (
          <AutocompleteInput
            label="Doctor Name or Department"
            placeholder="Search doctor name or department..."
            value={
              field.value
                ? `${field.value.firstName} ${field.value.lastName}`
                : search
            }
            onChange={(val) => {
              setSearch(val);
              field.onChange(null);
            }}
            onSelect={(doctor) => {
              field.onChange(doctor);
              setSearch("");
            }}
            fetchItems={async () => doctors}
            renderItem={(doctor) => {
              const fullName = getFullName(doctor);

              return (
                <div className="text-sm border-b py-2">
                  <p>{fullName}</p>
                  <p className="text-gray-500 text-xs">
                    {doctor?.departmentId?.name}
                  </p>
                </div>
              );
            }}
            error={errors?.doctor}
          />
        )}
      />

      {/*Appointment Date Field */}
      <Controller
        name="date"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputField
            label="Appointment Date"
            type="date"
            min={today}
            {...field}
            error={errors.date}
            className="focus:ring focus:border-primary"
          />
        )}
      />
    </div>
  );
};

export default AppointmentForm;
