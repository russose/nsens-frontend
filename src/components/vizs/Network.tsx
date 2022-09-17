import { Group } from "@visx/group";
import { Links, Nodes } from "@visx/network";
import { NodeProvidedProps } from "@visx/network/lib/types";
import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral, group_name, IAtom } from "../../config/globals";
import { IStores } from "../../stores/RootStore";
import { useStores } from "../../stores/RootStoreHook";
import NetworkLinkWithLabel from "./NetworkLinkWithLabel";
import NodeGroup from "./NodeGroup";
import CardAtomCompactViz_NotLogged from "../CardAtomCompactViz_NotLogged";
import dynamic from "next/dynamic";

const CardAtomCompactViz_Logged_D = dynamic(
  () => import("./../CardAtomCompactViz_Logged")
);

export type INetworkWithGroupProps = {
  title: string;
  itemId: string;
  stores: IStores;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const NetworkNode_: React.FunctionComponent<NodeProvidedProps<any>> = (
  props
) => {
  const stores = useStores();
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const node_dx = GUI_CONFIG.display.atom_compact_vizs_sizes.width;
  const node_dy = GUI_CONFIG.display.atom_compact_vizs_sizes.height;

  let node;
  if (props.node.relation_name === group_name) {
    node = (
      <foreignObject
        x={-node_dx / 2}
        y={-node_dy / 4}
        width={node_dx}
        height={node_dy}
      >
        <NodeGroup stores={stores} title={props.node.item} />
      </foreignObject>
    );
  } else {
    const item: IAtom = stores.baseStore.getHistoryItem(props.node.item);

    let cardAtom;
    const color =
      item.id === stores.graphStore.graph.nodes[0].item
        ? configGeneral.colors.network_item_selected_color
        : configGeneral.colors.item_color;
    if (stores.baseStore.isLogged) {
      cardAtom = (
        <CardAtomCompactViz_Logged_D
          stores={stores}
          item={item}
          color={color}
        />
      );
    } else {
      cardAtom = (
        <CardAtomCompactViz_NotLogged
          stores={stores}
          item={item}
          color={color}
        />
      );
    }

    node = (
      <foreignObject
        x={-node_dx / 2}
        y={-node_dy / 2}
        width={node_dx}
        height={node_dy}
      >
        {cardAtom}
      </foreignObject>
    );
  }

  return node;
};

const NetworkNode = observer(NetworkNode_);

const Network: React.FunctionComponent<INetworkWithGroupProps> = (props) => {
  const nodes = props.stores.graphStore.graph.nodes;
  const links = props.stores.graphStore.graph.links;

  return props.width < 10 ? null : (
    <svg width={props.width} height={props.height}>
      {/* <rect width={props.width} height={props.height} rx={14} fill="blue" />
      <circle cx={0} cy={0} r={30} fill="green" />
      <circle cx={props.width / 2} cy={props.height / 2} r={30} fill="red" /> */}
      <Group>
        <Links links={links} linkComponent={NetworkLinkWithLabel} />
        <Nodes nodes={nodes} nodeComponent={NetworkNode} />
      </Group>
    </svg>
  );
};

export default observer(Network);
