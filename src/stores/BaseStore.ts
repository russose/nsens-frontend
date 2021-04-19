import { action, computed, makeObservable, observable } from "mobx";
import {
  api_issue_text,
  AtomID,
  GUI_CONFIG_T,
  IAtom,
  IparamsPage,
  IRelatedAtom,
  IUser,
} from "../config/globals";
import { _randomFromWeb, _searchFromWeb } from "../libs/_apiItems";

export class BaseStore {
  private $feed = observable.map<AtomID, IAtom>();
  private $history = observable.map<AtomID, IAtom>();

  private $related = observable.map<AtomID, IRelatedAtom[]>();
  private $relatedAll = observable.map<AtomID, IAtom>();

  //when username="", it means the user is not logged!
  //When username=null, it means the App is not initialyzed
  private $user: IUser | null = null;
  private $GUI_CONFIG: GUI_CONFIG_T = undefined;
  private $rootPath = "/[lang]/[display]";
  private $paramsPage: IparamsPage = { lang: undefined, display: undefined };
  private $screen: {
    width: number;
    height: number;
  } = this.setscreenNoSSR();
  configGeneral: any;

  constructor() {
    makeObservable<BaseStore, "$user">(this, {
      setFeed: action,
      setHistory: action,
      $user: observable,
      isLogged: computed,
      setUser: action,
      // initialyzeRelatedAndRelatedAllFromSaved: action,
      // addAllRelatedItemsInAllRelated: action,
      // fetchRelated: action,
    });
  }

  get screen() {
    return this.$screen;
  }

  get isLogged(): boolean {
    if (this.user === undefined || this.user === null) {
      return false;
    }
    if (this.user.username === "" || this.$user.username === api_issue_text) {
      return false;
    } else {
      return true;
    }
  }

  get user() {
    return this.$user;
  }

  setUser(user: IUser): void {
    this.$user = user;
  }

  get rootPath() {
    return this.$rootPath;
  }

  get paramsPage() {
    return this.$paramsPage;
  }

  get GUI_CONFIG() {
    return this.$GUI_CONFIG;
  }

  setscreenNoSSR(): {
    width: number;
    height: number;
  } {
    if (process.browser) {
      const screen = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      return screen;
    } else {
      return undefined;
    }
  }

  set_ParamsPage_GUI_CONFIG(GUI_CONFIG: GUI_CONFIG_T) {
    if (GUI_CONFIG === undefined) {
      return;
    }

    if (
      this.GUI_CONFIG === undefined ||
      this.GUI_CONFIG.id === undefined ||
      GUI_CONFIG.id !== this.GUI_CONFIG.id
    ) {
      this.$GUI_CONFIG = GUI_CONFIG;
      if (GUI_CONFIG.id !== undefined) {
        const paramsPage: any[] = GUI_CONFIG.id.split("_");
        this.$paramsPage.lang = paramsPage[0];
        this.$paramsPage.display = paramsPage[1];
      }
    }
  }

  setFeed(feed: IAtom[]): void {
    if (feed === undefined) {
      return;
    }
    this.$feed.clear();
    feed.forEach((item) => this.$feed.set(item.id, item));
    this.setHistory(feed);
  }

  setHistory(atoms: IAtom[]): void {
    if (atoms === undefined) {
      return;
    }
    atoms.forEach((item) => {
      if (!this.$history.has(item.id)) {
        this.$history.set(item.id, item);
      }
    });
  }

  get feed() {
    return this.$feed;
  }
  get history() {
    return this.$history;
  }

  get related() {
    return this.$related;
  }

  get relatedAll() {
    return this.$relatedAll;
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
