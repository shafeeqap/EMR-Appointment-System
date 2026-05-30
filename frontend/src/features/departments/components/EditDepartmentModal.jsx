import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import ErrorMessage from "../../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
} from "../departmentApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDepartmentSchema } from "../../../validator/departmentValidator";
import { toast } from "react-toastify";
import { closeModal } from "../../../components/modal/modalSlice";
import { handleApiError } from "../../../utils/handleApiError";
import { Button, InputField } from "../../../components/ui";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";

const EditDepartmentModal = () => {
  const { departmentId } = useSelector((state) => state.modal.modalProps || {});
  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const dispatch = useDispatch();

  const { data: departmentData, isLoading } =
    useGetDepartmentByIdQuery(departmentId);
  

  const [updateDepartment, { isLoading: loading, error }] =
    useUpdateDepartmentMutation();

  const form = useForm({
    resolver: zodResolver(updateDepartmentSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!departmentData?.department) return;

    const department = departmentData.department;

    form.reset({
      name: department.name,
      description: department.description,
    });
  }, [departmentData, form]);

  const onSubmit = async (data) => {
    if (!form.formState.isDirty) {
      toast.info("No changes detected");
      return;
    }

    try {
      const res = await updateDepartment({
        id: departmentId,
        ...data,
      }).unwrap();

      dispatch(
        setSuccessFeedback({
          message: res.message || "Department updated successfully",
        })
      );

      setTimeout(() => {
        dispatch(closeModal());
        dispatch(resetSuccessFeedback());
      }, 1500);
    } catch (error) {
      console.error("Error updating department:", error);
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
            {message || "Department updated successfully"}
          </div>
        </>
      )}

      <div className="bg-white rounded-lg p-6 sm:w-96">
        {!isSuccess && (
          <>
            <h2 className="text-xl font-semibold mb-4">Update Department</h2>

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4">
                <InputField
                  label="Department name"
                  type="text"
                  {...form.register("name")}
                  error={form.formState.errors.name?.message}
                  placeholder="Enter department name"
                  className="focus:ring focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Description"
                  type="text"
                  {...form.register("description")}
                  error={form.formState.errors.description?.message}
                  placeholder="Enter description"
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
                  {loading ? <Loader size="small" /> : "Update Department"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default EditDepartmentModal;
