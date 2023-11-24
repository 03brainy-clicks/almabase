// components/user/Container.js
import { useNode } from "@craftjs/core";
import React from "react";
export const Container = ({ background, padding = 0, children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      className="p-10 bg-orange-500"
      ref={(ref) => connect(drag(ref))}
      style={{ margin: "5px 0", background, padding: `${padding}px` }}
    >
      {children}
    </div>
  );
};
