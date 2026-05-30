import React from "react";

const RadioField = ({ error, ...props }) => {
  return (
    <div>
      <p className="text-gray-700 mb-2">Gender</p>

      <div className="flex gap-6">
        {["male", "female", "other"].map((gender) => (
          <label
            key={gender}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input type="radio" value={gender} {...props} />

            <span className="capitalize">{gender}</span>
          </label>
        ))}
      </div>

      {error?.message && (
        <p className="text-red-500 text-sm mt-1">{error?.message}</p>
      )}
    </div>
  );
};

export default RadioField;
