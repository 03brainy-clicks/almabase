import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";


const Dropdown = ({
  open = true,
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleToggle = (e)=> {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className=" border-b">
      <div
        className="flex items-center  justify-between p-5"
        onClick={handleToggle}
      >
        <h6 className="text-xs font-semibold">{title}</h6>
        {isOpen ? (
          <ChevronUpIcon className="w-3" />
        ) : (
          <ChevronDownIcon className="w-3" />
        )}
      </div>
      {isOpen && <div className="">{children}</div>}
    </div>
  );
};

export default Dropdown;