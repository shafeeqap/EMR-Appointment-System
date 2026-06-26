import React from "react";
import clsx from "clsx";
import Loader from "./Loader";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  onSelect,
  type = "button",
  onClick,
  className,
  ...props
}) => {
  const baseStyles =
    "rounded font-medium transition duration-200 focus:outline-none";

  const variants = {
    primary: "bg-primary text-white hover:bg-primaryHover",
    secondary: "border border-gray-300 text-black hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600",

    slotAvailable: "bg-primary text-white hover:bg-primaryHover",
    slotBooked: "bg-gray-300 cursor-not-allowed",
    slotSelected: "bg-green-600 text-white",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <>
      <button
        type={type}
        className={clsx(
          baseStyles,
          className,
          variants[variant],
          sizes[size],
          (disabled || isLoading) &&
            "flex justify-center items-center tec opacity-50 cursor-not-allowed"
        )}
        disabled={disabled || isLoading}
        onSelect={onSelect}
        onClick={onClick}
        {...props}
      >
        {isLoading ? <Loader size="small" /> : children}
      </button>
    </>
  );
};

export default Button;
