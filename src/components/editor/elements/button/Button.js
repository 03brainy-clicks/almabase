// components/user/Button.js
import { useNode } from "@craftjs/core";
import React, { useState, useEffect, useRef } from "react";
import Modal from "../../../../utils/Modal";

export const Button = ({ size, variant, color, children, text }) => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(false);

  const buttonRef = useRef(null);

  const handleToggle = (e) => {
    if (e.key === "Enter") {
      setToggle((prev) => !prev);
    }
  };

  const handleClickOutside = (e) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <>
      <button
        ref={(ref) => {
          connect(drag(ref));
          buttonRef.current = ref;
        }}
        size={size}
        variant={variant}
        color={color}
        className={`bg-gray-500 text-white py-2 px-5 m-5 absolute${
          active ? "border border-red-500" : "border"
        }`}
        onKeyDown={handleToggle}
        onClick={() => setActive(!active)}
      >
        {text}
      </button>
      <Modal isOpen={toggle} onClose={handleToggle}>
        hello from button
      </Modal>
    </>
  );
};
