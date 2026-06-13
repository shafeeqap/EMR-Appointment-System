import React from "react";

const FilterOption = ({
  id,
  error,
  label,
  value,
  onChange = () => {},
  options = [],
  className,
  ...props
}) => {
  return (
    <>
      <label htmlFor={id} className="block mb-2 text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border border-gray-300 px-3 py-2.5 rounded bg-white ${className}`}
        {...props}
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

export default FilterOption;
