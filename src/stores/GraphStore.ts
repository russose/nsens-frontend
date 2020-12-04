import { observable, action, computed, makeObservable } from "mobx";
import { IAtom, AtomID, IGraph, ILink, INode, newAtom } from "../common/types";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
} from "d3-force";
import {
  _getItemsFromTitlesFromWeb,
  _getRelatedFromWikidataFromWeb,
  _getRelatedFromWikipediaFromWeb,
} from "../_api";

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
    const forceColiideRadius = width_node * 1.0;
    const forceLinkDistance = width_node * 1.0;
    const forceIterations = 10;
    const forceAlphaMin = 0.001; //0.001 working well

    this.getGraphDataItem(itemID, title)
      .then(
        action((items: IAtom[]) => {
          if (items === undefined) {
            return;
          }
          const graph = this.buildGraphItemWithGroup(
            items,
            width / 2,
            height / 2
          );
          this.setGraph(graph);

          const nodes = graph.nodes;
          const links = graph.links;

          let self = this;
          const simulation = forceSimulation(nodes)
            .force("center", forceCenter(width / 2, height / 2).strength(0.8))
            .force(
              "collision",
              forceCollide()
                .radius(forceColiideRadius)
                .iterations(forceIterations)
            )
            // .force("charge", forceManyBody().strength(-50))
            .force(
              "link",
              forceLink(links)
                .distance(forceLinkDistance)
                .strength(0.7)
                .iterations(forceIterations)
            )
            .on("tick", function () {
              self.setGraph({ nodes: nodes, links: links });
            })
            .alphaMin(forceAlphaMin) //To converge quickly, default is 0.001
            // .alphaDecay(0.08);
            .alphaDecay(0.05);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  //Important: graph[0] doit toujours avoir le RootItem!
  async getGraphDataItem(itemID: AtomID, title: string): Promise<IAtom[]> {
    const items_wikipedia: IAtom[] = await _getRelatedFromWikipediaFromWeb(
      itemID,
      title
    );
    const items_wikidata: IAtom[] = await _getRelatedFromWikidataFromWeb(
      itemID
    );

    const items = items_wikidata.concat(items_wikipedia);

    // const items = items_all.filter((item) => {
    //   const filter =
    //     !item.title_en.includes("Category:") && !item.title_en.includes("Wiki");
    //   return filter;
    // });

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

  buildGraphItemSimple(items: IAtom[], x0: number, y0: number): IGraph {
    const nodes: INode[] = items.map((item) => {
      return {
        x: x0,
        y: y0,
        ...item,
      };
    });
    const links: ILink[] = [];

    //nodes.slice(1) exclude the first item which is the node_root
    nodes.slice(1).forEach((node_item) => {
      links.push({
        source: nodes[0],
        target: node_item,
      });
    });

    return { nodes: nodes, links: links };
  }

  buildGraphItemWithGroup(items: IAtom[], x0: number, y0: number): IGraph {
    const graph_map = new Map<string, INode[]>();
    const items_INode: INode[] = items.map((item) => {
      return {
        x: x0,
        y: y0,
        ...item,
      };
    });
    const node_root = items_INode[0];

    //nodes.slice(1) exclude the first item which is the node_root
    items_INode.slice(1).forEach((node) => {
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

    graph_map.forEach((nodes_list_prop, key) => {
      //NodeGroup Element
      const node_prop: INode = {
        x: 0,
        y: 0,
        ...newAtom(key),
      };
      node_prop["title"] = key.split("|")[1];
      node_prop["related"] = "group_prop";

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
}
