import { action, computed, makeObservable, observable } from "mobx";
import {
  AtomID,
  IGraph,
  ILink,
  INode,
  IRelatedAtom,
  KnowbookID,
  NodeID,
} from "../config/globals";
import { makeArrayFlat } from "../libs/utils";
import { RootStore } from "./RootStore";

export interface IRelatedMapFlat {
  labels: string[];
  atomIds: AtomID[];
}

export class GraphStore {
  $rootStore: RootStore;
  private $rootNetworkId: NodeID = undefined;
  private $graph: IGraph = { nodes: [], links: [] };

  private $relatedAtoms = observable.map<NodeID, IRelatedAtom[]>();

  private $relatedPublicKnowbooks = observable.map<NodeID, KnowbookID[]>();

  private $networkMap = observable.map<string, NodeID[]>();

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<GraphStore, "$rootNetworkId" | "$graph">(this, {
      $rootNetworkId: observable,
      $graph: observable,
      init: action,
      setRootNetworkId: action,
      setGraph: action,
      setRelatedAtoms: action,
      setRelatedPublicKnowbooks: action,
      clearRelatedAtoms: action,
      clearRelatedPublicKnowbooks: action,
      setNetworkMap: action,
      clearNetworkMap: action,
      relatedMapFlat: computed,
      isRootNetworkItem: computed,
    });
  }

  init() {
    this.clearRelatedAtoms();
    this.clearRelatedPublicKnowbooks();
    this.clearNetworkMap();
  }

  isItem(id: NodeID): boolean {
    //if false, it is a knowbook
    const isKnowbook: boolean = !isNaN(Number(id));
    if (!isKnowbook) {
      //is AtomID
      return true;
    } else {
      //is KnowbookId
      return false;
    }
  }

  get isRootNetworkItem(): boolean {
    return this.isItem(this.$rootNetworkId);
  }

  get rootNetworkId() {
    return this.$rootNetworkId;
  }
  setRootNetworkId(id: NodeID): void {
    this.$rootNetworkId = id;
  }

  get graph() {
    return this.$graph;
  }
  setGraph(nodes: INode[], links: ILink[]): void {
    this.$graph = { nodes: nodes, links: links };
  }

  /**  RelatedAtoms **/
  get relatedAtoms() {
    return this.$relatedAtoms;
  }
  clearRelatedAtoms(): void {
    this.$relatedAtoms.clear();
  }

  setRelatedAtoms(id: NodeID, relatedItems: IRelatedAtom[]) {
    if (
      id === undefined ||
      relatedItems === undefined ||
      relatedItems.length === 0
    ) {
      return;
    }

    this.$relatedAtoms.set(id, relatedItems);
  }

  get relatedPublicKnowbooks() {
    return this.$relatedPublicKnowbooks;
  }

  clearRelatedPublicKnowbooks(): void {
    this.$relatedPublicKnowbooks.clear();
  }

  setRelatedPublicKnowbooks(
    id: NodeID,
    relatedPublicKnowbooksIds: KnowbookID[]
  ) {
    if (
      id === undefined ||
      relatedPublicKnowbooksIds === undefined ||
      relatedPublicKnowbooksIds.length === 0
    ) {
      return;
    }

    this.$relatedPublicKnowbooks.set(id, relatedPublicKnowbooksIds);
  }

  get networkMap() {
    return this.$networkMap;
  }
  setNetworkMap(key: string, items: NodeID[]): void {
    this.$networkMap.set(key, items);
  }

  clearNetworkMap(): void {
    this.$networkMap.clear();
  }

  get relatedMapFlat(): IRelatedMapFlat {
    const keys_: string[] = Array.from(this.networkMap.keys());
    // const valuesList: AtomID[][] = Array.from(this.relatedMap.values());
    const valuesList: NodeID[][] = Array.from(this.networkMap.values());

    const keysList: string[][] = valuesList.map((values, index) => {
      const keys: string[] = values.map((value) => {
        return keys_[index];
      });

      return keys;
    });

    const keysFlat = makeArrayFlat(keysList);
    const valuesFlat = makeArrayFlat(valuesList);

    return { labels: keysFlat, atomIds: valuesFlat };
  }
}
