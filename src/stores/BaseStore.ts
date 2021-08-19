import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { configDataDesktop } from "../config/configDataDesktop";
import { configDataMobile } from "../config/configDataMobile";
import { configDataSpecialScreen } from "../config/configDataSpecialScreen";
import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";
import {
  AtomID,
  IGUICONFIG,
  IAtom,
  IparamsPage,
  IRelatedAtom,
  IUser,
  ConfigDisplay,
  initStateCat,
  ConfigLanguage,
  configDataLanguage,
  is_testing_mode,
} from "../config/globals";
import { getCleanImage } from "../libs/fetchBase";
import { newAtom } from "../libs/utils";
import { RootStore } from "./RootStore";

interface IInitState {
  [initStateCat.core]: boolean;
  [initStateCat.staticKnowbooks]: boolean;
  [initStateCat.userData]: boolean;
}

export class BaseStore {
  $rootStore: RootStore;
  private $initCompleted: IInitState = {
    [initStateCat.core]: undefined,
    [initStateCat.staticKnowbooks]: undefined,
    [initStateCat.userData]: undefined,
  };

  private $user: IUser | null = null;

  private $GUI_CONFIG: IGUICONFIG = {
    language: undefined,
    display: undefined,
    currentDisplay: undefined,
  };
  private $paramsPage: IparamsPage = { lang: undefined };

  private $screen: {
    width: number;
    height: number;
  } = undefined;

  private $amountFeedDisplayed: number = 0;
  private $increaseFeedDisplayed: boolean = true;

  private $history = observable.map<AtomID, IAtom>(); //Containing all items content
  private $feed = observable.set<AtomID>();
  private $mostviewed = observable.set<AtomID>();

  private $related = observable.map<AtomID, IRelatedAtom[]>();

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<
      BaseStore,
      | "$user"
      | "$initCompleted"
      | "$amountFeedDisplayed"
      | "$increaseFeedDisplayed"
    >(this, {
      $user: observable,
      $initCompleted: observable,
      $amountFeedDisplayed: observable,
      $increaseFeedDisplayed: observable,
      setInitCompleted: action,
      setUser: action,
      incrementFeedDisplay: action,
      setIncreaseFeedDisplayed: action,
      setHistory: action,
      clearHistory: action,
      setMostviewed: action,
      clearFeed: action,
      setFeed: action,
      setGoodImageInHistoryItem: action,
      setRelated: action,
      clearRelated: action,
      isLogged: computed,
      enableIncreaseFeedDisplay: computed,
      mostviewedItems: computed,
      feedItemsToDisplay: computed,
    });
  }

  get initCompleted(): IInitState {
    return this.$initCompleted;
  }
  setInitCompleted(state: initStateCat, value: boolean): void {
    this.$initCompleted[state] = value;
  }

  get isLogged(): boolean {
    if (
      this.$user === undefined ||
      this.$user === null ||
      this.$user.username === ""
    ) {
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

  get screen() {
    return this.$screen;
  }
  setscreenNoSSR(): void {
    if (process.browser) {
      const screen = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      this.$screen = screen;
    }
  }

  get paramsPage() {
    return this.$paramsPage;
  }

  get GUI_CONFIG() {
    return this.$GUI_CONFIG;
  }

  setGUICONFIGFromDisplay(display: ConfigDisplay) {
    if (display === this.$GUI_CONFIG.currentDisplay) {
      return;
    }

    if (display === ConfigDisplay.mobile) {
      this.$GUI_CONFIG.display = configDataMobile;
    } else if (display === ConfigDisplay.desktop) {
      this.$GUI_CONFIG.display = configDataDesktop;
    } else if (display === ConfigDisplay.large) {
      this.$GUI_CONFIG.display = configDataDesktop;
      this.$GUI_CONFIG.display.atom_sizes.lgColumn =
        configDataSpecialScreen.large.atom_sizes_column;
      this.$GUI_CONFIG.display.knowbook_sizes.lgColumn =
        configDataSpecialScreen.large.knowbook_sizes_column;
    } else if (display === ConfigDisplay.extra) {
      this.$GUI_CONFIG.display = configDataDesktop;
      // GUI_CONFIG__.display.About.features.lgColumn =
      //   configGUISpecialScreen.configDataSpecialScreen.large.landing_features_column;
      this.$GUI_CONFIG.display.atom_sizes.lgColumn =
        configDataSpecialScreen.extra_large.atom_sizes_column;
      this.$GUI_CONFIG.display.knowbook_sizes.lgColumn =
        configDataSpecialScreen.extra_large.knowbook_sizes_column;
    }

    this.$GUI_CONFIG.currentDisplay = display;
  }

  async setParamsPageAndGUICONFIGFromParamsPageData(paramsPage: IparamsPage) {
    if (paramsPage === undefined || paramsPage.lang === undefined) {
      return;
    }
    const lang = paramsPage.lang;
    let configDataLang: configDataLanguage;

    if (lang === ConfigLanguage.fr) {
      const configDataFr = await import("../config/configDataFr");
      configDataLang = configDataFr.configDataFr;
    } else if (lang === ConfigLanguage.it) {
      const configDataIt = await import("../config/configDataIt");
      configDataLang = configDataIt.configDataIt;
    } else if (lang === ConfigLanguage.en) {
      const configDataEn = await import("../config/configDataEn");
      configDataLang = configDataEn.configDataEn;
    }

    this.$GUI_CONFIG.language = configDataLang;

    this.$paramsPage.lang = lang;
  }

  setIncreaseFeedDisplayed(value: boolean): void {
    this.$increaseFeedDisplayed = value;
  }
  incrementFeedDisplay(): void {
    this.$amountFeedDisplayed =
      this.$amountFeedDisplayed + this.$GUI_CONFIG.display.displayFeedIncrement;
  }
  get enableIncreaseFeedDisplay(): boolean {
    let max_displayed_length = this.$feed.size;
    let increment = this.$GUI_CONFIG.display.displayFeedIncrement;

    if (is_testing_mode) {
      max_displayed_length = 2;
      increment = 2;
    }

    const result =
      this.$increaseFeedDisplayed === true &&
      this.$amountFeedDisplayed + increment <= max_displayed_length;

    return result;
  }

  getHistoryItems(ids: AtomID[]): IAtom[] {
    if (ids === undefined || ids.length === 0) {
      return [];
    }
    return ids.map((id) => {
      return this.$history.get(id);
    });
  }

  getHistoryItem(id: AtomID): IAtom {
    return this.getHistoryItems([id])[0];
  }

  setHistory(atoms: IAtom[], forceUpdate = false): void {
    if (atoms === undefined || atoms.length === 0) {
      return;
    }
    atoms.forEach((item) => {
      if (forceUpdate || !this.$history.has(item.id)) {
        this.$history.set(item.id, item);
      }
    });
  }
  clearHistory(): void {
    this.$history.clear();
  }

  get mostviewedItems(): IAtom[] {
    return this.getHistoryItems(Array.from(this.$mostviewed));
  }
  setMostviewed(atoms: IAtom[]): void {
    if (atoms === undefined || atoms.length === 0) {
      return;
    }
    // this.$mostviewed.clear();  //Don't clear here, if needed, create separate method
    atoms.forEach((item) => this.$mostviewed.add(item.id));
    this.setHistory(atoms);
  }

  clearFeed(): void {
    this.$feed.clear();
  }
  setFeed(atoms: IAtom[]): void {
    if (atoms === undefined || atoms.length === 0) {
      return;
    }

    atoms.forEach((item) => {
      this.$feed.add(item.id);
    });

    this.$amountFeedDisplayed = 0;
    this.setHistory(atoms);
  }

  async setGoodImageInHistoryItem(id: AtomID): Promise<void> {
    const lang = this.$paramsPage.lang;
    const item = this.getHistoryItem(id);
    if (item.image_url === "") {
      let item_copy_non_observable: IAtom = newAtom(undefined, undefined, item);

      item_copy_non_observable = await getCleanImage(
        item_copy_non_observable,
        ROOT_URL_WIKIPEDIA_REST(lang),
        ROOT_URL_WIKIPEDIA_ACTION(lang),
        lang
      );

      // this.setHistory([item_deep_copy], true); //Not working, crash Firefox...
      runInAction(() => {
        item.image_url = item_copy_non_observable.image_url;
      });
    }
  }

  get feedItemsToDisplay(): IAtom[] {
    // const itemsId = this.feed.slice(0, stores.baseStore.amountFeedDisplayed);
    const itemsId = Array.from(this.$feed).slice(0, this.$amountFeedDisplayed);

    for (const id of itemsId) {
      this.setGoodImageInHistoryItem(id);
    }

    return this.getHistoryItems(itemsId);
  }

  get related() {
    return this.$related;
  }
  clearRelated(): void {
    this.$related.clear();
    // this.$relatedAll.clear();
    // this.$relatedAll = [];
  }
  getRelated(itemId: AtomID): IRelatedAtom[] {
    if (itemId === undefined) {
      return [];
    }
    return this.$related.get(itemId);
  }
  setRelated(
    id: AtomID,
    relatedItems: IRelatedAtom[]
    // ignoreRealatedAll = false //To avoid that items used in feed for example for StaticKnowbooks
  ) {
    if (
      id === undefined ||
      relatedItems === undefined ||
      relatedItems.length === 0
    ) {
      return;
    }
    this.$related.set(id, relatedItems);
    // if (!ignoreRealatedAll) {
    //   this.$relatedAll.push(id);
    // }
    const items: IAtom[] = relatedItems.map((relatedItem) => {
      return relatedItem.item;
    });
    this.setHistory(items);
  }

  getRelatedItems(itemId: AtomID): IAtom[] {
    if (itemId === undefined) {
      return [];
    }
    const relatedAtoms: IRelatedAtom[] = this.$related.get(itemId);
    if (relatedAtoms === undefined) {
      return [];
    }
    const related_items: IAtom[] = relatedAtoms.map((atom) => {
      return atom.item;
    });

    //No duplicates since they are removed in fetchRelated
    return related_items;
  }
}
