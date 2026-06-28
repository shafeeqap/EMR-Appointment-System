import React, { useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentFormSchema } from "../../../validator/appointmentFormValidator";
import {
  useCreateAppointmentMutation,
  useGetAvailableSlotsQuery,
} from "../appointmentApiSlice";
import PatientInfo from "../components/PatientInfo";
import SlotGrid from "../components/SlotGrid";
import { Button, Loader } from "../../../components/ui";
import { handleApiError } from "../../../utils/handleApiError";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";
import { closeModal } from "../../../components/modal/modalSlice";

const CreateAppointmentModal = () => {
  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const methods = useForm({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      doctor: null,
      date: "",
      patient: null,
      notes: "",
    },
  });

  const dispatch = useDispatch();

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
      date: formData.date,
      slotTime: selectedSlot,
      notes: formData.notes,
    };

    try {
      const res = await createAppointment(payload).unwrap();
      console.log(res, "APPOINTMENT CREATED");
      dispatch(
        setSuccessFeedback({
          message: res.message || "Appointment created successfully",
        })
      );

      setTimeout(() => {
        dispatch(closeModal());

        setTimeout(() => {
          dispatch(resetSuccessFeedback());
        }, 200);
      }, 1500);

      setSelectedSlot(null);
      setExistingPatient(false);
      reset();
      refetch();
    } catch (error) {
      handleApiError(error, setError);
      console.log(error, "ERROR CREATING APPOINTMENT");
    }
  };

  return (
    <>
      {isSuccess && (
        <>
          <SuccessFeedback />
          <div className="mt-4 w-full text-center">
            <h1 className="text-lg font-semibold py-3">Created!</h1>
            {message || "Appointment created successfully"}
          </div>
        </>
      )}

      {!isSuccess && (
        <>
          <h1 className="mb-4 text-xl py-3 font-semibold">
            Create appointment
          </h1>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-5">
                <AppointmentForm />

                <PatientInfo
                  handlePatient={handlePatient}
                  existingPatient={existingPatient}
                />

                {doctor && date && (
                  <SlotGrid
                    availableSlots={data?.availableSlots || []}
                    bookedSlots={data?.bookedSlots || []}
                    isLoading={isLoading}
                    setSelectedSlot={setSelectedSlot}
                    selectedSlot={selectedSlot}
                  />
                )}
              </div>

              <div className="flex flex-col px-5 py-5 gap-5 sm:flex-row">
                <Button
                  onClick={() => dispatch(closeModal())}
                  variant="secondary"
                  className="uppercase w-full"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="danger"
                  className="uppercase w-full"
                >
                  {isLoading ? <Loader /> : "Book Appointment"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </>
  );
};

export default CreateAppointmentModal;
