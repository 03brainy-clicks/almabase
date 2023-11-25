import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { AlmaLogo } from "../../../assets";
import Modal from "../../../utils/Modal";

const Topbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div className="w-full border-b flex shadow-sm">
      <div className="logo p-4 border-r">
        <img src={AlmaLogo} alt="almalogo" className="w-7 h-7" />
      </div>
      <div className="px-4 flex-1 flex items-center">
        <div className="button ml-auto font-medium">
          <button
            onClick={handleToggle}
            className="py-2 px-5 text-xs font-medium bg-black hover:bg-gray-800 text-white rounded flex gap-1 items-center"
          >
            <CheckIcon className="w-4 " />
            Finish Editing
          </button>
          <Modal isOpen={toggle} onClose={handleToggle}>
            hell its me
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
