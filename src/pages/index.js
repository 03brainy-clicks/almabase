import React from "react";

import { Editor } from "@craftjs/core";
import { EditorScreen, Toolbox, Topbar } from "../components/editor/layout";

import {
  Button,
  CanvasContainer,
  Container,
  Input,
  Label,
  Text,
} from "../components/editor/elements";

export default function App() {
  return (
    <div className="w-full h-full">
      {/* Craft.js Editor component with a resolver for custom elements */}
      <Editor
        resolver={{ Button, Label, Text, Container, Input, CanvasContainer }}
      >
        <div className="flex h-full">
          <div className="flex flex-col w-full">
            {/* Topbar component for the editor */}
            <Topbar />
            {/* Main content area */}
            <EditorScreen />
          </div>
          {/* Toolbox component for the editor */}
          <Toolbox />
        </div>
      </Editor>
    </div>
  );
}
