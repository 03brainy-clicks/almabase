import React, { useState } from "react";
import { useNode } from "@craftjs/core";
import { ColorField, RichtextField } from "../../../form-elements";
import { SettingsPanel } from "../../layout";
import { Modal } from "../../../../utils";

// Define the CanvasContainer component
export const CanvasContainer = ({
  width,
  height,
  backgroundColor,
  padding,
  margin,
  children,
}) => {
  // State to manage the modal toggle
  const [toggle, setToggle] = useState(false);

  // Destructure values from useNode hook for interaction with Craft.js
  const {
    connectors: { connect, drag },
    isSelected,
    id,
  } = useNode((node) => ({
    isSelected: node.events.selected,
  }));

  // Handle toggle on Enter key press
  const handleToggle = (e) => {
    if (e.key === "Enter") {
      setToggle((prev) => !prev);
    }
  };

  // Handle toggle on click
  const handleToggleCLick = (e) => {
    setToggle((prev) => !prev);
  };

  // Render the CanvasContainer with styles and event handlers
  return (
    <>
      <div
        id={id}
        className={`outline-red-500 ${
          isSelected ? "border-2 border-red-600" : "border-2 border-transparent"
        }`}
        ref={(ref) => connect(drag(ref))}
        style={{ width, height, margin, padding, backgroundColor }}
        onKeyDown={handleToggle}
        tabIndex={0}
      >
        {children}
      </div>

      {/* Modal for settings panel */}
      <Modal isOpen={toggle} onClose={handleToggleCLick}>
        <div className="w-96 mx-auto">
          <SettingsPanel handleClose={handleToggleCLick} />
        </div>
      </Modal>
    </>
  );
};

// Define the CanvasContainerSettings component for customizing settings
const CanvasContainerSettings = () => {
  // Destructure values from useNode hook for interaction with Craft.js
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  // Render form with fields for setting properties
  return (
    <>
      <form className="flex flex-col gap-1">
        <RichtextField
          title="Width"
          value={props.width}
          setValue={(e) => setProp((props) => (props.width = e.target.value))}
        />
        <RichtextField
          title="Height"
          value={props.height}
          setValue={(e) => setProp((props) => (props.height = e.target.value))}
        />
        <ColorField
          className="flex-1"
          title="Background color"
          value={props.backgroundColor}
          setValue={(e) =>
            setProp((props) => (props.backgroundColor = e.target.value))
          }
        />
        <RichtextField
          title="Margin"
          value={props.margin}
          setValue={(e) => setProp((props) => (props.margin = e.target.value))}
        />
        <RichtextField
          title="Padding"
          value={props.padding}
          setValue={(e) => setProp((props) => (props.padding = e.target.value))}
        />
      </form>
    </>
  );
};

// Craft.js configuration for CanvasContainer component
CanvasContainer.craft = {
  displayName: "CanvasContainer",
  props: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    padding: "20px",
    margin: "0px",
  },
  // Specify related settings component
  related: {
    settings: CanvasContainerSettings,
  },
};
