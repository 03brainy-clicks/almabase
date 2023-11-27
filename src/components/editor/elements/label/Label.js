import React, { useState } from "react";
import { useEditor, useNode } from "@craftjs/core";
import {
  NumberField,
  RichtextField,
  SelectField,
  MarginField,
} from "../../../form-elements";
import { FontWeightOptions, Modal } from "../../../../utils";
import { SettingsPanel } from "../../layout";

// Label component represents a customizable label
export const Label = ({
  fontSize,
  fontWeight,
  color,
  text,
  marginLeft,
  marginTop,
  marginBottom,
  marginRight,
  paddingLeft,
  paddingTop,
  paddingBottom,
  paddingRight,
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

  // Render the label with styles, event handlers, and make it focusable
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
          padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
          margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
        }}
        onKeyDown={handleToggle}
        tabIndex={0}
      >
        {text}
      </label>
      {/* Modal for settings panel */}
      <Modal isOpen={toggle} onClose={handleToggleClick}>
        <div className="w-96 mx-auto">
          <SettingsPanel handleClose={handleToggleClick} />
        </div>
      </Modal>
    </>
  );
};

// LabelSettings component to customize label properties
const LabelSettings = () => {
  // Craft.js hooks to access node properties and editor actions
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  // Render form for customizing label properties
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
        <SelectField
          options={FontWeightOptions}
          title="Font weight"
          value={props.fontWeight}
          setValue={(value) => setProp((props) => (props.fontWeight = value))}
        />
        <MarginField
          title="Margin"
          value={{
            top: props.marginTop,
            bottom: props.marginBottom,
            left: props.marginLeft,
            right: props.marginRight,
          }}
          setBottom={(e) =>
            setProp((props) => (props.marginBottom = e.target.value))
          }
          setTop={(e) => setProp((props) => (props.marginTop = e.target.value))}
          setLeft={(e) =>
            setProp((props) => (props.marginLeft = e.target.value))
          }
          setRight={(e) =>
            setProp((props) => (props.marginRight = e.target.value))
          }
        />
        <MarginField
          title="Padding"
          value={{
            top: props.paddingTop,
            bottom: props.paddingBottom,
            left: props.paddingLeft,
            right: props.paddingRight,
          }}
          setBottom={(e) =>
            setProp((props) => (props.paddingBottom = e.target.value))
          }
          setTop={(e) =>
            setProp((props) => (props.paddingTop = e.target.value))
          }
          setLeft={(e) =>
            setProp((props) => (props.paddingLeft = e.target.value))
          }
          setRight={(e) =>
            setProp((props) => (props.paddingRight = e.target.value))
          }
        />
      </form>
    </>
  );
};

// Craft.js configuration for the Label component
Label.craft = {
  displayName: "Label",
  props: {
    fontSize: 12,
    fontWeight: 400,
    color: "#000",
    text: "Name",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
  },
  // Specify related settings component
  related: {
    settings: LabelSettings,
  },
};
