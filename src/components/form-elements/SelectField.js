import React, { useState, useEffect, useRef } from "react";

const SelectField = ({ title, value, options, setValue }) => {
  // State to manage the visibility of the dropdown
  const [toggle, setToggle] = useState(false);

  // Ref to track the dropdown container for detecting clicks outside
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown visibility
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  // Function to handle option selection
  const handleSelect = (option) => {
    setValue(option);
    handleToggle(); // Close the dropdown after selecting an option
  };

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown container
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToggle(false); // Close the dropdown if clicked outside
    }
  };

  // Effect to add and remove event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 

  return (
    <div className="w-full">
      <label htmlFor="Fontsize" className="text-xs">
        {title}
      </label>{" "}
      <br />
      <div className="relative w-full" ref={dropdownRef}>
        <div
          onClick={handleToggle}
          className="py-2 mt-1 bg-gray-100 px-2 rounded-md text-xs w-full"
        >
          {value}
        </div>

        {toggle && (
          <div className="z-50 absolute top-10 w-full m-0 p-0 border rounded-md">
            {/* Display options in the dropdown */}
            <div className="flex flex-col gap-2 bg-white p-2 rounded-md text-xs w-full top-">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="p-1 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;
