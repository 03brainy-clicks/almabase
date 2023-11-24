import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = () => {
    onClose();
  };

  const modalContent = isOpen && isBrowser && (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
      <div className="z-50 bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );

  return isBrowser ? ReactDOM.createPortal(modalContent, document.body) : null;
};

export default Modal;
