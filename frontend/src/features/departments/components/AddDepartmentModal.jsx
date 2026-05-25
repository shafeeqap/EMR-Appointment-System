import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createDepartmentSchema } from "../../../validator/departmentValidator";
import { useCreateDepartmentMutation } from "../departmentApiSlice";
import { closeModal } from "../../../components/modal/modalSlice";
import { handleApiError } from "../../../utils/handleApiError";
import { Button, InputField, Loader } from "../../../components/ui";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";

const AddDepartmentModal = () => {
  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();
  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await createDepartment(data).unwrap();
      console.log(res, "CREATE DEPARTMENT RESPONSE");

      dispatch(
        setSuccessFeedback({
          message: res.message || "Department created successfully",
        })
      );
      // toast.success(res.message || "Department created successfully");

      setTimeout(() => {
        dispatch(closeModal());
        dispatch(resetSuccessFeedback());
      }, 1500);
    } catch (error) {
      console.error("Error creating department:", error);
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
            {message || "Department created successfully"}
          </div>
        </>
      )}

      <div className="bg-white rounded-lg p-6 sm:w-96">
        {!isSuccess && (
          <>
            <h2 className="text-xl font-semibold mb-4">Add Department</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <InputField
                  label="Department name"
                  type="text"
                  {...register("name")}
                  error={errors.name}
                  placeholder="Enter department name"
                  className="focus:ring focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Description"
                  type="text"
                  {...register("description")}
                  error={errors.description}
                  placeholder="Enter department description"
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

export default AddDepartmentModal;
