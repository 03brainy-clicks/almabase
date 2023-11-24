// components/Toolbox.js
import React from "react";
import { Button } from "../elements/button/Button";
import { Container } from "../elements/container/Container";
import { Text } from "../elements/text/Text";
import { Element, useEditor } from "@craftjs/core";
import Dropdown from "../../../utils/Dropdown";
import ElementCard from "../../cards/ElementCard";

// export const Toolbox = () => {
//   const { connectors, query } = useEditor();
//   return (
//     <div className="bg-gray-300 ">
//       <div className="flex"> Elements</div>
//       <div className="flex flex-col gap-5">
//         <button
//           ref={(ref) =>
//             connectors.create(ref, <Button text="Click me" size="small" />)
//           }
//           className="py-1 px-5 text-center bg-blue-500 rounded"
//         >
//           Button
//         </button>
//         <button
//           ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
//           className="py-1 px-5 text-center bg-blue-500 rounded"
//         >
//           Text
//         </button>
//         <button
//           ref={(ref) =>
//             connectors.create(
//               ref,
//               <Element is={Container} padding={20} canvas />
//             )
//           }
//           className="py-1 px-5 text-center bg-blue-500 rounded"
//         >
//           container
//         </button>
//       </div>
//     </div>
//   );
// };



export const Toolbox = () => {
  const { connectors } = useEditor();
  return (
    <div className="sidebar h-full bg-white border-l  w-64 flex-col">
      <div className="text-sm p-5 border-b">
        <h6 className="font-semibold ">ELEMENTS</h6>
      </div>
      <Dropdown title={"BLOCKS"}>
        <div className="px-5 flex flex-col gap-2 pb-5 ">
          <div
            ref={(ref) =>
              connectors.create(ref, <Button text="Click me" size="small" />)
            }
          >
            <ElementCard title="Button" />
          </div>
          <div ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}>
            <ElementCard title="Text" />
          </div>
          <div
            ref={(ref) =>
              connectors.create(
                ref,
                <Element is={Container} padding={20} canvas />
              )
            }
          >
            <ElementCard title="Container" />
          </div>
        </div>
      </Dropdown>
    </div>
  );
};


