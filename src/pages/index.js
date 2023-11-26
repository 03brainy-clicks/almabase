// pages/index.js

import React from "react";

import { Button } from "../components/editor/elements/button/Button";
import { Text } from "../components/editor/elements/text/Text";
import { Toolbox } from "../components/editor/layout/Toolbox";
import { Container } from "../components/editor/elements/container/Container";
import Topbar from "../components/editor/layout/Topbar";
import { Editor, Element, Frame } from "@craftjs/core";
import { Input } from "../components/editor/elements/input/Input";
import { Label } from "../components/editor/elements/label/Label";
import { Canvas } from "../components/editor/elements/canvas/Canvas";

export default function App() {
  return (
    <div className=" w-full h-full">
      <Editor resolver={{ Button, Label, Text, Container, Input, Canvas }}>
        <div className="flex h-full">
          <div className="flex flex-col w-full">
            <Topbar />
            <main className="flex-1 w-full h-full flex bg-gray-100 overflow-y-scroll p-7 items-start">
              <div className="web-page w-3/4 bg-white shadow-sm mx-auto relative">
                <Frame>
                  <Element
                    is={Canvas}
                    backgroundColor={"#fff"}
                    padding={"20px"}
                    canvas
                  >
                    {/* form  */}
                    <Element is={Container} padding={"0px"}>
                    <Element is={Text} text={"User Details Form"} margin={"0px 0px 10px "}/>
                      <Element is={Label} text={"Name"} />
                      <Element is={Input} placeholder={"Enter your name"} />
                      <Element is={Label} text={"Username"} />
                      <Element is={Input} placeholder={"Enter your username"} />
                      <Element is={Label} text={"Email"} />
                      <Element is={Input} placeholder={"Enter your email"} />
                      <Element is={Label} text={"Number"} />
                      <Element is={Input} placeholder={"Enter your number"} />
                      <Element is={Button} text={"Save"} />
                      <Element is={Button} text={"Reset"} color={"#000"} backgroundColor={"#fff"}/>
                    </Element>
                  </Element>
                </Frame>
              </div>
            </main>
          </div>
          <Toolbox />
        </div>
      </Editor>
    </div>
  );
}
