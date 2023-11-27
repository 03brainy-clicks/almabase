import React from "react";

// NumberField component with props: value, title, and setValue
const NumberField = ({ value, title, setValue }) => {
  return (
    <div>
      <div>
        <label htmlFor="Fontsize" className="text-xs">
          {title}
        </label>{" "}
        <br />
        <input
          type="number"
          className="py-2 mt-1 bg-gray-100 px-2 rounded-md text-xs w-full"
          value={value}
          onChange={setValue}
        />
      </div>{" "}
    </div>
  );
};

export default NumberField;
