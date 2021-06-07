import { action, computed, makeObservable, observable } from "mobx";
import {
  AtomID,
  IGUICONFIG,
  IAtom,
  IparamsPage,
  IRelatedAtom,
  IUser,
} from "../config/globals";

export class BaseStore {
  //username="": the user not logged - username=null: App not initialyzed
  private $user: IUser | null = null;

  private $GUI_CONFIG: IGUICONFIG = undefined;
  private $paramsPage: IparamsPage = { lang: undefined, display: undefined };

  private $screen: {
    width: number;
    height: number;
  } = this.setscreenNoSSR();

  private $feed = observable.map<AtomID, IAtom>();
  private $mostviewed = observable.map<AtomID, IAtom>();
  private $history = observable.map<AtomID, IAtom>();

  private $related = observable.map<AtomID, IRelatedAtom[]>();
  private $relatedAll = observable.map<AtomID, IAtom>();

  constructor() {
    makeObservable<BaseStore, "$user">(this, {
      setFeed: action,
      setMostviewed: action,
      setHistory: action,
      $user: observable,
      isLogged: computed,
      setUser: action,
      setRelated: action,
      setRelatedAll: action,
    });
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

  setParamsPageFromGUICONFIG(GUI_CONFIG: IGUICONFIG) {
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
