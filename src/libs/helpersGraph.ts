import {
  forceCenter,
  forceCollide,
  forceLink,
  forceSimulation,
} from "d3-force";
// import { action } from "mobx";
import {
  AtomID,
  EXCLUSION_PATTERNS,
  group_name,
  IAtom,
  IGraph,
  ILink,
  INode,
  IRelatedAtom,
} from "../config/globals";
import { fetchRelatedAndUpdateStores } from "./helpersRelated";
import { IStores } from "../stores/RootStore";
import { newAtom } from "./utils";
import { getItemFromAnyStores } from "./helpersSavedKnowbooks";
import { api_getItemsFromTitlesFromWeb_blocking } from "./apiItems";

export function setRelatedMap(root_itemId: AtomID, stores: IStores): void {
  const related: IRelatedAtom[] = stores.baseStore.getRelated(root_itemId);
  if (
    root_itemId === undefined ||
    related === undefined ||
    related.length === 0
  ) {
    return;
  }

  // const relatedMap_local = new Map<AtomID, IAtom[]>();
  const relatedMap_local = new Map<string, IAtom[]>();

  related.forEach((el) => {
    const key = el.relation;
    if (!relatedMap_local.has(key)) {
      relatedMap_local.set(key, [el.item]);
    } else {
      const item_list: IAtom[] = relatedMap_local.get(key);
      item_list.push(el.item);
      relatedMap_local.set(key, item_list);
    }
  });

  // stores.graphStore.relatedMap.clear();
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
    // this.$relatedMap.set(key_value[0], key_value[1]);
    stores.graphStore.setRelatedMap(key_value[0], key_value[1]);
  });

  stores.graphStore.setRootItemId(root_itemId);
}

// export function setGraph(
//   root_item: IAtom,
//   stores: IStores,
//   x0: number,
//   y0: number
// ): void {
//   if (root_item === undefined) {
//     return;
//   }

//   setRelatedMap(root_item.id, stores);

//   const rootNode: INode = {
//     x: x0,
//     y: y0,
//     pos: 0,
//     relation_name: "",
//     ...root_item,
//   };

//   this.graph.nodes = [rootNode];
//   this.graph.links = [];

//   stores.graphStore.relatedMap.forEach((items_list_for_relation, key) => {
//     if (items_list_for_relation.length > 1) {
//       //NodeGroup Element
//       const node_group: INode = {
//         x: x0,
//         y: y0,
//         pos: stores.graphStore.graph.nodes.length,
//         relation_name: group_name,
//         ...newAtom(key, stores.baseStore.paramsPage.lang),
//       };
//       node_group.title = key;
//       // node_group.related = "group";

//       this.graph.nodes.push(node_group);
//       this.graph.links.push({
//         source: this.graph.nodes[0],
//         target: this.graph.nodes[node_group.pos],
//       });

//       items_list_for_relation.forEach((item: IAtom) => {
//         const node: INode = {
//           x: x0,
//           y: y0,
//           pos: stores.graphStore.graph.nodes.length,
//           relation_name: "",
//           ...item,
//         };
//         this.graph.nodes.push(node);

//         this.graph.links.push({
//           source: stores.graphStore.graph.nodes[node_group.pos],
//           target: stores.graphStore.graph.nodes[node.pos],
//         });
//       });
//     } else if (items_list_for_relation.length === 1) {
//       //No group
//       const node: INode = {
//         x: x0,
//         y: y0,
//         pos: stores.graphStore.graph.nodes.length,
//         relation_name: key,
//         ...items_list_for_relation[0],
//       };
//       this.graph.nodes.push(node);
//       this.graph.links.push({
//         source: this.graph.nodes[0],
//         target: this.graph.nodes[node.pos],
//       });
//     }
//   });
// }

export function setGraph(
  root_item: IAtom,
  stores: IStores,
  x0: number,
  y0: number
): void {
  if (root_item === undefined) {
    return;
  }

  setRelatedMap(root_item.id, stores);

  const rootNode: INode = {
    x: x0,
    y: y0,
    pos: 0,
    relation_name: "",
    ...root_item,
  };

  // this.graph.nodes = [rootNode];
  // this.graph.links = [];
  const graph: IGraph = { nodes: [rootNode], links: [] };

  stores.graphStore.relatedMap.forEach((items_list_for_relation, key) => {
    if (items_list_for_relation.length > 1) {
      //NodeGroup Element
      const node_group: INode = {
        x: x0,
        y: y0,
        pos: graph.nodes.length,
        relation_name: group_name,
        ...newAtom(key, stores.baseStore.paramsPage.lang),
      };
      node_group.title = key;
      // node_group.related = "group";

      graph.nodes.push(node_group);
      graph.links.push({
        source: graph.nodes[0],
        target: graph.nodes[node_group.pos],
      });

      items_list_for_relation.forEach((item: IAtom) => {
        const node: INode = {
          x: x0,
          y: y0,
          pos: graph.nodes.length,
          relation_name: "",
          ...item,
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
        ...items_list_for_relation[0],
      };
      graph.nodes.push(node);
      graph.links.push({
        source: graph.nodes[0],
        target: graph.nodes[node.pos],
      });
    }
  });

  //New line
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
    // .force("charge", forceManyBody().strength(-50))
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
          // OLD
          // stores.graphStore.graph.nodes = nodesClone;
          // stores.graphStore.graph.links = linksClone.map((link: ILink) => {
          //   return {
          //     source: stores.graphStore.graph.nodes[link.source.pos],
          //     target: stores.graphStore.graph.nodes[link.target.pos],
          //   };
          // });
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
  // title: string,
  stores: IStores,
  width: number,
  height: number
): void {
  const baseStore = stores.baseStore;
  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);
  let root_item: IAtom = getItemFromAnyStores(root_itemId, stores);

  if (root_item === undefined) {
    api_getItemsFromTitlesFromWeb_blocking(
      stores.uiStore.selectedAtom.title,
      lang,
      exclusion_patterns_items
    ).then((items) => {
      stores.baseStore.setHistory(items);
    });
    return;
  }

  if (baseStore.getRelated(root_itemId) === undefined) {
    stores.uiStore.setShowLoading(true);
    fetchRelatedAndUpdateStores(stores, root_item.id, root_item.title)
      .then(
        // action(
        () => {
          setGraph(root_item, stores, width / 2, height / 2);
        }
        // )
      )
      .then(
        // action(
        () => {
          runSimulation(width / 2, height / 2, stores);
          stores.uiStore.setShowLoading(false);
        }
        // )
      );
  } else if (root_itemId !== stores.graphStore.rootItemId) {
    setGraph(root_item, stores, width / 2, height / 2);
    runSimulation(width / 2, height / 2, stores);
    // stores.uiStore.setShowLoading(false);
  }
  // stores.uiStore.setShowLoading(false);
}

// export function renderRelatedMap(root_itemId: AtomID, stores: IStores): void {
//   const root_item = getItemFromAnywhere(root_itemId, stores);
//   if (root_item === undefined) {
//     return;
//   }

//   if (stores.baseStore.getRelated(root_itemId) === undefined) {
//     fetchRelatedAndUpdateStores(stores, root_item.id, root_item.title).then(
//       () => {
//         setRelatedMap(root_itemId, stores);
//       }
//     );
//   } else if (root_itemId !== stores.graphStore.rootItemId) {
//     setRelatedMap(root_itemId, stores);
//   }
// }
