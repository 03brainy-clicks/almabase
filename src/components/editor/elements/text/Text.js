// components/user/Text.js
import React, { useState } from "react";
import { useEditor, useNode } from "@craftjs/core";
import { NumberField, RichtextField, ColorField } from "../../../form-elements";
import { Modal } from "../../../../utils";
import { SettingsPanel } from "../../layout";

// Text component represents a customizable text element
export const Text = ({
  fontSize,
  fontWeight,
  color,
  text,
  padding,
  margin,
}) => {
  // State to manage the visibility of the settings modal
  const [toggle, setToggle] = useState(false);

  // Craft.js hooks to access node properties and editor actions
  const {
    connectors: { connect, drag },
    isSelected,
    id,
  } = useNode((node) => ({
    isSelected: node.events.selected,
  }));

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

  // Render the text element with styles, event handlers, and make it focusable
  return (
    <>
      <div
        className={`outline-red-600 ${
          isSelected
            ? "border-2 border-red-600"
            : "border-2  border-transparent"
        }`}
        ref={(ref) => connect(drag(ref))}
        style={{
          fontSize: `${fontSize}px`,
          color,
          fontWeight,
          padding,
          margin,
        }}
        onKeyDown={handleToggle}
        tabIndex={0}
      >
        {text}
      </div>
      {/* Modal for settings panel */}
      <Modal isOpen={toggle} onClose={handleToggleClick}>
        <div className="w-96 mx-auto">
          <SettingsPanel handleClose={handleToggleClick} />
        </div>
      </Modal>
    </>
  );
};

// TextSettings component to customize text element properties
const TextSettings = () => {
  // Craft.js hooks to access node properties and editor actions
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  // Render form for customizing text element properties
  return (
    <>
      <form className=" flex flex-col gap-1">
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
        <ColorField
          className="flex-1"
          title="Color"
          value={props.color}
          setValue={(e) => setProp((props) => (props.color = e.target.value))}
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

// Craft.js configuration for the Text component
Text.craft = {
  displayName: "Text",
  props: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000",
    text: "Hi Text",
    padding: "0px",
    margin: "0px",
  },
  // Specify related settings component
  related: {
    settings: TextSettings,
  },
};
