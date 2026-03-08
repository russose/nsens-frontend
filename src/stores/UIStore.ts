import { action, computed, makeObservable, observable } from "mobx";
import {
  AtomID,
  IAtom,
  IKnowbook,
  initStateCat,
  IparamsAtom,
  ISearchResults,
  KnowbookID,
  TSource,
  TUiBooleanStorage,
  TUiNumberStorage,
  TUiStringStorage,
} from "../config/globals";
import { RootStore } from "./RootStore";

export class UIStore {
  $rootStore: RootStore;

  private $initCompleted = observable.map<initStateCat, boolean>();

  private $selectedAtom: IparamsAtom = { id: "", title: "" };

  private $selectedKnowbook: KnowbookID = -1;

  private $navigationHistory = observable.set<AtomID>();

  private $editKnowbookMembers = observable.map<KnowbookID, boolean>();

  private $uiStringStorage = observable.map<TUiStringStorage, string>();
  private $uiBooleanStorage = observable.map<TUiBooleanStorage, boolean>();

  private $uiNumberStorage = observable.map<TUiNumberStorage, number>();

  private $searchResults: ISearchResults = undefined;

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<UIStore, "$selectedAtom" | "$selectedKnowbook">(this, {
      $selectedAtom: observable,
      $selectedKnowbook: observable,
      init: action,
      initInitCompleted: action,
      setInitCompleted: action,
      initUiStorage: action,
      resetUiBooelean: action,
      setUiStringStorage: action,
      setUiBooleanStorage: action,
      setUiNumberStorage: action,
      setSelectedAtom: action,
      setEditKnowbookMembers: action,
      clearEditKnowbookMembers: action,
      setSelectedKnowbook: action,
      navigationHistoryItems: computed,
    });
  }

  init() {
    this.initUiStorage();
    this.initInitCompleted();
    this.$navigationHistory.clear();
    this.setSearchResults([], [], [], []);
  }

  initInitCompleted(): void {
    this.$initCompleted.set(initStateCat.core, undefined);
    this.$initCompleted.set(initStateCat.userData, undefined);
    this.$initCompleted.set(initStateCat.itemRelated, undefined);
    this.$initCompleted.set(initStateCat.alreadyRendered, undefined);
  }

  initUiStorage(): void {
    const TUiStringStorage_list = Object.values(TUiStringStorage);
    const TUiBooleanStorage_list = Object.values(TUiBooleanStorage);
    const TUiNumberStorage_list = Object.values(TUiNumberStorage);

    for (const key of TUiStringStorage_list) {
      this.$uiStringStorage.set(key, "");
    }
    for (const key of TUiBooleanStorage_list) {
      this.$uiBooleanStorage.set(key, false);
    }
    for (const key of TUiNumberStorage_list) {
      this.$uiNumberStorage.set(key, 0);
    }
  }

  getInitCompleted(key: initStateCat): boolean {
    return this.$initCompleted.get(key);
  }

  setInitCompleted(state: initStateCat, value: boolean): void {
    this.$initCompleted.set(state, value);
  }

  resetUiBooelean(): void {
    const TUiBooleanStorage_list = Object.values(TUiBooleanStorage);
    for (const key of TUiBooleanStorage_list) {
      this.$uiBooleanStorage.set(key, false);
    }
  }

  getUiStringStorage(key: TUiStringStorage) {
    return this.$uiStringStorage.get(key);
  }
  getUiBooleanStorage(key: TUiBooleanStorage) {
    return this.$uiBooleanStorage.get(key);
  }
  getUiNumberStorage(key: TUiNumberStorage) {
    return this.$uiNumberStorage.get(key);
  }

  setUiStringStorage(key: TUiStringStorage, value: string): void {
    this.$uiStringStorage.set(key, value);
  }
  setUiBooleanStorage(key: TUiBooleanStorage, value: boolean): void {
    this.$uiBooleanStorage.set(key, value);
  }
  setUiNumberStorage(key: TUiNumberStorage, value: number): void {
    this.$uiNumberStorage.set(key, value);
  }

  get searchResults() {
    return this.$searchResults;
  }

  setSearchResults(
    wiki: AtomID[],
    books: AtomID[],
    arxiv: AtomID[],
    knowbooks: KnowbookID[]
  ): void {
    this.$searchResults = {
      [TSource.wiki]: wiki,
      [TSource.books]: books,
      [TSource.arxiv]: arxiv,
      knowbooksIds: knowbooks,
    };
  }

  get selectedKnowbook() {
    return this.$selectedKnowbook;
  }

  setSelectedKnowbook(knowbookId: KnowbookID): void {
    this.$selectedKnowbook = knowbookId;
  }

  get selectedAtom() {
    return this.$selectedAtom;
  }
  setSelectedAtom(id: AtomID, title: string): void {
    this.$selectedAtom.id = id;
    this.$selectedAtom.title = title;
    this.$navigationHistory.add(id);
  }

  get navigationHistoryItems(): IAtom[] {
    const itemsId = Array.from(this.$navigationHistory).reverse();
    return this.$rootStore.stores().baseStore.getHistoryItems(itemsId);
  }

  get editKnowbookMembers() {
    return this.$editKnowbookMembers;
  }
  setEditKnowbookMembers(knowbookId: KnowbookID, value: boolean): void {
    this.editKnowbookMembers.set(knowbookId, value);
  }

  clearEditKnowbookMembers(): void {
    this.editKnowbookMembers.clear();
  }
}
