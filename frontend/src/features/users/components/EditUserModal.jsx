import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editUserSchema } from "../../../validator/editUserValidator";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../userApiSlice";
import {
  Button,
  FilterOption,
  InputField,
  Loader,
} from "../../../components/ui";
import { closeModal } from "../../../components/modal/modalSlice";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/handleApiError";
import isEqual from "lodash/isEqual";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";
import { roleOptions } from "../statusOptions";

const EditUserModal = () => {
  const { userId } = useSelector((state) => state.modal.modalProps || {});
  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const { data: userData, isLoading } = useGetUserByIdQuery(userId);

  const user = userData?.user;

  const [updateUser] = useUpdateUserMutation();

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      role: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    });
  }, [user, form]);

  const onSubmit = async (data) => {
    const isChanged = !isEqual(data, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    });

    if (!isChanged) {
      toast.info("No changes detected");
      return;
    }

    try {
      const res = await updateUser({ id: userId, ...data }).unwrap();

      dispatch(
        setSuccessFeedback({
          message: res.message || "User updated successfully",
        })
      );

      setTimeout(() => {
        dispatch(closeModal());

        setTimeout(() => {
          dispatch(resetSuccessFeedback());
        }, 200);
      }, 1500);
    } catch (error) {
      console.error("Error updating user:", error);
      handleApiError(error, form.setError);
    }
  };

  return (
    <>
      {isSuccess && (
        <>
          <SuccessFeedback />
          <div className="mt-4 w-full text-center">
            <h1 className="text-lg font-semibold py-3">Updated!</h1>
            {message || "User updated successfully"}
          </div>
        </>
      )}
      <div className="bg-white rounded-lg p-6 sm:w-96 md:w-[700px]">
        {!isSuccess && (
          <>
            <h2 className="text-xl font-semibold mb-4">Update User</h2>

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="mb-4">
                  <InputField
                    label="First Name"
                    type="text"
                    {...form.register("firstName")}
                    error={form.formState.errors.firstName?.message}
                    placeholder="Enter first name"
                    className="focus:ring focus:border-primary mb-4"
                  />

                  <InputField
                    label="Last Name"
                    type="text"
                    {...form.register("lastName")}
                    error={form.formState.errors.lastName?.message}
                    placeholder="Enter last name"
                    className="focus:ring focus:border-primary mb-4"
                  />

                  <InputField
                    label="Mobile"
                    type="text"
                    {...form.register("mobile")}
                    maxLength={10}
                    error={form.formState.errors.mobile?.message}
                    placeholder="Enter mobile"
                    className="focus:ring focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <InputField
                    label="Email"
                    type="email"
                    {...form.register("email")}
                    error={form.formState.errors.email?.message}
                    placeholder="Enter email"
                    className="focus:ring focus:border-primary mb-4"
                  />

                  <div className="flex flex-col">
                    <FilterOption
                      label="Select Role"
                      options={roleOptions}
                      {...form.register("role")}
                      error={form.formState.errors.role?.message}
                    />
                  </div>
                </div>
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
                  {isLoading ? <Loader /> : "Update"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default EditUserModal;
