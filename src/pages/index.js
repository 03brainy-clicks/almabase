// pages/index.js

import React from "react";

import { Button } from "../components/editor/elements/button/Button";
import { Text } from "../components/editor/elements/text/Text";
import { Toolbox } from "../components/editor/layout/Toolbox";
import { Container } from "../components/editor/elements/container/Container";
import Topbar from "../components/editor/layout/Topbar";
import { Editor, Element, Frame } from "@craftjs/core";
import { Input } from "../components/editor/elements/input/Input";

export default function App() {
  return (
    <div className=" w-full h-full">
      <Editor resolver={{ Button, Text, Container, Input }}>
        <div className="flex h-full">
          <div className="flex flex-col w-full">
            <Topbar />
            <main className="flex-1 w-full h-full flex bg-gray-100 overflow-y-scroll p-7 items-start">
              <div className="web-page w-3/4 bg-white shadow-sm mx-auto py-7 px-7 relative">
                <Frame>
                  <Element is={Container} padding={5} background="#fff" canvas>
                    <Button text={"logo"} />
                  </Element>
                </Frame>
              </div>
            </main>
          </div>
          <Toolbox />
        </div>
        {/* 
        <div className=" flex flex-col  gap-5 h-full">
          <Topbar />
          <div className="flex gap-5 w-full h-full">
            <div className="bg-green-500 flex-1 ">
              <Frame>
                <Element is={Container} padding={5} background="#eee" canvas>
                  <Button>text me</Button>
                  <Text text={"nepo"} />
                </Element>
              </Frame>
            </div>
            <div className=" bg-gray-100 w-64 h-full">
              <Toolbox />
              <SettingsPanel />
            </div>
          </div>
        </div> */}
      </Editor>
    </div>
  );
}
