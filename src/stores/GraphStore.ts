import { action, computed, makeObservable, observable } from "mobx";
import { AtomID, IGraph, ILink, INode } from "../config/globals";
import { makeArrayFlat } from "../libs/utils";
import { RootStore } from "./RootStore";

export interface IRelatedMapFlat {
  keys: string[];
  values: AtomID[];
}

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
      relatedMapFlat: computed,
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

  get relatedMapFlat(): IRelatedMapFlat {
    const keys_: string[] = Array.from(this.relatedMap.keys());
    const valuesList: AtomID[][] = Array.from(this.relatedMap.values());

    const keysList: string[][] = valuesList.map((values, index) => {
      const keys: string[] = values.map((value) => {
        return keys_[index];
      });

      return keys;
    });

    const keysFlat = makeArrayFlat(keysList);
    const valuesFlat = makeArrayFlat(valuesList);

    return { keys: keysFlat, values: valuesFlat };
  }
}
