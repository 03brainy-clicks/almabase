import { useEditor } from "@craftjs/core";
import React from "react";

export const SettingsPanel = () => {
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
    <div bgcolor="rgba(0, 0, 0, 0.06)" mt={2} px={2} py={2}>
      <div container direction="column" spacing={0}>
        <div data-cy="settings-panel">
          {selected.settings && React.createElement(selected.settings)}
        </div>
        {selected.isDeletable ? (
          <div
          className="bg-red-500 py-"
            onClick={() => {
              actions.delete(selected.id);
            }}
          >
            Delete
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};
