import { KnowkookStore } from "./KnowkookStore";
import { observable, action, makeObservable } from "mobx";
import { AtomID, KnowbookID } from "../common/types";
import { DataStore } from "./DataStore";
import { _getRelated } from "../_api";

export enum IItemDisplayMode {
  Article = "Article",
  Network = "Network",
}

export class UIStore {
  private $searchPattern: string = "";
  private $selectedAtomId: AtomID = "";
  private $articleContent: string = "";
  private $itemDisplayMode: "Article" | "Network" = IItemDisplayMode.Article;

  private $editKnowbookOpened: boolean = false;
  private $editKnowbookNewValue: string = "";
  private $editKnowbookMembers = observable.map<KnowbookID, boolean>();

  private $selectedKnowbookIdName: KnowbookID = "";
  private $renameKnowbookOpened: boolean = false;
  private $renameKnowbookNewName: string = "";

  private $loginScreenUsername: string = "";
  private $loginScreenPassword: string = "";

  constructor() {
    makeObservable<
      UIStore,
      | "$searchPattern"
      | "$articleContent"
      | "$itemDisplayMode"
      | "$editKnowbookOpened"
      | "$editKnowbookNewValue"
      | "$selectedKnowbookIdName"
      | "$renameKnowbookOpened"
      | "$renameKnowbookNewName"
      | "$loginScreenUsername"
      | "$loginScreenPassword"
    >(this, {
      $searchPattern: observable,
      $articleContent: observable,
      $itemDisplayMode: observable,
      setItemDisplayMode: action,
      $editKnowbookOpened: observable,
      $editKnowbookNewValue: observable,
      $loginScreenUsername: observable,
      $loginScreenPassword: observable,
      $selectedKnowbookIdName: observable,
      $renameKnowbookOpened: observable,
      $renameKnowbookNewName: observable,
      // searchPattern: computed,
      setSearchPattern: action,
      // selectedAtomId: computed,
      setSelectedAtomId: action,
      // articleContent: computed,
      setArticleContent: action,
      // editKnowbookOpened: computed,
      setEditKnowbookOpened: action,
      // editKnowbookNewValue: computed,
      setEditKnowbookNewValue: action,
      // editKnowbookMembers: computed,
      setEditKnowbookMembers: action,
      // renameKnowbookOpened: computed,
      setSelectedKnowbookIdName: action,
      setRenameKnowbookOpened: action,
      // renameKnowbookNewName: computed,
      setRenameKnowbookNewName: action,
      // loginScreenUsername: computed,
      setLoginScreenUsername: action,
      // loginScreenPassword: computed,
      setLoginScreenPassword: action,
      initKnowbookEditionElements: action,
    });
  }

  get selectedKnowbookIdName() {
    return this.$selectedKnowbookIdName;
  }
  setSelectedKnowbookIdName(knowbookId: KnowbookID): void {
    this.$selectedKnowbookIdName = knowbookId;
  }

  get renameKnowbookOpened() {
    return this.$renameKnowbookOpened;
  }
  setRenameKnowbookOpened(state: boolean): void {
    this.$renameKnowbookOpened = state;
  }

  get renameKnowbookNewName() {
    return this.$renameKnowbookNewName;
  }
  setRenameKnowbookNewName(value: string): void {
    this.$renameKnowbookNewName = value;
  }

  get itemDisplayMode() {
    return this.$itemDisplayMode;
  }
  setItemDisplayMode(mode: IItemDisplayMode): void {
    this.$itemDisplayMode = mode;
  }
  get searchPattern() {
    return this.$searchPattern;
  }
  setSearchPattern(searchPattern: string): void {
    this.$searchPattern = searchPattern;
  }
  get selectedAtomId() {
    return this.$selectedAtomId;
  }
  setSelectedAtomId(id: AtomID): void {
    this.$selectedAtomId = id;
  }
  get articleContent() {
    return this.$articleContent;
  }
  setArticleContent(article: string): void {
    this.$articleContent = article;
  }
  get editKnowbookOpened() {
    return this.$editKnowbookOpened;
  }
  setEditKnowbookOpened(state: boolean): void {
    this.$editKnowbookOpened = state;
  }
  get editKnowbookNewValue() {
    return this.$editKnowbookNewValue;
  }
  setEditKnowbookNewValue(value: string): void {
    this.$editKnowbookNewValue = value;
  }
  get editKnowbookMembers() {
    return this.$editKnowbookMembers;
  }
  setEditKnowbookMembers(knowbookId: KnowbookID, value: boolean): void {
    this.editKnowbookMembers.set(knowbookId, value);
  }

  get loginScreenUsername() {
    return this.$loginScreenUsername;
  }
  setLoginScreenUsername(value: string): void {
    this.$loginScreenUsername = value;
  }
  get loginScreenPassword() {
    return this.$loginScreenPassword;
  }
  setLoginScreenPassword(value: string): void {
    this.$loginScreenPassword = value;
  }

  /******************************************************* */
  initKnowbookEditionElements(
    atomID: AtomID,
    knowbookStore: KnowkookStore
  ): void {
    this.$editKnowbookNewValue = "";
    this.editKnowbookMembers.clear();

    const knowbook_id_list = Array.from(knowbookStore.knowbooks.keys());
    knowbook_id_list.forEach((knowbookId) => {
      this.editKnowbookMembers.set(
        knowbookId,
        knowbookStore.isItemInKnowbook(atomID, knowbookId)
      );
    });
  }

  // @computed
  // get spinnerState() {
  //   return this.$spinnerState;
  // }

  // @action
  // setSpinnerState(state: boolean): void {
  //   this.$spinnerState = state;
  // }
}
