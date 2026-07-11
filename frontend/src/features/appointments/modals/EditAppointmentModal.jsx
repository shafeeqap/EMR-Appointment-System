import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAppointmentByIdQuery,
  useGetAvailableSlotsQuery,
  useUpdateAppointmentMutation,
} from "../appointmentApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { editAppointmentSchema } from "../../../validator/editAppointmentValidator";
import { useForm } from "react-hook-form";
import { Button, InputField, Loader } from "../../../components/ui";
import { closeModal } from "../../../components/modal/modalSlice";
import { getFullName } from "../../../utils/userHelpers";
import { useGetDoctorsQuery } from "../../dashboard/doctors/doctorsApiSlice";
import { formatTime } from "../../../utils/formatHours";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/handleApiError";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";
import { isEqual } from "lodash";

const EditAppointmentModal = () => {
  const { appointmentId } = useSelector(
    (state) => state.modal.modalProps || {}
  );

  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const dispatch = useDispatch();

  const today = new Date().toISOString().split("T")[0];

  const methods = useForm({
    resolver: zodResolver(editAppointmentSchema),
    defaultValues: {
      patient: "",
      doctorId: "",
      slotTime: "",
      tokenNumber: "",
      date: "",
      notes: "",
    },
  });

  const {
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isDirty },
    setError,
    reset,
  } = methods;

  const [doctorId, date] = watch(["doctorId", "date"]);

  const { data: slotData, isLoading: slotsLoading } = useGetAvailableSlotsQuery(
    { doctorId, date },
    { skip: !doctorId || !date }
  );

  const {
    data: appointment,
    isLoading,
    error,
  } = useGetAppointmentByIdQuery({
    id: appointmentId,
  });

  const appointmentData = appointment?.appointment;
  console.log(appointmentData, "Appointment");

  const { data } = useGetDoctorsQuery({ page: 1, limit: 100 });
  const doctors = data?.doctors || [];

  const [updateAppointment, { isLoading: updating }] =
    useUpdateAppointmentMutation();

  useEffect(() => {
    if (!appointmentData) return;

    const doctor = appointmentData?.doctorId;

    reset({
      patient: appointmentData?.patientId?.name || "",
      doctorId: doctor?._id,
      slotTime: formatTime(appointmentData?.slotTime),
      tokenNumber: appointmentData?.tokenNumber,
      date: appointmentData?.date
        ? new Date(appointmentData?.date).toISOString().split("T")[0]
        : "",
      notes: appointmentData?.notes,
    });
  }, [appointmentData, reset]);

  const onSubmit = async (values) => {
    const isChanged = !isEqual(values, {
      doctorId: appointmentData?.doctorId?._id,
      slotTime: appointmentData?.slotTime,
      date: appointmentData?.date
        ? new Date(appointmentData?.date).toISOString().split("T")[0]
        : "",
      notes: appointmentData?.notes,
    });

    if (!isChanged) {
      toast.info("No changes detected");
      return;
    }

    const payload = {
      doctorId: values.doctorId,
      slotTime: values.slotTime,
      date: values.date,
      notes: values.notes || "",
    };

    try {
      const res = await updateAppointment({
        id: appointmentId,
        appointmentData: payload,
      }).unwrap();

      dispatch(
        setSuccessFeedback({
          message: res.message || "Appointment updated successfully",
        })
      );

      setTimeout(() => {
        reset();
        dispatch(closeModal());

        setTimeout(() => {
          dispatch(resetSuccessFeedback());
        }, 200);
      }, 1500);
    } catch (error) {
      console.error("Error updating appointment:", error);
      handleApiError(error, setError);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) return <ErrorMessage />;

  return (
    <>
      {isSuccess && (
        <>
          <SuccessFeedback />
          <div className="mt-4 w-full text-center">
            <h1 className="text-lg font-semibold py-3">Updated!</h1>
            {message || "Department updated successfully"}
          </div>
        </>
      )}

      <div className="bg-white w-64 p-6 sm:w-96 md:w-[700px]">
        {!isSuccess && (
          <>
            <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>

            {appointmentData && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <InputField
                    label="Patient Name"
                    type="text"
                    {...register("patient")}
                    className="focus:ring focus:border-primary"
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <InputField
                    label="Slot Time"
                    type="text"
                    {...register("slotTime")}
                    className="focus:ring focus:border-primary"
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <InputField
                    label="Token Number"
                    type="text"
                    {...register("tokenNumber")}
                    className="focus:ring focus:border-primary"
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Doctor Name
                  </label>
                  <select
                    {...register("doctorId")}
                    className="border border-gray-300 px-3 py-2 rounded bg-white w-full focus:ring focus:border-primary"
                  >
                    {/* <option value="">Select Doctor</option> */}
                    {doctors.map((doc) => (
                      <option
                        key={doc._id}
                        value={doc._id}
                        className="text-xs max-w-min sm:text-sm sm:max-w-0"
                      >
                        {getFullName(doc)} -{" "}
                        {appointment?.department?.name || "No Department"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="block text-gray-700 mb-2">Notes</label>
                  <textarea
                    {...register("notes")}
                    error={errors.notes}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <InputField
                    label="Date"
                    type="date"
                    min={today}
                    {...register("date")}
                    error={errors.date}
                    className="focus:ring focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  {slotsLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <label className="block text-gray-700 mb-2">
                        Select Slot
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {slotData?.availableSlots?.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setValue("slotTime", slot)}
                            className={`px-3 py-2 border rounded ${
                              watch("slotTime") === slot
                                ? "bg-primary text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            {formatTime(slot)}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {errors.slotTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.slotTime.message}
                    </p>
                  )}
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
                    {updating ? "Updating..." : "Update Appointment"}
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default EditAppointmentModal;
