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
      <Editor resolver={{ Button, Label, Text, Container, Input,Canvas }}>
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
                    <Button text={"logo"} />
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
