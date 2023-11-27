import React from "react";

// Margin component with props: value, title, placeholder, and setValue
const MarginField = ({
  value,
  title,
  setTop,
  setBottom,
  setLeft,
  setRight,
}) => {
  return (
    <div>
      <div>
        <label htmlFor="Fontsize" className="text-xs">
          {title}
        </label>{" "}
        <br />
        <div className="flex gap-2">
          <input
            type="number"
            className="py-2 mt-1 bg-gray-100 px-2 rounded-md text-xs w-full"
            value={value.top | 0}
            placeholder={"Top"}
            onChange={setTop}
          />
          <input
            type="number"
            className="py-2 mt-1 bg-gray-100 px-2 rounded-md text-xs w-full"
            value={value.bottom | 0}
            placeholder={"Bottom"}
            onChange={setBottom}
          />
          <input
            type="number"
            className="py-2 mt-1 bg-gray-100 px-2 rounded-md text-xs w-full"
            value={value.left | 0}
            placeholder={"Left"}
            onChange={setLeft}
          />
          <input
            type="number"
            className="py-2 mt-1 bg-gray-100 px-2 rounded-md text-xs w-full"
            value={value.right | 0}
            placeholder={"Right"}
            onChange={setRight}
          />
        </div>
      </div>{" "}
    </div>
  );
};

export default MarginField;
