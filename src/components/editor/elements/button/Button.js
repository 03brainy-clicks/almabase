import { useEditor, useNode } from "@craftjs/core";
import React, { useState } from "react";
import { ColorField, NumberField, RichtextField } from "../../../form-elements";
import { SettingsPanel } from "../../layout";
import { Modal } from "../../../../utils";

// Define the Button component
export const Button = ({
  fontSize,
  fontWeight,
  backgroundColor,
  color,
  text,
  padding,
  margin,
  x,
  y,
}) => {
  // State for the settings modal
  const [toggle, setToggle] = useState(false);

  // Use Craft.js hooks to access node properties and editor actions
  const {
    connectors: { connect, drag },
    isSelected,
    id,
  } = useNode((node) => ({
    isSelected: node.events.selected,
  }));

  // Destructure actions from useEditor hook for Craft.js editor manipulation
  const { actions } = useEditor((state, query, mutation) => ({
    actions: mutation,
  }));

  // Handle key events for opening the settings modal and deleting the button
  const handleToggle = (e) => {
    if (e.key === "Enter") {
      setToggle((prev) => !prev);
    } else if (e.key === "Delete") {
      actions.delete(id);
    }
  };

  // Handle click event to open the settings modal
  const handleToggleClick = () => {
    setToggle((prev) => !prev);
  };

  // Render the button element with dynamic styles
  return (
    <>
      <button
        ref={(ref) => connect(drag(ref))}
        className={`rounded-md outline-red-600 ${
          isSelected
            ? "border-2 border-red-600"
            : "border-2  border-transparent"
        }`}
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: fontWeight,
          backgroundColor: backgroundColor,
          color: color,
          margin: margin,
          padding: padding,
          top: y,
          left: x,
        }}
        onKeyDown={handleToggle}
      >
        {text}
      </button>

      {/* Settings modal */}
      <Modal isOpen={toggle} onClose={handleToggleClick}>
        <div className="w-96 mx-auto">
          <SettingsPanel handleClose={handleToggleClick} />
        </div>
      </Modal>
    </>
  );
};

// Define the settings panel for the Button component
const ButtonSettings = () => {
  // Use Craft.js hooks to access node properties and actions
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  // Render form for customizing button styles
  return (
    <>
      <form className="flex flex-col gap-1">
        <RichtextField
          title="Text"
          value={props.text}
          setValue={(e) => setProp((props) => (props.text = e.target.value))}
        />

        <NumberField
          title="Font size"
          value={props.fontSize}
          setValue={(e) =>
            setProp((props) => (props.fontSize = e.target.value))
          }
        />

        <NumberField
          title="Font weight"
          value={props.fontWeight}
          setValue={(e) =>
            setProp((props) => (props.fontWeight = e.target.value))
          }
        />

        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <ColorField
              title="Text color"
              value={props.color}
              setValue={(e) =>
                setProp((props) => (props.color = e.target.value))
              }
            />
          </div>
          <div className="flex-1">
            <ColorField
              title="Background color"
              value={props.backgroundColor}
              setValue={(e) =>
                setProp((props) => (props.backgroundColor = e.target.value))
              }
            />
          </div>
        </div>

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

// Define metadata for the Button component in the Craft.js editor
Button.craft = {
  displayName: "Button",
  props: {
    fontSize: 12,
    fontWeight: 500,
    backgroundColor: "#000000",
    color: "#ffffff",
    text: "Click Me",
    padding: "8px 20px",
    margin: "5px",
    x: 5,
    y: 5,
  },
  related: {
    settings: ButtonSettings, // Link to the ButtonSettings component
  },
};
