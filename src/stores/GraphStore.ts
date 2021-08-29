import { action, makeObservable, observable } from "mobx";
import { AtomID, IGraph, ILink, INode } from "../config/globals";
import { RootStore } from "./RootStore";

export class GraphStore {
  $rootStore: RootStore;
  private $rootItemId: AtomID = undefined;
  private $graph: IGraph = { nodes: [], links: [] };
  private $relatedMap = observable.map<string, AtomID[]>();

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<GraphStore, "$rootItemId" | "$graph">(this, {
      $rootItemId: observable,
      $graph: observable,
      setRootItemId: action,
      setGraph: action,
      setRelatedMap: action,
      clearRelatedMap: action,
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
  setRelatedMap(key: string, item: AtomID[]): void {
    this.$relatedMap.set(key, item);
  }

  clearRelatedMap(): void {
    this.$relatedMap.clear();
  }
}
