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
  AtomID,
  IGUICONFIG,
  IAtom,
  IparamsPage,
  IRelatedAtom,
  IUser,
  TDisplay,
  initStateCat,
  Tlanguage,
  TconfigDataLanguage,
  IRelatedAtomFull,
  IDate,
  configGeneral,
  IPosition,
  configPaths,
  IStar,
} from "../config/globals";
import { api_getCleanImageFromWeb_blocking } from "../libs/apiItems";
import { entierAleatoire, newAtom, range } from "../libs/utils";
import { RootStore } from "./RootStore";

interface IInitState {
  [initStateCat.core]: boolean;
  [initStateCat.staticKnowbooksFull]: boolean;
  [initStateCat.userData]: boolean;
  [initStateCat.itemRelated]: boolean;
}

export class BaseStore {
  $rootStore: RootStore;
  private $initCompleted: IInitState = {
    [initStateCat.core]: undefined,
    [initStateCat.staticKnowbooksFull]: undefined,
    [initStateCat.userData]: undefined,
    [initStateCat.itemRelated]: undefined,
  };

  private $user: IUser | null = null;

  private $GUI_CONFIG: IGUICONFIG = {
    language: undefined,
    display: undefined,
  };

  private $currentDisplay: TDisplay = undefined;

  private $paramsPage: IparamsPage = { lang: undefined };

  private $screen: {
    width: number;
    height: number;
    center: IPosition;
  } = undefined;

  private $amountFeedDisplayed: number = 0;
  private $increaseFeedDisplayed: boolean = true;

  private $history = observable.map<AtomID, IAtom>(); //Containing all items content
  private $feed = observable.set<AtomID>();
  private $mostviewed = observable.set<AtomID>();
  private $dateLastMostviewed: IDate;

  private $related = observable.map<AtomID, IRelatedAtom[]>();

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<
      BaseStore,
      | "$user"
      | "$initCompleted"
      | "$amountFeedDisplayed"
      | "$increaseFeedDisplayed"
      | "$screen"
      | "$currentDisplay"
    >(this, {
      $user: observable,
      $initCompleted: observable,
      $amountFeedDisplayed: observable,
      $increaseFeedDisplayed: observable,
      $screen: observable,
      $currentDisplay: observable,
      init: action,
      setInitCompleted: action,
      setUser: action,
      initAmountFeedDisplayed: action,
      incrementAmountFeedDisplayed: action,
      setIncreaseFeedDisplayed: action,
      setHistory: action,
      clearHistory: action,
      setMostviewed: action,
      clearMostviewed: action,
      clearFeed: action,
      setFeed: action,
      setGoodImageInHistoryItem: action,
      setRelated: action,
      clearRelated: action,
      setscreenNoSSR: action,
      isLogged: computed,
      feedItemsToDisplay: computed,
      mostviewedIds: computed,
      stars: computed,
    });
  }

  init() {
    this.initDateLastMostviewed();
    this.clearHistory();
    this.clearFeed();
    this.clearMostviewed();
    this.clearRelated();
  }

  get stars(): IStar[] {
    const width = this.screen.width;
    const height = this.screen.height;
    const density_stars = 0.0005;
    const amount = Math.floor(width * height * density_stars);

    const stars: IStar[] = range(amount).map((ind) => {
      return {
        position: {
          x: entierAleatoire(0, width),
          y: entierAleatoire(0, height),
        },
        opacity: entierAleatoire(3, 10) / 10,
      };
    });

    return stars;
  }

  /**  General **/
  get initCompleted(): IInitState {
    return this.$initCompleted;
  }
  get currentDisplay(): TDisplay {
    return this.$currentDisplay;
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
    // if (process.browser) {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const screen = {
        width: width,
        height: height,
        center: { x: width / 2, y: height / 2 },
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

  setGUICONFIGFromDisplay(display: TDisplay) {
    if (display === this.currentDisplay) {
      return;
    }

    if (display === TDisplay.mobile) {
      this.$GUI_CONFIG.display = configDataMobile;
    } else if (display === TDisplay.desktop) {
      this.$GUI_CONFIG.display = configDataDesktop;
    } else if (display === TDisplay.large) {
      this.$GUI_CONFIG.display = configDataDesktop;
      this.$GUI_CONFIG.display.atom_sizes.lgColumn =
        configDataSpecialScreen.large.atom_sizes_column;
      // this.$GUI_CONFIG.display.knowbook_sizes.lgColumn =
      //   configDataSpecialScreen.large.knowbook_sizes_column;
    } else if (display === TDisplay.extra) {
      this.$GUI_CONFIG.display = configDataDesktop;
      // GUI_CONFIG__.display.About.features.lgColumn =
      //   configGUISpecialScreen.configDataSpecialScreen.large.landing_features_column;
      this.$GUI_CONFIG.display.atom_sizes.lgColumn =
        configDataSpecialScreen.extra_large.atom_sizes_column;
      // this.$GUI_CONFIG.display.knowbook_sizes.lgColumn =
      //   configDataSpecialScreen.extra_large.knowbook_sizes_column;
    }

    // this.$GUI_CONFIG.currentDisplay = display;
    this.$currentDisplay = display;

    this.adaptSVGDimensions();
  }

  adaptSVGDimensions(): void {
    if (this.screen === undefined) {
      return;
    }
    const screen_size_min = Math.min(this.screen.height, this.screen.width);
    let scale_factor = 1;
    if (this.currentDisplay === TDisplay.mobile) {
      scale_factor = screen_size_min / 360;
    } else {
      scale_factor = screen_size_min / 768;
    }

    if (scale_factor < 0.8) {
      scale_factor = 0.8;
    } else if (scale_factor > 1.2) {
      scale_factor = 1.2;
    }

    this.$GUI_CONFIG.display.knowbook_sizes.height = Math.round(
      this.$GUI_CONFIG.display.knowbook_sizes.height * scale_factor
    );
    this.$GUI_CONFIG.display.atom_sizes.height = Math.round(
      this.$GUI_CONFIG.display.atom_sizes.height * scale_factor
    );
  }

  async setParamsPageAndGUICONFIGFromParamsPageData(paramsPage: IparamsPage) {
    if (paramsPage === undefined || paramsPage.lang === undefined) {
      return;
    }
    const lang = paramsPage.lang;
    let configDataLang: TconfigDataLanguage;

    if (lang === Tlanguage.fr) {
      const configDataFr = await import("../config/configDataFr");
      configDataLang = configDataFr.configDataFr;
    } else if (lang === Tlanguage.it) {
      const configDataIt = await import("../config/configDataIt");
      configDataLang = configDataIt.configDataIt;
    } else if (lang === Tlanguage.en) {
      const configDataEn = await import("../config/configDataEn");
      configDataLang = configDataEn.configDataEn;
    }

    this.$GUI_CONFIG.language = configDataLang;

    this.$paramsPage.lang = lang;
  }

  /**  History **/
  getHistoryItem(id: AtomID): IAtom {
    return this.getHistoryItems([id])[0];
  }

  getHistoryItems(ids: AtomID[]): IAtom[] {
    if (ids === undefined || ids.length === 0) {
      return [];
    }

    return ids.map((id) => {
      return this.$history.get(id);
    });
  }

  async setGoodImageInHistoryItem(id: AtomID): Promise<void> {
    const item = this.getHistoryItem(id);

    if (item.image_url === "") {
      // console.log("setGoodImageInHistoryItem for ", item.title);
      let item_copy_non_observable: IAtom = newAtom(undefined, undefined, item);

      runInAction(() => {
        item_copy_non_observable.image_url = configPaths.item_empty_image;
      });
      const item_copy_non_observable_l: IAtom[] =
        await api_getCleanImageFromWeb_blocking(
          [item_copy_non_observable],
          this.$paramsPage.lang
        );

      item_copy_non_observable = item_copy_non_observable_l[0];

      // this.setHistory([item_deep_copy], true); //Not working, crash Firefox...
      runInAction(() => {
        item.image_url = item_copy_non_observable.image_url;
        item.image_width = item_copy_non_observable.image_width;
        item.image_height = item_copy_non_observable.image_height;
      });
    }
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

  /**  Feed and Mostview **/

  get mostviewedIds(): AtomID[] {
    return Array.from(this.$mostviewed.keys());
  }

  setMostviewed(atoms: IAtom[]): void {
    if (atoms === undefined || atoms.length === 0) {
      return;
    }
    atoms.forEach((item) => this.$mostviewed.add(item.id));
    this.setHistory(atoms);
  }

  clearMostviewed(): void {
    this.$mostviewed.clear();
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

    this.setHistory(atoms);
  }

  /**  Feed Display**/
  get dateLastMostviewed(): IDate {
    return this.$dateLastMostviewed;
  }
  initDateLastMostviewed() {
    const date = new Date();
    const dateLastMostviewed_ = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    this.$dateLastMostviewed = dateLastMostviewed_;
    this.decreaseDateLastMostviewed();
  }

  decreaseDateLastMostviewed(): void {
    const y = this.dateLastMostviewed.year;
    const m = this.dateLastMostviewed.month;
    const d = this.dateLastMostviewed.day;

    if (m === 1 && d === 1) {
      this.$dateLastMostviewed.day = 30;
      this.$dateLastMostviewed.month = 12;
      this.$dateLastMostviewed.year = y - 1;
    } else if (d === 1) {
      this.$dateLastMostviewed.day = 30;
      this.$dateLastMostviewed.month = m - 1;
      this.$dateLastMostviewed.year = y;
    } else {
      this.$dateLastMostviewed.day = d - 1;
      this.$dateLastMostviewed.month = m;
      this.$dateLastMostviewed.year = y;
    }
  }

  get increaseFeedDisplayed() {
    return this.$increaseFeedDisplayed;
  }
  setIncreaseFeedDisplayed(value: boolean): void {
    this.$increaseFeedDisplayed = value;
  }
  initAmountFeedDisplayed() {
    const increment = this.GUI_CONFIG.display.display.displayFeedIncrement;
    this.$amountFeedDisplayed = increment;
  }
  incrementAmountFeedDisplayed(): void {
    // console.log(this.$amountFeedDisplayed);
    const increment = this.GUI_CONFIG.display.display.displayFeedIncrement;
    this.$amountFeedDisplayed = this.$amountFeedDisplayed + increment;
    // console.log(this.$amountFeedDisplayed);
  }

  amount_loop_no_changes = 0;
  get feedItemsToDisplay(): IAtom[] {
    if (this.increaseFeedDisplayed && this.amount_loop_no_changes < 2) {
      //Important: these 2 if(this.increaseFeedDisplayed) are mandatory to work
      setTimeout(() => {
        if (this.increaseFeedDisplayed) {
          this.incrementAmountFeedDisplayed();
          this.amount_loop_no_changes = this.amount_loop_no_changes + 1;
        }
      }, configGeneral.display.feed_time_increment_ms);
    }

    const itemsId = Array.from(this.$feed).slice(0, this.$amountFeedDisplayed);
    if (itemsId.length !== this.$feed.size) {
      this.amount_loop_no_changes = 0;
    }

    for (const id of itemsId) {
      this.setGoodImageInHistoryItem(id);
    }

    return this.getHistoryItems(itemsId);
  }

  /**  Related **/
  get related() {
    return this.$related;
  }
  clearRelated(): void {
    this.$related.clear();
  }

  getRelatedFull(itemId: AtomID): IRelatedAtomFull[] {
    if (itemId === undefined) {
      return [];
    }
    const relatedFull: IRelatedAtomFull[] = this.$related
      .get(itemId)
      .map((related_element: IRelatedAtom) => {
        const related_element_full: IRelatedAtomFull = {
          relation: related_element.relation,
          item: this.getHistoryItem(related_element.item),
        };
        return related_element_full;
      });
    return relatedFull;
  }

  setRelated(id: AtomID, relatedItemsFull: IRelatedAtomFull[]) {
    if (
      id === undefined ||
      relatedItemsFull === undefined ||
      relatedItemsFull.length === 0
    ) {
      return;
    }

    const related_items: IAtom[] = relatedItemsFull.map((relatedItemFull) => {
      return relatedItemFull.item;
    });

    const relatedItems: IRelatedAtom[] = relatedItemsFull.map(
      (relatedItemFull) => {
        return {
          relation: relatedItemFull.relation,
          item: relatedItemFull.item.id,
        };
      }
    );

    this.$related.set(id, relatedItems);

    this.setHistory(related_items);
  }

  getRelatedItems(itemId: AtomID): AtomID[] {
    if (itemId === undefined) {
      return [];
    }
    const relatedAtoms: IRelatedAtom[] = this.$related.get(itemId);
    if (relatedAtoms === undefined) {
      return [];
    }
    const related_items: AtomID[] = relatedAtoms.map((atom) => {
      return atom.item;
    });

    //No duplicates since they are removed in fetchRelated
    return related_items;
  }
}
