import { KnowkookStore } from "./KnowkookStore";
import { observable, action, makeObservable } from "mobx";
import { AtomID, KnowbookID } from "../common/types";

export interface IparamsAtom {
  id: AtomID;
  title: string;
}

export class UIStore {
  private $searchPattern: string = "";
  private $selectedAtom: IparamsAtom = { id: "", title: "" };
  private $articleContent: string = "";

  private $editKnowbookOpened: boolean = false;
  private $editKnowbookNewValue: string = "";
  private $editKnowbookMembers = observable.map<KnowbookID, boolean>();

  private $selectedKnowbookIdName: KnowbookID = "";
  private $renameKnowbookOpened: boolean = false;
  private $renameKnowbookNewName: string = "";

  private $loginScreenUsername: string = "";
  private $loginScreenUsername_: string = "";
  private $loginScreenPassword: string = "";
  private $loginScreenError: string = "";

  private $showLoading: boolean = false;

  constructor() {
    makeObservable<
      UIStore,
      // | "$screen"
      | "$searchPattern"
      | "$selectedAtom"
      | "$articleContent"
      | "$editKnowbookOpened"
      | "$editKnowbookNewValue"
      | "$selectedKnowbookIdName"
      | "$renameKnowbookOpened"
      | "$renameKnowbookNewName"
      | "$loginScreenUsername"
      | "$loginScreenUsername_"
      | "$loginScreenPassword"
      | "$loginScreenError"
      | "$showLoading"
    >(this, {
      // $screen: observable,
      $searchPattern: observable,
      $selectedAtom: observable,
      $articleContent: observable,
      $editKnowbookOpened: observable,
      $editKnowbookNewValue: observable,
      $loginScreenUsername: observable,
      $loginScreenUsername_: observable,
      $loginScreenPassword: observable,
      $loginScreenError: observable,
      $selectedKnowbookIdName: observable,
      $renameKnowbookOpened: observable,
      $renameKnowbookNewName: observable,
      $showLoading: observable,
      // searchPattern: computed,
      // setScreen: action,
      setSearchPattern: action,
      setSelectedAtom: action,
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
      setLoginScreenUsername_: action,
      // loginScreenPassword: computed,
      setLoginScreenPassword: action,
      setLoginScreenError: action,
      initKnowbookEditionElements: action,
      setShowLoading: action,
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

  get searchPattern() {
    return this.$searchPattern;
  }
  setSearchPattern(searchPattern: string): void {
    this.$searchPattern = searchPattern;
  }
  get selectedAtom() {
    return this.$selectedAtom;
  }
  setSelectedAtom(id: AtomID, title: string): void {
    this.$selectedAtom.id = id;
    this.$selectedAtom.title = title;
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

  get loginScreenError() {
    return this.$loginScreenError;
  }
  setLoginScreenError(value: string): void {
    this.$loginScreenError = value;
  }
  get loginScreenPassword() {
    return this.$loginScreenPassword;
  }
  setLoginScreenPassword(value: string): void {
    this.$loginScreenPassword = value;
  }
  get loginScreenUsername() {
    return this.$loginScreenUsername;
  }
  setLoginScreenUsername(value: string): void {
    this.$loginScreenUsername = value;
  }
  get loginScreenUsername_() {
    return this.$loginScreenUsername_;
  }
  setLoginScreenUsername_(value: string): void {
    this.$loginScreenUsername_ = value;
  }
  get showLoading() {
    return this.$showLoading;
  }
  setShowLoading(show: boolean): void {
    this.$showLoading = show;
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
}
