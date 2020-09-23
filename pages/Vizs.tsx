import { observer } from "mobx-react";
import { useStores } from "../src/stores/_RootStore";
import Example from "../src/components/vizs/dendogram";
import { IconButton, Box } from "gestalt";
import NodeAtom from "../src/components/NodeAtom";
import { ParentSize } from "@vx/responsive";

export interface NodeShape {
  name: string;
  children?: NodeShape[];
}

const clusterData: NodeShape = {
  name: "$",
  children: [
    {
      name: "A",
      children: [
        { name: "A1" },
        { name: "A2" },
        {
          name: "C",
          children: [
            {
              name: "C1",
            },
          ],
        },
      ],
    },
    {
      name: "B",
      children: [{ name: "B1" }, { name: "B2" }, { name: "B3" }],
    },
    {
      name: "X",
      children: [
        {
          name: "Z",
        },
      ],
    },
  ],
};

const mycomponent = (
  <NodeAtom
    id="Q937"
    title="Albert Einstein "
    thumbnail_url="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/38px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg"
    // thumbnail_url=""
    saved_actionable={true}
    saved_enabled={true}
    saved_handler={() => {}}
    edit_handler={() => {}}
  />
);

const Vizs: React.FunctionComponent = (props) => {
  // return <div> Vizs... To be completed</div>;
  // return <Example component={mycomponent} width={1000} height={1000} />;
  return (
    <ParentSize>
      {(parent) => (
        <Example
          nodeComponent={mycomponent}
          graphData={clusterData}
          width={parent.width - 5}
          height={parent.height - 5}
        />
      )}
    </ParentSize>
  );
};

export default Vizs;
