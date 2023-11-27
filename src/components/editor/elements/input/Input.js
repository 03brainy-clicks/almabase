import React, { useState } from "react";
import { useEditor, useNode } from "@craftjs/core";
import { FontWeightOptions, Modal } from "../../../../utils";
import { SettingsPanel } from "../../layout";
import {
  NumberField,
  RichtextField,
  ColorField,
  SelectField,
  MarginField,
} from "../../../form-elements";

// Input component represents a customizable input field
export const Input = ({
  fontSize,
  fontWeight,
  backgroundColor,
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
          padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
          margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
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
        <SelectField
          options={FontWeightOptions}
          title="Font weight"
          value={props.fontWeight}
          setValue={(value) => setProp((props) => (props.fontWeight = value))}
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
    marginLeft: 0,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 0,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
  },
  // Specify related settings component
  related: {
    settings: InputSettings,
  },
};
