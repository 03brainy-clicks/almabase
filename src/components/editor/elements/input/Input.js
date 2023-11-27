import React, { useState } from "react";
import { useEditor, useNode } from "@craftjs/core";
import { Modal } from "../../../../utils";
import { SettingsPanel } from "../../layout";
import { ColorField, NumberField, RichtextField } from "../../../form-elements";

// Input component represents a customizable input field
export const Input = ({
  fontSize,
  fontWeight,
  backgroundColor,
  color,
  text,
  padding,
  margin,
  placeholder,
}) => {
  // State to manage the visibility of the settings modal
  const [toggle, setToggle] = useState(false);

  // Craft.js hooks to access node properties and editor actions
  const {
    connectors: { connect, drag },
    isSelected,
    id,
    actions: { setProp },
  } = useNode((node) => ({
    isSelected: node.events.selected,
  }));

  // Destructure actions from useEditor hook for Craft.js editor manipulation
  const { actions } = useEditor((state, query, mutation) => ({
    actions: mutation,
  }));

  // Function to handle key events for toggling settings modal and deleting the node
  const handleToggle = (e) => {
    if (e.key === "Enter") {
      setToggle((prev) => !prev);
    } else if (e.key === "Delete") {
      actions.delete(id);
    }
  };

  // Function to handle click event for toggling settings modal
  const handleToggleClick = () => {
    setToggle((prev) => !prev);
  };

  // Render the input field with styles and event handlers
  return (
    <div ref={(ref) => connect(drag(ref))}>
      <input
        style={{
          padding,
          margin,
          fontSize: `${fontSize}px`,
          fontWeight,
          color: color,
          backgroundColor,
        }}
        type="text"
        className={`rounded-md w-full outline-none ${
          isSelected
            ? "border-2 border-red-600"
            : "border-2  border-transparent"
        }`}
        value={text}
        placeholder={placeholder}
        onChange={(e) => setProp((props) => (props.text = e.target.value))}
        onKeyDown={handleToggle}
      />
      {/* Modal for settings panel */}
      <Modal isOpen={toggle} onClose={handleToggleClick}>
        <div className="w-96 mx-auto">
          {/* Settings panel for customizing input properties */}
          <SettingsPanel handleClose={handleToggleClick} />
        </div>
      </Modal>
    </div>
  );
};

// InputSettings component to customize input properties
const InputSettings = () => {
  // Craft.js hooks to access node properties and editor actions
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  // Render form for customizing input properties
  return (
    <>
      <form className="flex flex-col gap-1">
        <RichtextField
          title="Text"
          value={props.text}
          setValue={(e) => setProp((props) => (props.text = e.target.value))}
        />
        <RichtextField
          title="Placeholder"
          value={props.placeholder}
          setValue={(e) =>
            setProp((props) => (props.placeholder = e.target.value))
          }
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
              className="flex-1"
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

// Craft.js configuration for the Input component
Input.craft = {
  displayName: "Input",
  props: {
    fontSize: 12,
    fontWeight: 500,
    backgroundColor: "#f3f4f6",
    color: "#000",
    text: "",
    placeholder: "Enter Your Name",
    padding: "8px",
    margin: "5px 0px",
  },
  // Specify related settings component
  related: {
    settings: InputSettings,
  },
};
