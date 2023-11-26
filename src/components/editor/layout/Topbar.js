import React, { useState } from "react";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AlmaLogo } from "../../../assets";
import Modal from "../../../utils/Modal";
import lz from "lzutf8";
import copy from "copy-to-clipboard";
import { useEditor } from "@craftjs/core";

const Topbar = () => {
  const { actions, query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [toggle, setToggle] = useState(false);
  const [copyValue, setCopyValue] = useState(false);
  const [stateToLoad, setStateToLoad] = useState(null);

  const handleSaveCopy = () => {
    setCopyValue((prev) => !prev);
    const json = query.serialize();
    copy(lz.encodeBase64(lz.compress(json)));
    setTimeout(() => setCopyValue((prev) => !prev), 3000);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleLoad = () => {
    handleToggle();
    const json = lz.decompress(lz.decodeBase64(stateToLoad));
    actions.deserialize(json);
    setStateToLoad(null);
  };

  return (
    <div className="w-full border-b flex shadow-sm">
      <div className="logo p-4 border-r">
        <img src={AlmaLogo} alt="almalogo" className="w-7 h-7" />
      </div>
      <div className="px-4 flex-1 flex items-center">
        <div className="button ml-auto font-medium flex gap-2">
          <button
            onClick={handleSaveCopy}
            className="py-2 px-5 text-xs font-medium bg-black hover:bg-gray-800 text-white rounded flex gap-1 items-center"
          >
            {copyValue ? (
              <>
                <CheckBadgeIcon className="w-3 text-green-600 " />{" "}
                <span className="text-green-600">Copied</span>
              </>
            ) : (
              <>
                <ArrowUpTrayIcon className="w-3 " /> <span>Export</span>
              </>
            )}
          </button>
          <button
            onClick={handleToggle}
            className="py-2 px-5 text-xs font-medium bg-black hover:bg-gray-800 text-white rounded flex gap-1 items-center"
          >
            <ArrowDownTrayIcon className="w-3 " /> <span>Load </span>
          </button>
          <Modal isOpen={toggle} onClose={handleToggle}>
            <div className="sm:w-96 w-72 sm:mx-auto">
              <div className="">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs font-semibold  uppercase">
                    Load State
                  </div>
                  <XMarkIcon
                    onClick={handleToggle}
                    className="w-4 cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
              <form className=" flex flex-col gap-1">
                <div>
                  <textarea
                    value={stateToLoad}
                    onChange={(e) => setStateToLoad(e.target.value)}
                    name="load"
                    id="load"
                    rows="3"
                    className="w-full py-2 bg-gray-100 rounded-sm outline-none"
                  ></textarea>
                </div>
                <div className="flex gap-2 items-center mt-1">
                  <div
                    onClick={handleLoad}
                    className="cursor-pointer transition duration-300  flex-1 py-2 px-5 text-xs font-medium bg-black hover:bg-gray-800 text-white rounded flex gap-1 items-center justify-center"
                  >
                    Load
                  </div>
                  <div
                    className=" transition duration-300 cursor-pointer  flex-1 py-2 px-5 text-xs font-medium border border-black text-black hover:border-red-600 hover:text-red-600 rounded flex gap-1 items-center justify-center"
                    onClick={handleToggle}
                  >
                    Cancel
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
