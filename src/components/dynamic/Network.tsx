import { Group } from "@visx/group";
import { Links, Nodes } from "@visx/network";
import { NodeProvidedProps } from "@visx/network/lib/types";
import { observer } from "mobx-react-lite";
import React from "react";
import { configPaths } from "../../common/globals";
import { onEditKnowbooks } from "../../handlers/handlers_Knowbooks";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../handlers/handlers_Saved";
import { group_name } from "../../stores/GraphStore";
import { IStores } from "../../stores/_RootStore";
import { useStores } from "../../stores/_RootStoreHook";
import CardAtomCompact from "../CardAtomCompact";
import NetworkLinkWithLabel from "../vizs/NetworkLinkWithLabel";
import NodeGroup from "../vizs/NodeGroup";

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
  const GUI_CONFIG = stores.userStore.GUI_CONFIG;
  const node_dx = GUI_CONFIG.display.atom_compact_vizs_sizes.width;
  const node_dy = GUI_CONFIG.display.atom_compact_vizs_sizes.height;
  const path_Itemview = configPaths.pages.ItemArticle;
  let node;
  if (props.node.relation_name === group_name) {
    node = (
      <foreignObject
        x={-node_dx / 2}
        y={-node_dy / 4}
        width={node_dx}
        height={node_dy}
      >
        <NodeGroup stores={stores} title={props.node.title} />
      </foreignObject>
    );
  } else {
    node = (
      <foreignObject
        x={-node_dx / 2}
        y={-node_dy / 2}
        width={node_dx}
        height={node_dy}
      >
        <CardAtomCompact
          key={`cardAtomNetwork-${props.node.id}`}
          id={props.node.id}
          stores={stores}
          title={props.node.title}
          image_url={props.node.image_url}
          pathname={path_Itemview}
          queryObject={{ title: props.node.title, id: props.node.id }}
          saved_enabled={isItemSaved(stores)(props.node.id)}
          saved_actionable={isItemSavedActivated(stores)(props.node.id)}
          saved_handler={onSaved(stores)(props.node.id)}
          edit_handler={onEditKnowbooks(stores)(props.node.id)}
          forVizs={true}
        />
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
