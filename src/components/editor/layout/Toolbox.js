import React from "react";
import { Button } from "../elements/button/Button";
import { Container } from "../elements/container/Container";
import { Text } from "../elements/text/Text";
import { Element, useEditor } from "@craftjs/core";
import Dropdown from "../../../utils/Dropdown";
import ElementCard from "../../cards/ElementCard";
import { Input } from "../elements/input/Input";
import { Label } from "../elements/label/Label";

export const Toolbox = () => {
  const { connectors } = useEditor();
  return (
    <div className="sidebar h-full bg-white border-l lg:w-80 lg:block hidden flex-col">
      <div className="text-sm p-5 border-b">
        <h6 className="font-semibold ">ELEMENTS</h6>
      </div>
      <Dropdown title={"BLOCKS"}>
        <div className="px-5 flex flex-col gap-2 pb-5 ">
          <div
            ref={(ref) => connectors.create(ref, <Button text="Click me" />)}
          >
            <ElementCard title="Button" />
          </div>
          <div
            ref={(ref) =>
              connectors.create(
                ref,
                <Input text="" placeholder="Enter Your Name" />
              )
            }
          >
            <ElementCard title="Input" />
          </div>
          <div ref={(ref) => connectors.create(ref, <Label text="Name" />)}>
            <ElementCard title="Label" />
          </div>
          <div ref={(ref) => connectors.create(ref, <Text text="Hi Text" />)}>
            <ElementCard title="Text" />
          </div>
          <div
            ref={(ref) =>
              connectors.create(ref, <Element is={Container} canvas />)
            }
          >
            <ElementCard title="Container" />
          </div>
        </div>
      </Dropdown>
      <div className="p-5 lg:block hidden">
        <div className="bg-gray-100 text-gray-400 rounded-md p-3">
          <h6 className="text-xs font-semibold text-center ">NOTE</h6>
          <ul className="text-xs mt-3 flex gap-2 flex-col">
            <li>
              <span className=" font-medium">Select + Enter : </span> To open
              and close component style settings
            </li>{" "}
            <li>
              <span className=" font-medium">Select + Delete : </span> To delete
              selected component
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
