import React, { useState } from "react";
import { AppointmentForm, PatientInfo, SlotGrid } from "./components";
import { handleApiError } from "../../utils/handleApiError";
import {
  useCreateAppointmentMutation,
  useGetAvailableSlotsQuery,
} from "./appointmentApiSlice";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentFormSchema } from "../../validator/appointmentFormValidator";
import { Button, Loader } from "../../components/ui";

const Scheduler = () => {
  const methods = useForm({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      doctor: null,
      date: "",
      patient: null,
      notes: "",
    },
  });

  const { watch, handleSubmit, setError, reset } = methods;

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [existingPatient, setExistingPatient] = useState(false);

  const [doctor, date] = watch(["doctor", "date"]);

  const { data, isLoading, refetch } = useGetAvailableSlotsQuery(
    {
      doctorId: doctor?._id,
      date: date,
    },
    {
      skip: !doctor || !doctor._id || !date,
    }
  );

  console.log(data, "Available Slots Data");

  const [createAppointment] = useCreateAppointmentMutation();

  const handlePatient = () => {
    setExistingPatient(!existingPatient);
  };

  const onSubmit = async (formData) => {
    if (!selectedSlot) {
      setError("slot", {
        type: "manual",
        message: "Please select a time slot",
      });
      return;
    }

    const payload = {
      doctorId: formData.doctor?._id,
      patientId: formData.patient?._id,
      departmentId: doctor?.departmentId?._id,
      date: formData.date,
      slotTime: selectedSlot,
      notes: formData.notes,
    };

    try {
      const res = await createAppointment(payload).unwrap();
      console.log(res, "APPOINTMENT CREATED");
      toast.success(res.message || "Appointment created successfully");

      // Reset form and state
      reset();
      setSelectedSlot(null);
      setExistingPatient(false);
      refetch();
    } catch (error) {
      handleApiError(error, setError);
      console.log(error, "ERROR CREATING APPOINTMENT");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AppointmentForm />

          <PatientInfo
            handlePatient={handlePatient}
            existingPatient={existingPatient}
          />

          {/* Available Slots */}
          {doctor && date && (
            <SlotGrid
              isOnLeave={data?.isOnLeave}
              leaveReason={data?.leaveReason}
              isleaveType={data?.leaveType}
              availableSlots={data?.availableSlots || []}
              bookedSlots={data?.bookedSlots || []}
              isLoading={isLoading}
              setSelectedSlot={setSelectedSlot}
              selectedSlot={selectedSlot}
            />
          )}
        </div>

        {!data?.isOnLeave && (
          <Button
            type="submit"
            variant="danger"
            className="uppercase w-full mt-5"
          >
            {isLoading ? <Loader /> : "Book Appointment"}
          </Button>
        )}
      </form>
    </FormProvider>
  );
};

export default Scheduler;
