import {
  forceCenter,
  forceCollide,
  forceLink,
  forceSimulation,
} from "d3-force";
import { action, makeObservable, observable } from "mobx";
import { AtomID, IAtom, ILink, INode, IRelatedAtom } from "../common/globals";
import { newAtom } from "../libs/utils";
import { IStores } from "./_RootStore";

interface IGraph {
  nodes: INode[];
  links: ILink[];
}

export const group_name = "group";

export class GraphStore {
  private $rootItemId: AtomID = undefined;
  private $graph: IGraph = { nodes: [], links: [] };
  private $relatedMap = observable.map<string, IAtom[]>();
  // private $relatedMap = observable.map<AtomID, IAtom[]>();

  constructor() {
    makeObservable<GraphStore, "$rootItemId" | "$graph">(this, {
      $rootItemId: observable,
      $graph: observable,
      setRelatedMap: action,
      setGraph: action,
      renderGraph: action,
      runSimulation: action,
      renderRelatedMap: action,
    });
  }

  get rootItemId() {
    return this.$rootItemId;
  }
  get graph() {
    return this.$graph;
  }
  get graphMap() {
    return this.$relatedMap;
  }

  setRelatedMap(root_itemId: AtomID, stores: IStores): void {
    const related: IRelatedAtom[] = stores.feedStore.getRelated(root_itemId);
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

    this.$relatedMap.clear();
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
      this.$relatedMap.set(key_value[0], key_value[1]);
    });

    this.$rootItemId = root_itemId;
  }

  setGraph(root_item: IAtom, stores: IStores, x0: number, y0: number): void {
    if (root_item === undefined) {
      return;
    }

    this.setRelatedMap(root_item.id, stores);

    const rootNode: INode = {
      x: x0,
      y: y0,
      pos: 0,
      relation_name: "",
      ...root_item,
    };

    this.graph.nodes = [rootNode];
    this.graph.links = [];

    this.$relatedMap.forEach((items_list_for_relation, key) => {
      if (items_list_for_relation.length > 1) {
        //NodeGroup Element
        const node_group: INode = {
          x: x0,
          y: y0,
          pos: this.graph.nodes.length,
          relation_name: group_name,
          ...newAtom(key, stores.userStore.paramsPage.lang),
        };
        node_group.title = key;
        // node_group.related = "group";

        this.graph.nodes.push(node_group);
        this.graph.links.push({
          source: this.graph.nodes[0],
          target: this.graph.nodes[node_group.pos],
        });

        items_list_for_relation.forEach((item: IAtom) => {
          const node: INode = {
            x: x0,
            y: y0,
            pos: this.graph.nodes.length,
            relation_name: "",
            ...item,
          };
          this.graph.nodes.push(node);

          this.graph.links.push({
            source: this.graph.nodes[node_group.pos],
            target: this.graph.nodes[node.pos],
          });
        });
      } else if (items_list_for_relation.length === 1) {
        //No group
        const node: INode = {
          x: x0,
          y: y0,
          pos: this.graph.nodes.length,
          relation_name: key,
          ...items_list_for_relation[0],
        };
        this.graph.nodes.push(node);
        this.graph.links.push({
          source: this.graph.nodes[0],
          target: this.graph.nodes[node.pos],
        });
      }
    });
  }

  renderRelatedMap(root_itemId: AtomID, stores: IStores): void {
    const root_item = stores.feedStore.getItemFromAnywhere(root_itemId, stores);
    if (root_item === undefined) {
      return;
    }

    if (stores.feedStore.getRelated(root_itemId) === undefined) {
      stores.feedStore
        .fetchRelated(stores, root_item.id, root_item.title)
        .then(() => {
          this.setRelatedMap(root_itemId, stores);
        });
    } else if (root_itemId !== this.$rootItemId) {
      this.setRelatedMap(root_itemId, stores);
    }
  }

  runSimulation(width: number, height: number, stores: IStores): void {
    const GUI_CONFIG = stores.userStore.GUI_CONFIG;
    const width_node = GUI_CONFIG.display.atom_compact_vizs_sizes.width;

    const forceColideRadius = width_node * 0.9;
    const forceLinkDistance = width_node * 1.1;
    const forceIterations = 10;
    const forceAlphaMin = 0.001; //0.001 working well

    //Deep Copy, all other solutions didn't worked!
    const nodesClone = this.graph.nodes.map((el) => {
      return { ...el };
    });

    const linksClone = this.graph.links.map((link: ILink) => {
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
          this.$graph.nodes = nodesClone;
          this.$graph.links = linksClone.map((link: ILink) => {
            return {
              source: this.$graph.nodes[link.source.pos],
              target: this.$graph.nodes[link.target.pos],
            };
          });
          // }
        })
      )
      .alphaMin(forceAlphaMin) //To converge quickly, default is 0.001
      .alphaDecay(0.1);
    // .alphaDecay(0.05);
  }

  renderGraph(
    root_itemId: AtomID,
    stores: IStores,
    width: number,
    height: number
  ): void {
    const feedStore = stores.feedStore;
    const root_item = feedStore.getItemFromAnywhere(root_itemId, stores);
    if (root_item === undefined) {
      return;
    }

    if (feedStore.getRelated(root_itemId) === undefined) {
      stores.uiStore.setShowLoading(true);
      feedStore
        .fetchRelated(stores, root_item.id, root_item.title)
        .then(
          action(() => {
            this.setGraph(root_item, stores, width / 2, height / 2);
          })
        )
        .then(
          action(() => {
            this.runSimulation(width / 2, height / 2, stores);
            stores.uiStore.setShowLoading(false);
          })
        );
    } else if (root_itemId !== this.$rootItemId) {
      this.setGraph(root_item, stores, width / 2, height / 2);
      this.runSimulation(width / 2, height / 2, stores);
      // stores.uiStore.setShowLoading(false);
    }
    // stores.uiStore.setShowLoading(false);
  }
}
