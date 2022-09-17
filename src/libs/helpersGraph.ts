import {
  forceCenter,
  forceCollide,
  forceLink,
  forceSimulation,
} from "d3-force";
import {
  AtomID,
  group_name,
  IGraph,
  ILink,
  INode,
  TUiBooleanStorage,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { setRelatedMap } from "./helpersRelated";

export function initGraph(
  rootId: AtomID,
  stores: IStores,
  x0: number,
  y0: number
): void {
  if (rootId === undefined) {
    return;
  }

  setRelatedMap(rootId, stores);

  const rootNode: INode = {
    x: x0,
    y: y0,
    pos: 0,
    relation_name: "",
    item: rootId,
  };

  const graph: IGraph = { nodes: [rootNode], links: [] };

  stores.graphStore.relatedMap.forEach((items_list_for_relation, key) => {
    if (items_list_for_relation.length > 1) {
      //NodeGroup Element
      const node_group: INode = {
        x: x0,
        y: y0,
        pos: graph.nodes.length,
        relation_name: group_name,
        item: key, //Contains name of the group
      };

      graph.nodes.push(node_group);
      graph.links.push({
        source: graph.nodes[0],
        target: graph.nodes[node_group.pos],
      });

      items_list_for_relation.forEach((itemId: AtomID) => {
        const node: INode = {
          x: x0,
          y: y0,
          pos: graph.nodes.length,
          relation_name: "",
          item: itemId,
        };
        graph.nodes.push(node);

        graph.links.push({
          source: graph.nodes[node_group.pos],
          target: graph.nodes[node.pos],
        });
      });
    } else if (items_list_for_relation.length === 1) {
      //No group
      const node: INode = {
        x: x0,
        y: y0,
        pos: graph.nodes.length,
        relation_name: key,
        item: items_list_for_relation[0],
      };
      graph.nodes.push(node);
      graph.links.push({
        source: graph.nodes[0],
        target: graph.nodes[node.pos],
      });
    }
  });

  stores.graphStore.setGraph(graph.nodes, graph.links);
}

function runSimulation(width: number, height: number, stores: IStores): void {
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const width_node = GUI_CONFIG.display.atom_compact_vizs_sizes.width;

  const forceColideRadius = width_node * 0.9;
  const forceLinkDistance = width_node * 1.1;
  const forceIterations = 10;
  const forceAlphaMin = 0.001; //0.001 working well

  stores.uiStore.setUiBooleanStorage(
    TUiBooleanStorage.renderGraphNetwork,
    false
  );

  //Deep Copy, all other solutions didn't worked!
  const nodesClone = stores.graphStore.graph.nodes.map((el) => {
    return { ...el };
  });

  const linksClone = stores.graphStore.graph.links.map((link: ILink) => {
    return {
      source: nodesClone[link.source.pos],
      target: nodesClone[link.target.pos],
    };
  });

  // let self = this;

  let tick_count = 0;
  forceSimulation(nodesClone)
    .force("center", forceCenter(width, height).strength(1.5))
    .force(
      "collision",
      forceCollide()
        .radius(forceColideRadius)
        .strength(0.5)
        .iterations(forceIterations)
    )
    .force(
      "link",
      forceLink(linksClone)
        .distance(forceLinkDistance)
        .strength(0.5)
        .iterations(forceIterations)
    )
    .on(
      "tick",
      // "end",
      () => {
        if (tick_count % 10 === 0) {
          //NEW
          // stores.graphStore.graph.nodes = nodesClone;
          const new_links: ILink[] = linksClone.map((link: ILink) => {
            return {
              source: stores.graphStore.graph.nodes[link.source.pos],
              target: stores.graphStore.graph.nodes[link.target.pos],
            };
          });
          stores.graphStore.setGraph(nodesClone, new_links);
        }
        tick_count = tick_count + 1;
      }
    )
    // .on("end", () => {
    //   // To be completed
    // })
    .alphaMin(forceAlphaMin) //To converge quickly, default is 0.001
    .alphaDecay(0.1);
  // .alphaDecay(0.05);
}

export function renderGraph(
  root_itemId: AtomID,
  stores: IStores,
  width: number,
  height: number
): void {
  const render: boolean = stores.uiStore.getUiBooleanStorage(
    TUiBooleanStorage.renderGraphNetwork
  );
  if (render) {
    initGraph(root_itemId, stores, width / 2, height / 2);
    runSimulation(width / 2, height / 2, stores);

    // //Fetch missing images
    const related_Ids: AtomID[] = stores.graphStore.relatedMapFlat.atomIds;
    for (const id of related_Ids) {
      stores.baseStore.setGoodImageInHistoryItem(id);
    }
  }
}
