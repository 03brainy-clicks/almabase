import React from "react";
import {
  Button,
  CanvasContainer,
  Container,
  Input,
  Label,
  Text,
} from "../elements";
import { Element, Frame } from "@craftjs/core";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";

const EditorScreen = () => {
  return (
    <main className="flex-1 w-full h-full flex lg:flex-row flex-col bg-gray-100 overflow-y-scroll p-7 items-start">
      {/* Warning message for small screens */}
      <div className="lg:hidden block text-center mb-5 text-gray-400 rounded-md mx-auto">
        <div className="h-8 w-8 border rounded-md border-gray-400 flex items-center justify-center mx-auto mb-2">
          <ComputerDesktopIcon className="w-4" />
        </div>
        <p className="text-xs">Use Laptop or Computer to use design mode</p>
      </div>
      <div className="web-page bg-white shadow-sm mx-auto relative lg:w-3/4 md:w-4/5 w-full">
        {/* Craft.js Frame component for the visual design canvas */}
        <Frame>
          {/* Root container for the canvas with custom styling */}
          <Element
            is={CanvasContainer}
            backgroundColor={"#fff"}
            padding={"20px"}
            data-cy="root-container"
            canvas
          >
            {/* Form elements */}
            <Element is={Container} padding={"5px"} canvas>
              <Element
                is={Text}
                text={"User Details Form"}
                margin={"0px 0px 10px "}
              />
              <Element is={Label} text={"Name"} />
              <Element is={Input} placeholder={"Enter your name"} />
              <Element is={Label} text={"Username"} />
              <Element is={Input} placeholder={"Enter your username"} />
              <Element is={Label} text={"Email"} />
              <Element is={Input} placeholder={"Enter your email"} />
              <Element is={Label} text={"Number"} />
              <Element is={Input} placeholder={"Enter your number"} />
              <Element is={Button} text={"Save"} />
              <Element
                is={Button}
                text={"Reset"}
                color={"#000"}
                backgroundColor={"#fff"}
              />
            </Element>
          </Element>
        </Frame>
      </div>
    </main>
  );
};

export default EditorScreen;
