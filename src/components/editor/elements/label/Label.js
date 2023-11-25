// components/user/Text.js
import React, { useState } from "react";
import { useEditor, useNode } from "@craftjs/core";
import { NumberField, RichtextField } from "../../../form-elements";
import Modal from "../../../../utils/Modal";
import { SettingsPanel } from "../../layout/SettingsPanel";

export const Label = ({
  fontSize,
  fontWeight,
  color,
  text,
  padding,
  margin,
}) => {
  const [toggle, setToggle] = useState(false);

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

  const handleToggle = (e) => {
    if (e.key === "Enter") {
      // Toggle the modal on Enter key press
      setToggle((prev) => !prev);
    } else if (e.key === "Delete") {
      // Delete the label on Delete key press
      actions.delete(id);
    }
  };

  const handleToggleClick = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <label
        className={`block outline-red-600 ${
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
        // Add onKeyDown event handler
        onKeyDown={handleToggle}
        // Make the label focusable
        tabIndex={0}
      >
        {text}
      </label>
      <Modal isOpen={toggle} onClose={handleToggleClick}>
        <div className="w-96 mx-auto">
          <SettingsPanel handleClose={handleToggleClick} />
        </div>
      </Modal>
    </>
  );
};

const LabelSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));
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

Label.craft = {
  displayName: "Label",
  props: {
    fontSize: 12,
    fontWeight: 400,
    color: "#000",
    text: "Name",
    padding: "0px",
    margin: "0px",
  },
  related: {
    settings: LabelSettings,
  },
};

export default Label;
