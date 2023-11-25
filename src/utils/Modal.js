import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const modalContent = isOpen && isBrowser && (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
      <div ref={modalRef} className="z-50 bg-white p-5 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );

  return isBrowser ? ReactDOM.createPortal(modalContent, document.body) : null;
};

export default Modal;
