import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../components/modal/modalSlice";
import { addPatientSchema } from "../../../validator/addPatientValidator";
import { Button, InputField, Loader } from "../../../components/ui";
import { handleApiError } from "../../../utils/handleApiError";
import { useCreatePatientMutation } from "../patientsApiSlice";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";
import RadioField from "../../../components/ui/RadioField";

const AddPatientModal = () => {
  const [createPatient, { isLoading }] = useCreatePatientMutation();
  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addPatientSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await createPatient(data).unwrap();

      dispatch(
        setSuccessFeedback({
          message: res.message || "Patient created successfully",
        })
      );

      setTimeout(() => {
        dispatch(closeModal());

        setTimeout(() => {
          dispatch(resetSuccessFeedback());
        }, 200);
      }, 1500);
    } catch (error) {
      console.error("Error creating patient:", error);
      handleApiError(error, setError);
    }
  };

  return (
    <>
      {isSuccess && (
        <>
          <SuccessFeedback />
          <div className="mt-4 w-full text-center">
            <h1 className="text-lg font-semibold py-3">Created!</h1>
            {message || "Patient created successfully"}
          </div>
        </>
      )}

      <div className="bg-white rounded-lg p-6 sm:w-96">
        {!isSuccess && (
          <>
            <h2 className="text-xl font-semibold mb-4">Add Patient</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <InputField
                  label="Patient name"
                  type="text"
                  {...register("name")}
                  error={errors.name}
                  placeholder="Enter patient name"
                  className="focus:ring focus:border-primary"
                />
              </div>

              {/* Gender */}
              <div className="mb-4">
                <RadioField {...register("gender")} error={errors.gender} />
              </div>

              <div className="mb-4">
                <InputField
                  label="Age"
                  type="number"
                  {...register("age")}
                  error={errors.age}
                  placeholder="Enter patient age"
                  className="focus:ring focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Mobile"
                  type="text"
                  {...register("mobile")}
                  maxLength={10}
                  error={errors.mobile}
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
                  {isLoading ? <Loader /> : "Add"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default AddPatientModal;
