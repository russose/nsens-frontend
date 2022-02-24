import {
  forceCenter,
  forceCollide,
  forceLink,
  forceSimulation,
} from "d3-force";
import {
  AtomID,
  EXCLUSION_PATTERNS,
  group_name,
  IAtom,
  IGraph,
  ILink,
  initStateCat,
  INode,
  IRelatedAtom,
  IRelatedAtomFull,
  TUiBooleanStorage,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getItemsFromTitlesFromWebCleanImage_blocking } from "./apiItems";
import { api_getRelatedFromWebWithoutImage } from "./apiRelated";
import { isMobile } from "./helpersBase";

export function setRelatedMap(root_itemId: AtomID, stores: IStores): void {
  const related: IRelatedAtom[] = stores.baseStore.related.get(root_itemId);
  if (
    root_itemId === undefined ||
    related === undefined ||
    related.length === 0
  ) {
    return;
  }

  const relatedMap_local = new Map<string, AtomID[]>();

  related.forEach((el) => {
    const key = el.relation;
    if (!relatedMap_local.has(key)) {
      relatedMap_local.set(key, [el.item]);
    } else {
      const item_list: AtomID[] = relatedMap_local.get(key);
      item_list.push(el.item);
      relatedMap_local.set(key, item_list);
    }
  });

  stores.graphStore.clearRelatedMap();
  //Sort Map by lengh
  const keys_values_sorted = Array.from(relatedMap_local.entries()).sort(
    (a, b) => {
      if (a[1].length > b[1].length) {
        //a est avant à b
        return -1;
      } else if (a[1].length < b[1].length) {
        //a est après à b
        return 1;
      } else {
        return 0;
      }
    }
  );

  keys_values_sorted.forEach((key_value) => {
    stores.graphStore.setRelatedMap(key_value[0], key_value[1]);
  });

  stores.graphStore.setRootItemId(root_itemId);
}

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
      // action(
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
      // )
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
  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);
  let root_item: IAtom = stores.baseStore.getHistoryItem(root_itemId);

  if (root_item === undefined) {
    api_getItemsFromTitlesFromWebCleanImage_blocking(
      stores.uiStore.selectedAtom.title,
      lang,
      exclusion_patterns_items
    ).then((items) => {
      stores.baseStore.setHistory(items);
    });
    return;
  }

  if (!baseStore.related.has(root_itemId)) {
    // stores.uiStore.setShowLoading(true);
    stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, true);
    api_getRelatedFromWebWithoutImage(
      root_item.id,
      root_item.title,
      lang,
      exclusion_patterns_items
    )
      .then((relatedList: IRelatedAtomFull[]) => {
        //With no duplicates by construction
        stores.baseStore.setRelated(root_item.id, relatedList);
        const relatedIds = relatedList.map((related) => {
          return related.item.id;
        });
        if (!isMobile(stores)) {
          for (const id of relatedIds) {
            stores.baseStore.setGoodImageInHistoryItem(id);
          }
        }
      })
      .then(() => {
        initGraph(root_itemId, stores, width / 2, height / 2);
      })
      .then(() => {
        runSimulation(width / 2, height / 2, stores);
        // stores.uiStore.setShowLoading(false);
        stores.uiStore.setUiBooleanStorage(
          TUiBooleanStorage.showLoading,
          false
        );
      });
  } else if (root_itemId !== stores.graphStore.rootItemId) {
    initGraph(root_itemId, stores, width / 2, height / 2);
    runSimulation(width / 2, height / 2, stores);
  }
}

export async function initializeGraphSVG(
  root_itemId: AtomID,
  root_itemTitle: string,
  stores: IStores
): Promise<void> {
  const baseStore = stores.baseStore;
  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  stores.baseStore.setInitCompleted(initStateCat.Item, false);

  let root_item: IAtom = stores.baseStore.getHistoryItem(root_itemId);

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, true);

  if (root_item === undefined) {
    const items = await api_getItemsFromTitlesFromWebCleanImage_blocking(
      root_itemTitle,
      lang,
      exclusion_patterns_items
    );
    stores.baseStore.setHistory(items);
    root_item = items[0];
  }

  if (!baseStore.related.has(root_item.id)) {
    const relatedList: IRelatedAtomFull[] =
      await api_getRelatedFromWebWithoutImage(
        root_item.id,
        root_item.title,
        lang,
        exclusion_patterns_items
      );

    //With no duplicates by construction
    stores.baseStore.setRelated(root_item.id, relatedList);

    setRelatedMap(root_item.id, stores);
  } else {
    setRelatedMap(root_itemId, stores);
  }

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, false);

  stores.baseStore.setInitCompleted(initStateCat.Item, true);
}
