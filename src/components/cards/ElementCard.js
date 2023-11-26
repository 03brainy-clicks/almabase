import React from "react";
import { GripVerticalIcon } from "../../assets";

const ElementCard = ({ title }) => {
  return (
    <div className="py-2 bg-gray-100 px-2 rounded-md text-xs  flex items-center gap-2 cursor-pointer">
      <div className="text-gray-400 flex items-center">
        <img src={GripVerticalIcon} alt="" className="w-3 md:block hidden" />
      </div>
      {title}
    </div>
  );
};
export default ElementCard;