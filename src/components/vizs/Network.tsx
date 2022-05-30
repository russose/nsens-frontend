import { Group } from "@visx/group";
import { Links, Nodes } from "@visx/network";
import { NodeProvidedProps } from "@visx/network/lib/types";
import { observer } from "mobx-react-lite";
import React from "react";
import { group_name, IAtom } from "../../config/globals";
import { showArticle } from "../../handlers/handlers_Articles";
import { onEditKnowbooks } from "../../handlers/handlers_Knowbooks";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../handlers/handlers_Saved";
import { isMobile } from "../../libs/helpersBase";
import { path_link } from "../../libs/utils";
import { IStores } from "../../stores/RootStore";
import { useStores } from "../../stores/RootStoreHook";
import CardAtomCompactViz from "../CardAtomCompactViz";
import NetworkLinkWithLabel from "./NetworkLinkWithLabel";
import NodeGroup from "./NodeGroup";

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
    node = (
      <foreignObject
        x={-node_dx / 2}
        y={-node_dy / 2}
        width={node_dx}
        height={node_dy}
      >
        <CardAtomCompactViz
          key={`cardAtomNetwork-${item.id}`}
          id={item.id}
          stores={stores}
          title={item.title}
          image_url={item.image_url}
          // pathname={path_Itemview}
          pathname={path_link(item.id, stores)}
          queryObject={{ title: item.title, id: item.id }}
          saved_enabled={isItemSaved(stores)(item.id)}
          saved_actionable={isItemSavedActivated(stores)(item.id)}
          saved_handler={onSaved(stores)(item.id)}
          edit_handler={onEditKnowbooks(stores)(item.id)}
          top_handler={showArticle(stores, item.title, item.id)}
          CompactExtra={isMobile(stores)}
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
