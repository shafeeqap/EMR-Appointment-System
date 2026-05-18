import React from "react";

const FilterOption = ({ status, onChange, options, className }) => {
  
  
  return (
    <>
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className={`border border-gray-300 px-3 py-2.5 rounded bg-white ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="overflow-x-hid">
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterOption;
