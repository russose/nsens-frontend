import React from "react";
import { Links, Nodes } from "@visx/network";
import { NodeProvidedProps } from "@visx/network/lib/types";
import { observer } from "mobx-react-lite";
import { Group } from "@visx/group";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../../handlers";
import { useStores } from "../../stores/_RootStoreHook";
import NodeAtom from "./NodeAtom";
import NodeGroup from "./NodeGroup";
import { USER_DISPLAY } from "../../common/config";
import { IItemDisplayMode } from "../../stores/UIStore";
import NetworkLinkWithLabel from "./NetworkLinkWithLabel";

export type INetworkWithGroupProps = {
  // graph: IGraph;
  title: string;
  itemId: string;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const node_size = USER_DISPLAY.network.node_size;

// const background = "#272b4d";

const NetworkNode_: React.FunctionComponent<NodeProvidedProps<any>> = (
  props
) => {
  const {
    savedStore,
    uiStore,
    graphStore,
    userStore,
    knowbookStore,
    feedStore,
  } = useStores();
  let node;
  if (props.node.related === "group_prop") {
    node = (
      <foreignObject
        x={-node_size / 2}
        y={-node_size / 4}
        width={node_size}
        height={node_size}
      >
        <NodeGroup title={props.node.title} />
      </foreignObject>
    );
  } else {
    node = (
      <foreignObject
        x={-node_size / 2}
        y={-node_size / 2}
        width={node_size}
        height={node_size}
      >
        <NodeAtom
          id={props.node.id}
          title={props.node.title}
          thumbnail_url={props.node.thumbnail_url}
          saved_actionable={isItemSavedActivated(knowbookStore)(props.node.id)}
          saved_enabled={isItemSaved(savedStore)(props.node.id)}
          saved_handler={onSaved(
            savedStore,
            graphStore,
            userStore,
            knowbookStore,
            feedStore
          )(props.node.id)}
          edit_handler={onEditKnowbooks(uiStore, knowbookStore)(props.node.id)}
          pathname={"/ItemView"}
          queryObject={{ title: props.node.title, id: props.node.id }}
        />
      </foreignObject>
    );
  }

  return node;
};

const NetworkNode = observer(NetworkNode_);

const NetworkWithGroup: React.FunctionComponent<INetworkWithGroupProps> = (
  props
) => {
  const { uiStore, graphStore } = useStores();

  // if (process.browser) {
  if (
    uiStore.itemDisplayMode === IItemDisplayMode.Network &&
    (graphStore.graph.nodes.length === 0 ||
      graphStore.graph.nodes[0].id !== props.itemId)
  ) {
    graphStore.updateGraphItem(
      props.itemId,
      props.title,
      props.width,
      props.height
    );
  }
  // }

  const nodes = graphStore.graph.nodes;
  const links = graphStore.graph.links;

  return props.width < 10 ? null : (
    <svg width={props.width} height={props.height}>
      {/* <rect width={props.width} height={props.height} rx={14} fill="blue" /> */}
      {/* <circle cx={0} cy={0} r={30} fill="green" />
      <circle cx={props.width / 2} cy={props.height / 2} r={30} fill="red" /> */}
      <Group>
        <Links links={links} linkComponent={NetworkLinkWithLabel} />
        <Nodes nodes={nodes} nodeComponent={NetworkNode} />
      </Group>
    </svg>
  );
};

export default observer(NetworkWithGroup);
