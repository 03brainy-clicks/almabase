import React from "react";

const RichtextField = ({ value, title, placeholder, setValue }) => {
  return (
    <div>
      <div>
        <label htmlFor="Fontsize" className="text-xs">
          {title}
        </label>{" "}
        <br />
        <input
          type="text"
          className="py-2 mt-1 bg-gray-100 px-2 rounded-md text-xs w-full"
          value={value}
          placeholder={placeholder}
          onChange={setValue}
        />
      </div>{" "}
    </div>
  );
};

export default RichtextField;
