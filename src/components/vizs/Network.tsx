import React from "react";
import { Links, Nodes } from "@visx/network";
import { LinkProvidedProps, NodeProvidedProps } from "@visx/network/lib/types";
import { observer } from "mobx-react-lite";
import { LinkVerticalLine } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
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

export type INetworkProps = {
  // graph: IGraph;
  title: string;
  itemId: string;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const node_size = USER_DISPLAY.network.node_size;

// const background = "#272b4d";
const black = "#000000";

const NetworkLink: React.FunctionComponent<LinkProvidedProps<any>> = (
  props
) => {
  const link_label = props.link.target.related.split("|")[1];
  const displayCondition = props.link.source.related !== "prop";
  const a =
    (props.link.source.y - props.link.target.y) /
    (props.link.source.x - props.link.target.x);
  // const X = (props.link.source.x + props.link.target.x) * 0.5;
  // const Y = (props.link.source.y + props.link.target.y) * 0.5;
  const ecart_t = 0.65;
  const X =
    (props.link.target.x - props.link.source.x) * ecart_t + props.link.source.x;
  const Y = a * (X - props.link.target.x) + props.link.target.y;

  const Label = displayCondition && (
    <Text textAnchor="middle" dy={Y} dx={X} fontSize={12}>
      {link_label}
    </Text>
  );

  return (
    <svg>
      {/* <LinkVerticalCurve<Node, Node>
        data={props.link}
        stroke={black}
        strokeWidth="2"
        strokeOpacity={0.9}
        fill="none"
      /> */}
      <LinkVerticalLine<Node, Node>
        data={props.link}
        stroke={black}
        strokeWidth="2"
        strokeOpacity={0.9}
        fill="none"
      />
      {Label}
    </svg>
  );
};

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
  if (props.node.related === "prop") {
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
// const NetworkNode = NetworkNodeGroup;

const Network: React.FunctionComponent<INetworkProps> = (props) => {
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

  // const empty_svg = <svg></svg>;
  // if (savedStore.graph === undefined) {
  //   return empty_svg;
  // }

  const nodes = graphStore.graph.nodes;
  const links = graphStore.graph.links;

  return props.width < 10 ? null : (
    <svg width={props.width} height={props.height}>
      {/* <rect width={width} height={height} rx={14} fill={background} /> */}
      <Group>
        <Links links={links} linkComponent={NetworkLink} />
        <Nodes nodes={nodes} nodeComponent={NetworkNode} />
      </Group>
    </svg>
  );
};

export default observer(Network);
