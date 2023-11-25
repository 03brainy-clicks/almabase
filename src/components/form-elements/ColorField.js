import React from "react";

const ColorField = ({ value, title, setValue }) => {
  return (
    <div>
      <div>
        <label htmlFor="Fontsize" className="text-xs">
          {title}
        </label>{" "}
        <br />
        <div className="w-full rounded-md  overflow-hidden border bg-gray-100">
          <input
            type="color"
            value={value}
            onChange={setValue}
            className="w-full border-none outline-none bg-white p-0 m-0 "
          />
        </div>
      </div>{" "}
    </div>
  );
};

export default ColorField;
