import { useEditor, useNode } from "@craftjs/core";
import React, { useState } from "react";
import {
  ColorField,
  NumberField,
  RichtextField,
  SelectField,
  MarginField,
} from "../../../form-elements";
import { SettingsPanel } from "../../layout";
import { FontWeightOptions, Modal } from "../../../../utils";

// Define the Button component
export const Button = ({
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
          padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
          margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
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

// Define metadata for the Button component in the Craft.js editor
Button.craft = {
  displayName: "Button",
  props: {
    fontSize: 12,
    fontWeight: 500,
    backgroundColor: "#000000",
    color: "#ffffff",
    text: "Click Me",
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 20,
  },
  related: {
    settings: ButtonSettings, // Link to the ButtonSettings component
  },
};
