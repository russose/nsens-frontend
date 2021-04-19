import {
  forceCenter,
  forceCollide,
  forceLink,
  forceSimulation,
} from "d3-force";
import { action } from "mobx";
import { AtomID, ILink } from "../config/globals";
import { fetchRelated } from "./helpersRelated";
import { IStores } from "../stores/_RootStore";
import { getItemFromAnywhere } from "./helpersBase";

export function renderRelatedMap(root_itemId: AtomID, stores: IStores): void {
  const root_item = getItemFromAnywhere(root_itemId, stores);
  if (root_item === undefined) {
    return;
  }

  if (stores.baseStore.getRelated(root_itemId) === undefined) {
    fetchRelated(stores, root_item.id, root_item.title).then(() => {
      stores.graphStore.setRelatedMap(root_itemId, stores);
    });
  } else if (root_itemId !== stores.graphStore.rootItemId) {
    stores.graphStore.setRelatedMap(root_itemId, stores);
  }
}

function runSimulation(width: number, height: number, stores: IStores): void {
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const width_node = GUI_CONFIG.display.atom_compact_vizs_sizes.width;

  const forceColideRadius = width_node * 0.9;
  const forceLinkDistance = width_node * 1.1;
  const forceIterations = 10;
  const forceAlphaMin = 0.001; //0.001 working well

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

  // let tick_count = 0;
  forceSimulation(nodesClone)
    .force("center", forceCenter(width, height).strength(1.5))
    .force(
      "collision",
      forceCollide()
        .radius(forceColideRadius)
        .strength(0.5)
        .iterations(forceIterations)
    )
    // .force("charge", forceManyBody().strength(-50))
    .force(
      "link",
      forceLink(linksClone)
        .distance(forceLinkDistance)
        .strength(0.5)
        .iterations(forceIterations)
    )
    .on(
      // "tick",
      "end",
      action(() => {
        // tick_count = tick_count + 1;
        // if (tick_count % 10 === 0) {
        stores.graphStore.graph.nodes = nodesClone;
        stores.graphStore.graph.links = linksClone.map((link: ILink) => {
          return {
            source: stores.graphStore.graph.nodes[link.source.pos],
            target: stores.graphStore.graph.nodes[link.target.pos],
          };
        });
        // }
      })
    )
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
  const baseStore = stores.baseStore;
  const root_item = getItemFromAnywhere(root_itemId, stores);
  if (root_item === undefined) {
    return;
  }

  if (baseStore.getRelated(root_itemId) === undefined) {
    stores.uiStore.setShowLoading(true);
    fetchRelated(stores, root_item.id, root_item.title)
      .then(
        action(() => {
          stores.graphStore.setGraph(root_item, stores, width / 2, height / 2);
        })
      )
      .then(
        action(() => {
          runSimulation(width / 2, height / 2, stores);
          stores.uiStore.setShowLoading(false);
        })
      );
  } else if (root_itemId !== stores.graphStore.rootItemId) {
    stores.graphStore.setGraph(root_item, stores, width / 2, height / 2);
    runSimulation(width / 2, height / 2, stores);
    // stores.uiStore.setShowLoading(false);
  }
  // stores.uiStore.setShowLoading(false);
}
