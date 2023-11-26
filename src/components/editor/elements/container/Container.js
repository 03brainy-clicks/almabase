// components/user/Container.js
import { useEditor, useNode } from "@craftjs/core";
import React, { useState } from "react";
import { ColorField, RichtextField } from "../../../form-elements";
import { SettingsPanel } from "../../layout/SettingsPanel";
import Modal from "../../../../utils/Modal";

export const Container = ({
  width,
  height,
  backgroundColor,
  padding,
  margin,
  children,
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
      setToggle((prev) => !prev);
    } else if (e.key === "Delete" && isSelected) {
      actions.delete(id);
    }
  };

  const handleToggleCLick = (e) => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <div
        id={id}
        className={`outline-red-500 ${
          isSelected
            ? "border-2 border-red-600"
            : "border-2  border-transparent"
        }`}
        ref={(ref) => connect(drag(ref))}
        style={{ width, height, margin, padding, backgroundColor }}
        onKeyDown={handleToggle}
        tabIndex={0}
      >
        {children}
      </div>
      <Modal isOpen={toggle} onClose={handleToggleCLick}>
        <div className="w-96 mx-auto">
          <SettingsPanel handleClose={handleToggleCLick} />
        </div>
      </Modal>
    </>
  );
};

const ContainerSettings = () => {
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

Container.craft = {
  displayName: "Container",
  props: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    padding: "20px",
    margin: "0px",
  },
  related: {
    settings: ContainerSettings,
  },
};
