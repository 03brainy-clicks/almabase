// components/user/Input.js
import React, { useState } from "react";
import { useEditor, useNode } from "@craftjs/core";
import Modal from "../../../../utils/Modal";
import { SettingsPanel } from "../../layout/SettingsPanel";
import { ColorField, NumberField, RichtextField } from "../../../form-elements";

// Destructure props for cleaner code
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
  // State for modal visibility
  const [toggle, setToggle] = useState(false);

  // Craft.js hooks for node and editor actions
  const {
    connectors: { connect, drag },
    isSelected,
    id,
    actions: { setProp },
  } = useNode((node) => ({
    isSelected: node.events.selected,
  }));

  const { actions } = useEditor((state, query, mutation) => ({
    actions: mutation,
  }));

  // Event handler for toggling modal and deleting input
  const handleToggle = (e) => {
    if (e.key === "Enter") {
      setToggle((prev) => !prev);
    } else if (e.key === "Delete") {
      actions.delete(id);
    }
  };

  // Event handler for toggling modal
  const handleToggleClick = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <input
        // Inline styles for dynamic styling
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
        // Update text value on input change
        onChange={(e) => setProp((props) => (props.text = e.target.value))}
        onKeyDown={handleToggle}
      />
      {/* Modal for settings panel */}
      <Modal isOpen={toggle} onClose={handleToggleClick}>
        <div className="w-96 mx-auto">
          <SettingsPanel handleClose={handleToggleClick} />
        </div>
      </Modal>
    </div>
  );
};

// Settings panel component
const InputSettings = () => {
  // Craft.js hooks for node actions and props
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <>
      {/* Form for adjusting input settings */}
      <form className="flex flex-col gap-1">
        <RichtextField
          title="Text"
          value={props.text}
          // Update text prop on input change
          setValue={(e) => setProp((props) => (props.text = e.target.value))}
        />
        <RichtextField
          title="Placeholder"
          value={props.placeholder}
          // Update placeholder prop on input change
          setValue={(e) =>
            setProp((props) => (props.placeholder = e.target.value))
          }
        />
        {/* Additional input settings */}
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
            {/* ColorField for text color */}
            <ColorField
              title="Text color"
              value={props.color}
              setValue={(e) =>
                setProp((props) => (props.color = e.target.value))
              }
            />
          </div>
          <div className="flex-1">
            {/* ColorField for background color */}
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
        {/* Additional input styling settings */}
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

// Craft settings for the Input component
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
  related: {
    settings: InputSettings,
  },
};

export default Input;
