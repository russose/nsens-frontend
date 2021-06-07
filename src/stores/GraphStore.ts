import { action, makeObservable, observable } from "mobx";
import { AtomID, IAtom, IGraph, ILink, INode } from "../config/globals";

export class GraphStore {
  private $rootItemId: AtomID = undefined;
  private $graph: IGraph = { nodes: [], links: [] };
  private $relatedMap = observable.map<string, IAtom[]>();
  // private $relatedMap = observable.map<AtomID, IAtom[]>();

  constructor() {
    makeObservable<GraphStore, "$rootItemId" | "$graph">(this, {
      $rootItemId: observable,
      $graph: observable,
      setRootItemId: action,
      setGraph: action,
      setRelatedMap: action,
      clearRelatedMap: action,
      // setGraph: action,
      // renderGraph: action,
      // runSimulation: action,
      // renderRelatedMap: action,
    });
  }

  get rootItemId() {
    return this.$rootItemId;
  }
  setRootItemId(id: AtomID): void {
    this.$rootItemId = id;
  }

  get graph() {
    return this.$graph;
  }
  setGraph(nodes: INode[], links: ILink[]): void {
    this.$graph = { nodes: nodes, links: links };
  }

  get relatedMap() {
    return this.$relatedMap;
  }
  setRelatedMap(key: string, item: IAtom[]): void {
    this.$relatedMap.set(key, item);
  }

  clearRelatedMap(): void {
    this.$relatedMap.clear();
  }
}
