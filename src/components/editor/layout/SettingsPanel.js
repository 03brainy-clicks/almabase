import { useEditor } from "@craftjs/core";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const SettingsPanel = ({ handleClose }) => {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent("selected").last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  return isEnabled && selected ? (
    <div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs font-semibold  uppercase">
            {selected.name === "CanvasContainer" ? "Canvas" : selected.name}{" "}
            Style
          </div>
          <XMarkIcon
            onClick={handleClose}
            className="w-4 cursor-pointer hover:text-red-500"
          />
        </div>
        <div>{selected.settings && React.createElement(selected.settings)}</div>
        {selected.isDeletable ? (
          <div className="flex gap-2 items-center mt-4">
            <div
              onClick={handleClose}
              className="cursor-pointer transition duration-300  flex-1 py-2 px-5 text-xs font-medium bg-black hover:bg-gray-800 text-white rounded flex gap-1 items-center justify-center"
            >
              Save
            </div>
            <div
              className=" transition duration-300 cursor-pointer  flex-1 py-2 px-5 text-xs font-medium border border-black text-black hover:border-red-600 hover:text-red-600 rounded flex gap-1 items-center justify-center"
              onClick={() => {
                handleClose();
                actions.delete(selected.id);
              }}
            >
              Delete
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};
