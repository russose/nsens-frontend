import { observable, action, computed, makeObservable } from "mobx";
import { IAtom, AtomID, IGraph, ILink, INode, newAtom } from "../common/types";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
} from "d3-force";
import { _getItemsFromTitlesFromWeb, _getRelatedFromWeb } from "../_api";

export class GraphStore {
  private $graph: IGraph = { nodes: [], links: [] };

  constructor() {
    makeObservable<GraphStore, "$graph">(this, {
      $graph: observable,
      setGraph: action,
      graph: computed,
      updateGraphItem: action,
    });
  }

  get graph() {
    return this.$graph;
  }
  setGraph(graph: IGraph): void {
    if (graph === undefined) {
      return;
    }
    this.$graph = graph;
  }

  updateGraphItem(
    itemID: AtomID,
    title: string,
    width: number,
    height: number
  ): void {
    const width_node = 100;
    const forceManyStrength = -50;
    const forceColiideRadius = width_node;
    const forceLinkDistance = width_node * 1;
    const forceLinkIterations = 5;
    const forceAlphaMin = 0.001;
    const forceAlphaDecay = 0.5;

    this.getGraphDataItem(itemID, title)
      // _getRelated(itemID)
      .then(
        action((items: IAtom[]) => {
          if (items === undefined) {
            return;
          }
          const graph = this.buildGraphItem(items);
          this.setGraph(graph);

          const nodes = graph.nodes;
          const links = graph.links;

          let self = this;
          const simulation = forceSimulation(nodes)
            .force("center", forceCenter(width / 2, height / 2))
            .force("collision", forceCollide().radius(forceColiideRadius))
            .force("charge", forceManyBody().strength(forceManyStrength))
            .force(
              "link",
              forceLink(links)
                .distance(forceLinkDistance)
                // .strength(1)
                .iterations(forceLinkIterations)
            )
            .on("tick", function () {
              self.setGraph({ nodes: nodes, links: links });
            })
            .alphaMin(forceAlphaMin) //To converge quickly, default is 0.001
            .alphaDecay(forceAlphaDecay);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  buildGraphItem(items: IAtom[]): IGraph {
    const graph_map = new Map<string, INode[]>();
    const items_INode: INode[] = items.map((item) => {
      return {
        x: 0,
        y: 0,
        ...item,
      };
    });
    const node_root = items_INode[0];
    items_INode.shift(); //remove node_root from items_INode

    items_INode.forEach((node) => {
      const key = node.related;

      if (!graph_map.has(key)) {
        graph_map.set(key, [node]);
      } else {
        const nodes_list: INode[] = graph_map.get(key);
        nodes_list.push(node);
        graph_map.set(key, nodes_list);
      }
    });
    const nodes: INode[] = [node_root];
    const links: ILink[] = [];

    // const cluster_amount = Array.from(graph_map.keys()).length
    // let pos_cluster = 0;
    // const ecart = 200;
    // const initial_cluster_position = Array.from({length: cluster_amount}, (x, i) => ecart * i);

    graph_map.forEach((nodes_list_prop, key) => {
      //NodeGroup Element
      // pos_cluster = pos_cluster + ecart;
      const node_prop: INode = {
        x: 0,
        y: 0,
        ...newAtom(key),
      };
      node_prop["title"] = key.split("|")[1];
      node_prop["related"] = "prop";

      if (nodes_list_prop.length > 1) {
        // if (true) {
        nodes.push(node_prop);
        links.push({
          source: nodes[0],
          target: node_prop,
        });

        nodes_list_prop.forEach((node) => {
          nodes.push(node);
          links.push({
            source: node_prop,
            target: node,
          });
        });
      } else {
        const node = nodes_list_prop[0];
        nodes.push(node);
        links.push({
          source: nodes[0],
          target: node,
        });
      }
    });
    return { nodes: nodes, links: links };
  }

  //Important: graph[0] doit toujours avoir le RootItem!
  async getGraphDataItem(itemID: AtomID, title: string): Promise<IAtom[]> {
    const items_all = await _getRelatedFromWeb(itemID);
    const items = items_all.filter((item) => {
      const filter =
        !item.title_en.includes("Category:") && !item.title_en.includes("Wiki");
      return filter;
    });

    const rootItemList: IAtom[] = await _getItemsFromTitlesFromWeb(title);
    const rootItem = rootItemList[0];

    if (rootItem !== undefined) {
      //add root at the beginning
      items.unshift(rootItem);
    } else {
      console.log("graph broken!");
    }

    return items;
  }
}
