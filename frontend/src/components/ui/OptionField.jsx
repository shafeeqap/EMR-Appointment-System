import React from "react";

const OptionField = ({ error, options, ...props }) => {
  return (
    <>
      <label htmlFor="" className="mb-2">
        Select Role
      </label>
      <select
        {...props}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="overflow-x-hid">
            {opt.label}
          </option>
        ))}
      </select>
      {error?.message && (
        <p className="text-red-500 text-sm">{error?.message}</p>
      )}
    </>
  );
};

export default OptionField;
