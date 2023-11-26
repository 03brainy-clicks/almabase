// components/user/Button.js
import { useEditor, useNode } from "@craftjs/core";
import React, { useState } from "react";
import Modal from "../../../../utils/Modal";
import { SettingsPanel } from "../../layout/SettingsPanel";
import { ColorField, NumberField, RichtextField } from "../../../form-elements";

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
  const [toggle, setToggle] = useState(false);

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

  const handleToggle = (e) => {
    if (e.key === "Enter") {
      setToggle((prev) => !prev);
    } else if (e.key === "Delete") {
      actions.delete(id);
    }
  };

  const handleToggleCLick = (e) => {
    setToggle((prev) => !prev);
  };

  const handleDrag = (e) => {
    setProp((props) => {
      props.x = e.clientX;
      props.y = e.clientY;
    });
  };

  return (
    <>
      <button
        ref={(ref) => connect(drag(ref))}
        className={`rounded-md outline-red-600 absolute ${
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
        onDrag={handleDrag}
      >
        {text}
      </button>
      <Modal isOpen={toggle} onClose={handleToggleCLick}>
        <div className="w-96 mx-auto">
          <SettingsPanel handleClose={handleToggleCLick} />
        </div>
      </Modal>
    </>
  );
};

const ButtonSettings = () => {
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
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <ColorField
              title="Text color"
              value={props.color}
              setValue={(e) =>
                setProp((props) => (props.color = e.target.value))
              }
            />{" "}
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
    settings: ButtonSettings,
  },
};
