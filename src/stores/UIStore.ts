import { KnowkookStore } from "./KnowkookStore";
import { observable, action, makeObservable } from "mobx";
import { AtomID, KnowbookID } from "../common/types";
import { GUI_CONFIG } from "../common/config";
import { hasTouchScreen } from "../libs/utils";

export enum IItemDisplayMode {
  Article = "Article",
  Network = "Network",
}

type IScreen = {
  width: number;
  height: number;
  isMobile: boolean;
};

const max_width_mobile = GUI_CONFIG.general.max_width_mobile;

export class UIStore {
  private $screen: IScreen = { width: 0, height: 0, isMobile: true };

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
      | "$screen"
      | "$searchPattern"
      | "$selectedAtomId"
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
      $screen: observable,
      $searchPattern: observable,
      $selectedAtomId: observable,
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
      setScreen: action,
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

  get screen() {
    return this.$screen;
  }
  setScreen() {
    let width;
    let height;
    let isMobile;
    if (process.browser) {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = hasTouchScreen(window);
    }

    // const isMobile = width < max_width_mobile;

    if (
      width !== undefined &&
      height !== undefined &&
      (width !== this.$screen.width ||
        height !== this.$screen.height ||
        isMobile !== this.$screen.isMobile)
    ) {
      this.$screen = {
        width: width,
        height: height,
        isMobile: isMobile,
      };
      // console.log(window.innerWidth, window.innerHeight);
      // console.log(isMobile);
    }
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
