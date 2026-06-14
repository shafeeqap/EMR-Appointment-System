import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema } from "../../../validator/addUserValidator.js";
import {
  Button,
  FilterOption,
  InputField,
  Loader,
} from "../../../components/ui";
import { useCreateUserMutation } from "../userApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../components/modal/modalSlice.js";
import { handleApiError } from "../../../utils/handleApiError.js";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice.js";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback.jsx";
import { roleOptions } from "../statusOptions.js";

const AddUserModal = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const dispatch = useDispatch();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await createUser(data).unwrap();
      toast.success(res.message || "User created successfully");

      dispatch(
        setSuccessFeedback({
          message: res.message || "User created successfully",
        })
      );

      setTimeout(() => {
        dispatch(closeModal());
        dispatch(resetSuccessFeedback());
      }, 1500);
    } catch (error) {
      console.error("Error creating user:", error);
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
            {message || "User created successfully"}
          </div>
        </>
      )}

      <div className="bg-white rounded-lg p-6 sm:w-96 md:w-[700px]">
        {!isSuccess && (
          <>
            <h2 className="text-xl font-semibold mb-4">Add User</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1  md:grid-cols-2 gap-5">
                <div className="mb-4">
                  <InputField
                    label="First Name"
                    type="text"
                    {...register("firstName")}
                    error={errors.firstName}
                    placeholder="Enter first name"
                    className="focus:ring focus:border-primary mb-4"
                  />

                  <InputField
                    label="Last Name"
                    type="text"
                    {...register("lastName")}
                    error={errors.lastName}
                    placeholder="Enter last name"
                    className="focus:ring focus:border-primary mb-4"
                  />

                  <InputField
                    label="Mobile"
                    type="text"
                    {...register("mobile")}
                    maxLength={10}
                    error={errors.mobile}
                    placeholder="Enter mobile"
                    className="focus:ring focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <InputField
                    label="Email"
                    type="email"
                    {...register("email")}
                    error={errors.email}
                    placeholder="Enter email"
                    className="focus:ring focus:border-primary mb-4"
                  />

                  <div className="relative">
                    <InputField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      error={errors.password}
                      placeholder="Enter email"
                      className="focus:ring focus:border-primary mb-4"
                    />
                    <div
                      onClick={handleShowPassword}
                      className="absolute top-11 right-2 cursor-pointer"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <FilterOption
                      label="Select Role"
                      options={roleOptions}
                      {...register("role")}
                      error={errors.role}
                      className="focus:ring focus:border-primary"
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

export default AddUserModal;
