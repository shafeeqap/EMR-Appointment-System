import React, { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./authSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validator/authValidator";
import { handleApiError } from "../../utils/handleApiError";
import InputField from "../../components/ui/InputField";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../components/ui/Button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log(res, "res");

      dispatch(
        setCredentials({
          user: res.user,
          accessToken: res.accessToken,
        })
      );

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      handleApiError(error, setError);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-10 bg-[#e5e7eb]">
      <div className="bg-white w-full sm:w-[70%] md:w-80 px-5 py-10 border shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <p className="text-sm">
          Enter your credentials to log in to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-10">
          <InputField
            label="Email"
            type="email"
            error={errors.email}
            {...register("email")}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none"
          />

          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              error={errors.password}
              {...register("password")}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none"
            />
            <div
              onClick={handleShowPassword}
              className="absolute top-12 right-2 cursor-pointer"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
            <div className="text-end mt-1">
              <p className="text-sm text-[#3B7A99] cursor-pointer hover:text-[#6FA3D8]">
                Forgot Password?
              </p>
            </div>
          </div>

          <Button
            type="submit"
            varient="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <Link to="#" className="link link-primary">
            <span className="text-[#3B7A99]">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
