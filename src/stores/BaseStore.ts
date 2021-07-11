import { action, computed, makeObservable, observable } from "mobx";
import { configDataFr } from "../config/configDataFr";
import {
  AtomID,
  IGUICONFIG,
  IAtom,
  IparamsPage,
  IRelatedAtom,
  IUser,
  ConfigDisplay,
  initStateCat,
} from "../config/globals";

interface IInitState {
  [initStateCat.app]: boolean;
  [initStateCat.feed]: boolean;
  [initStateCat.staticKnowbooks]: boolean;
  [initStateCat.knowbooks]: boolean;
  [initStateCat.saved]: boolean;
}

export class BaseStore {
  private $initCompleted: IInitState = {
    app: undefined,
    feed: undefined,
    staticKnowbooks: undefined,
    knowbooks: undefined,
    saved: undefined,
  };

  //username="": the user not logged - username=null: App not initialyzed
  private $user: IUser | null = null;

  private $GUI_CONFIG: IGUICONFIG = undefined;
  private $paramsPage: IparamsPage = { lang: undefined, display: undefined };

  private $screen: {
    width: number;
    height: number;
  } = undefined;

  private $feed = observable.map<AtomID, IAtom>();
  private $mostviewed = observable.map<AtomID, IAtom>();
  private $history = observable.map<AtomID, IAtom>();

  private $related = observable.map<AtomID, IRelatedAtom[]>();
  private $relatedAll = observable.map<AtomID, IAtom>();

  constructor() {
    makeObservable<BaseStore, "$user" | "$initCompleted">(this, {
      $user: observable,
      // $GUI_CONFIG: observable,
      $initCompleted: observable,
      clearRelatedAndRelatedAll: action,
      setInitCompleted: action,
      setFeed: action,
      setMostviewed: action,
      setHistory: action,
      isLogged: computed,
      setUser: action,
      setRelated: action,
      setRelatedAll: action,
      setParamsPageAndGUICONFIGFromParamsPageData: action,
    });
  }

  clearRelatedAndRelatedAll(): void {
    this.$related.clear();
    this.$relatedAll.clear();
  }

  get initCompleted(): IInitState {
    return this.$initCompleted;
  }
  setInitCompleted(state: initStateCat, value: boolean): void {
    this.$initCompleted[state] = value;
  }

  get isLogged(): boolean {
    if (
      this.user === undefined ||
      this.user === null ||
      this.user.username === ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  async setParamsPageAndGUICONFIGFromParamsPageData(paramsPage: IparamsPage) {
    if (paramsPage === undefined) {
      return;
    }

    const lang = paramsPage.lang;
    const display = paramsPage.display;
    const id = lang + "_" + display;

    // if (
    //   this.GUI_CONFIG === undefined ||
    //   this.GUI_CONFIG.id === undefined ||
    //   // GUI_CONFIG.id !== this.GUI_CONFIG.id
    //   id !== this.GUI_CONFIG.id
    // ) {
    let GUI_CONFIG_: IGUICONFIG;

    // if (params === undefined) {
    //   const configGUIMobile = await import("../config/configDataMobile");
    //   GUI_CONFIG = {
    //     id: id,
    //     language: configDataFr,
    //     display: configGUIMobile.configDataMobile,
    //   };
    // }
    if (display === ConfigDisplay.mobile) {
      const configGUIMobile = await import("../config/configDataMobile");
      GUI_CONFIG_ = {
        id: id,
        language: configDataFr,
        display: configGUIMobile.configDataMobile,
      };
    } else if (display === ConfigDisplay.desktop) {
      const configGUIDesktop = await import("../config/configDataDesktop");
      GUI_CONFIG_ = {
        id: id,
        language: configDataFr,
        display: configGUIDesktop.configDataDesktop,
      };
    } else if (display === ConfigDisplay.large) {
      const configGUIDesktop = await import("../config/configDataDesktop");
      const configGUISpecialScreen = await import(
        "../config/configDataSpecialScreen"
      );
      GUI_CONFIG_ = {
        id: id,
        language: configDataFr,
        display: configGUIDesktop.configDataDesktop,
      };
      // GUI_CONFIG__.display.About.features.lgColumn =
      //   configGUISpecialScreen.configDataSpecialScreen.large.landing_features_column;
      GUI_CONFIG_.display.atom_sizes.lgColumn =
        configGUISpecialScreen.configDataSpecialScreen.large.atom_sizes_column;
      GUI_CONFIG_.display.knowbook_sizes.lgColumn =
        configGUISpecialScreen.configDataSpecialScreen.large.knowbook_sizes_column;
    } else if (display === ConfigDisplay.extra) {
      const configGUIDesktop = await import("../config/configDataDesktop");
      const configGUISpecialScreen = await import(
        "../config/configDataSpecialScreen"
      );
      GUI_CONFIG_ = {
        id: id,
        language: configDataFr,
        display: configGUIDesktop.configDataDesktop,
      };
      // GUI_CONFIG__.display.About.features.lgColumn =
      //   configGUISpecialScreen.configDataSpecialScreen.large.landing_features_column;
      GUI_CONFIG_.display.atom_sizes.lgColumn =
        configGUISpecialScreen.configDataSpecialScreen.extra_large.atom_sizes_column;
      GUI_CONFIG_.display.knowbook_sizes.lgColumn =
        configGUISpecialScreen.configDataSpecialScreen.extra_large.knowbook_sizes_column;
    }

    // this.$GUI_CONFIG = GUI_CONFIG_;
    // runInAction(() => {
    this.$GUI_CONFIG = GUI_CONFIG_;
    // });

    // if (GUI_CONFIG.id !== undefined) {
    //   const paramsPage: any[] = GUI_CONFIG.id.split("_");
    //   this.$paramsPage.lang = paramsPage[0];
    //   this.$paramsPage.display = paramsPage[1];
    // }
    if (id !== undefined) {
      // const paramsPage: any[] = GUI_CONFIG.id.split("_");
      this.$paramsPage.lang = lang;
      this.$paramsPage.display = display;
    }
    // }
  }

  // setParamsPageFromGUICONFIG(GUI_CONFIG: IGUICONFIG) {
  //   if (GUI_CONFIG === undefined) {
  //     return;
  //   }

  //   if (
  //     this.GUI_CONFIG === undefined ||
  //     this.GUI_CONFIG.id === undefined ||
  //     GUI_CONFIG.id !== this.GUI_CONFIG.id
  //   ) {
  //     this.$GUI_CONFIG = GUI_CONFIG;
  //     if (GUI_CONFIG.id !== undefined) {
  //       const paramsPage: any[] = GUI_CONFIG.id.split("_");
  //       this.$paramsPage.lang = paramsPage[0];
  //       this.$paramsPage.display = paramsPage[1];
  //     }
  //   }
  // }

  setscreenNoSSR(): void {
    if (process.browser) {
      const screen = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      this.$screen = screen;
      // return screen;
    }
    // else {
    //   return undefined;
    // }
  }

  get user() {
    return this.$user;
  }
  setUser(user: IUser): void {
    this.$user = user;
  }

  get screen() {
    return this.$screen;
  }

  get paramsPage() {
    return this.$paramsPage;
  }

  get GUI_CONFIG() {
    return this.$GUI_CONFIG;
  }

  get mostviewed() {
    return this.$mostviewed;
  }
  setMostviewed(atoms: IAtom[]): void {
    if (atoms === undefined || atoms.length === 0) {
      return;
    }
    this.$mostviewed.clear();
    atoms.forEach((item) => this.$mostviewed.set(item.id, item));
  }

  get feed() {
    return this.$feed;
  }
  setFeed(atoms: IAtom[]): void {
    if (atoms === undefined || atoms.length === 0) {
      return;
    }
    this.$feed.clear();
    atoms.forEach((item) => {
      this.$feed.set(item.id, item);
    });
    this.setHistory(atoms);
  }

  get history() {
    return this.$history;
  }
  setHistory(atoms: IAtom[]): void {
    if (atoms === undefined || atoms.length === 0) {
      return;
    }
    atoms.forEach((item) => {
      if (!this.$history.has(item.id)) {
        this.$history.set(item.id, item);
      }
    });
  }

  get related() {
    return this.$related;
  }
  setRelated(key: AtomID, item: IRelatedAtom[]) {
    if (key === undefined || item === undefined || item.length === 0) {
      return;
    }
    this.$related.set(key, item);
  }

  get relatedAll() {
    return this.$relatedAll;
  }
  setRelatedAll(key: AtomID, item: IAtom) {
    this.$relatedAll.set(key, item);
  }

  getFeedList(): IAtom[] {
    return Array.from(this.feed.values());
  }

  getAllRelatedItems(): IAtom[] {
    return Array.from(this.relatedAll.values());
  }

  getRelated(itemId: AtomID): IRelatedAtom[] {
    if (itemId === undefined) {
      return [];
    }
    return this.$related.get(itemId);
  }
  getRelatedItems(itemId: AtomID): IAtom[] {
    if (itemId === undefined) {
      return [];
    }
    const related: IRelatedAtom[] = this.$related.get(itemId);
    if (related === undefined) {
      return [];
    }
    const related_items: IAtom[] = related.map((item) => {
      return item.item;
    });
    //No duplicates since they are removed in fetchRelated
    return related_items;
  }
}
