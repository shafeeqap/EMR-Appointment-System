import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editPatientSchema } from "../../../validator/editPatientValidator";
import { Button, InputField, Loader } from "../../../components/ui";
import { closeModal } from "../../../components/modal/modalSlice";
import {
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
} from "../patientsApiSlice";
import { handleApiError } from "../../../utils/handleApiError";
import ErrorMessage from "../../../components/ErrorMessage";
import RadioField from "../../../components/ui/RadioField";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";

const EditPatientModal = () => {
  const { patientId } = useSelector((state) => state.modal.modalProps || {});
  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const { data: patientData, isLoading } = useGetPatientByIdQuery(patientId);

  const [updatePatient, { isLoading: loading, error }] =
    useUpdatePatientMutation();

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(editPatientSchema),
    defaultValues: {
      name: "",
      gender: "",
      age: "",
      mobile: "",
    },
  });

  useEffect(() => {
    if (!patientData?.patient) return;

    const patient = patientData.patient;

    form.reset({
      name: patient.name,
      gender: patient.gender,
      age: patient.age,
      mobile: patient.mobile,
    });
  }, [patientData, form]);

  const onSubmit = async (data) => {
    if (!form.formState.isDirty) {
      toast.info("No changes detected");
      return;
    }

    try {
      const res = await updatePatient({ id: patientId, ...data }).unwrap();

      toast.success(res.message || "Patient updated successfully");

      dispatch(
        setSuccessFeedback({
          message: res.message || "Department updated successfully",
        })
      );

      setTimeout(() => {
        dispatch(closeModal());

        setTimeout(() => {
          dispatch(resetSuccessFeedback());
        }, 200);
      }, 1500);
    } catch (error) {
      console.error("Error updating patient:", error);
      handleApiError(error, form.setError);
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
    <>
      {isSuccess && (
        <>
          <SuccessFeedback />
          <div className="mt-4 w-full text-center">
            <h1 className="text-lg font-semibold py-3">Updated!</h1>
            {message || "Department created successfully"}
          </div>
        </>
      )}

      <div className="bg-white rounded-lg p-6 sm:w-96">
        {!isSuccess && (
          <>
            <h2 className="text-xl font-semibold mb-4">Update Patient</h2>

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4">
                <InputField
                  label="Patient name"
                  type="text"
                  {...form.register("name")}
                  error={form.formState.errors.name?.message}
                  placeholder="Enter patient name"
                  className="focus:ring focus:border-primary"
                />
              </div>

              {/* Gender */}
              <div className="mb-4">
                <RadioField
                  {...form.register("gender")}
                  error={form.formState.errors.gender?.message}
                />
              </div>

              <div className="mb-4">
                <InputField
                  label="Age"
                  type="number"
                  {...form.register("age")}
                  error={form.formState.errors.age?.message}
                  placeholder="Enter patient age"
                  className="focus:ring focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Mobile"
                  type="text"
                  {...form.register("mobile")}
                  maxLength={10}
                  error={form.formState.errors.mobile?.message}
                  placeholder="Enter mobile number"
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
                  {loading ? <Loader size="small" /> : "Update Patient"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default EditPatientModal;
