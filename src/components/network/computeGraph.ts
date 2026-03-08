import {
  IGraph,
  INode,
  NodeID,
  TRelationName,
  configGeneral,
} from "../../config/globals";
import { IStores } from "../../stores/RootStore";

function makeNode(
  // x0: number,
  // y0: number,
  graph: IGraph,
  relation_name: string,
  nameOrId: string | NodeID
): INode {
  const node: INode = {
    // x: x0,
    // y: y0,
    pos: graph.nodes.length,
    relation_name: relation_name,
    id: nameOrId.toString(), //Contains name of the group or AtomID or KnowbookId
  };

  graph.nodes.push(node);
  return node;
}

function computeNodesEdgesOneCluster(
  // x0: number,
  // y0: number,
  relatedMapAtom: Map<string, NodeID[]>,
  graph: IGraph,
  root_node_cluster: INode,
  stores: IStores
): void {
  const NODE_NAME_PUBLIC_KNOWBOOK =
    stores.baseStore.GUI_CONFIG.language.network.nodeNameForPublicKnowbooks;

  const NODE_NAME_CONTENT_KNOWBOOK =
    stores.baseStore.GUI_CONFIG.language.network.nodeNameForContentKnowbooks;

  relatedMapAtom.forEach((items_list_for_relation, key) => {
    if (
      items_list_for_relation.length > 1 ||
      key === NODE_NAME_PUBLIC_KNOWBOOK ||
      key === NODE_NAME_CONTENT_KNOWBOOK
    ) {
      //NodeGroup Element
      // const node_group = makeNode(x0, y0, graph, TRelationName.group, key);
      const node_group = makeNode(graph, TRelationName.group, key);

      graph.links.push({
        source: root_node_cluster,
        target: graph.nodes[node_group.pos],
      });

      items_list_for_relation.forEach((nodeID: NodeID) => {
        // const node = makeNode(x0, y0, graph, "", nodeID);
        const node = makeNode(graph, "", nodeID);

        graph.links.push({
          source: graph.nodes[node_group.pos],
          target: graph.nodes[node.pos],
        });
      });
    } else if (items_list_for_relation.length === 1) {
      //No NodeGroup Element
      // const node = makeNode(x0, y0, graph, key, items_list_for_relation[0]);
      const node = makeNode(graph, key, items_list_for_relation[0]);

      graph.links.push({
        source: root_node_cluster,
        target: graph.nodes[node.pos],
      });
    }
  });
}

export function computeNodesEdgesGraph(
  rootId: NodeID,
  stores: IStores
  // x0: number,
  // y0: number
): void {
  if (rootId === undefined) {
    return;
  }

  const NO_MULTI_LEVELS = "no_multi-levels";

  const relation_multilevel_separator =
    configGeneral.relation_multilevel_separator;

  const rootNode: INode = {
    // x: x0,
    // y: y0,
    pos: 0,
    relation_name: "",
    id: rootId.toString(),
  };

  const graph: IGraph = { nodes: [rootNode], links: [] };

  const relatedMap_Map = new Map<string, Map<string, NodeID[]>>();
  relatedMap_Map.set(NO_MULTI_LEVELS, new Map<string, NodeID[]>());

  stores.graphStore.networkMap.forEach((items_list_for_relation, key) => {
    const levels = key.split(relation_multilevel_separator);

    if (levels.length === 1) {
      // Relation without "relation_multilevel_separator"
      const level1 = NO_MULTI_LEVELS;
      const level2 = levels[0];
      relatedMap_Map.set(
        level1,
        relatedMap_Map.get(level1).set(level2, items_list_for_relation)
      );
    } else {
      // Relation with "relation_multilevel_separator"
      const level1 = levels[0];
      const level2 = levels[1];
      if (relatedMap_Map.has(level1)) {
        relatedMap_Map.set(
          level1,
          relatedMap_Map.get(level1).set(level2, items_list_for_relation)
        );
      } else {
        relatedMap_Map.set(
          level1,
          new Map<string, NodeID[]>().set(level2, items_list_for_relation)
        );
      }
    }
  });

  relatedMap_Map.forEach((relatedMap_cluster, key) => {
    if (key === NO_MULTI_LEVELS) {
      computeNodesEdgesOneCluster(
        // x0,
        // y0,
        relatedMap_cluster,
        graph,
        graph.nodes[0],
        stores
      );
    } else {
      // const node_group = makeNode(x0, y0, graph, TRelationName.group, key);
      const node_group = makeNode(graph, TRelationName.group, key);

      graph.links.push({
        source: graph.nodes[0],
        target: graph.nodes[node_group.pos],
      });

      computeNodesEdgesOneCluster(
        // x0,
        // y0,
        relatedMap_cluster,
        graph,
        node_group,
        stores
      );
    }
  });

  stores.graphStore.setGraph(graph.nodes, graph.links);
}
