import React from "react";
import InputField from "./InputField";

const FilterSearch = ({ value, onChange, className }) => {
  return (
    <div className={`m-auto ${className}`}>
      <InputField
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FilterSearch;
