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
  ConfigDisplay,
  initStateCat,
  ConfigLanguage,
  configDataLanguage,
  IRelatedAtomFull,
  IDate,
} from "../config/globals";
import { api_getCleanImageFromWeb_blocking } from "../libs/apiItems";
import {
  fetchNewMostviewed,
  Mix2Array,
  removeSavedFromItems,
} from "../libs/helpersBase";
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
  private $modeFeedDisplayedIsSearch: boolean = false;

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
    >(this, {
      $user: observable,
      $initCompleted: observable,
      $amountFeedDisplayed: observable,
      $increaseFeedDisplayed: observable,
      setInitCompleted: action,
      setUser: action,
      initAmountFeedDisplayed: action,
      incrementAmountFeedDisplayed: action,
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
      mostviewedItems: computed,
      feedItemsToDisplay: computed,
      mostviewedIds: computed,
    });
  }

  /**  General **/
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
      let item_copy_non_observable: IAtom = newAtom(undefined, undefined, item);

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
  get mostviewedItems(): IAtom[] {
    return this.getHistoryItems(Array.from(this.$mostviewed));
  }
  setMostviewed(atoms: IAtom[]): void {
    if (atoms === undefined || atoms.length === 0) {
      return;
    }
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

    this.setHistory(atoms);
  }

  /**  Feed Displayed**/
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
  get amountFeedDisplayed() {
    return this.$amountFeedDisplayed;
  }
  incrementAmountFeedDisplayed(): void {
    let increment = this.$GUI_CONFIG.display.display.displayFeedIncrement;
    this.$amountFeedDisplayed = this.$amountFeedDisplayed + increment;
  }
  initAmountFeedDisplayed() {
    let increment = this.$GUI_CONFIG.display.display.displayFeedIncrement;
    this.$amountFeedDisplayed = increment;
  }

  setModeFeedDisplayedIsSearch(value: boolean): void {
    this.$modeFeedDisplayedIsSearch = value;
  }

  get feedItemsToDisplay(): IAtom[] {
    if (this.increaseFeedDisplayed) {
      //Important: these 2 if(this.increaseFeedDisplayed) are mandatory to work
      setTimeout(() => {
        if (this.increaseFeedDisplayed) {
          this.incrementAmountFeedDisplayed();
        }
      }, this.GUI_CONFIG.display.display.feed_time_increment_ms);
    }

    const requireFetchNewMostviewed =
      !this.$modeFeedDisplayedIsSearch &&
      this.$amountFeedDisplayed >= this.$feed.size;

    if (requireFetchNewMostviewed) {
      fetchNewMostviewed(this.$rootStore.stores())
        .then((items: IAtom[]) => {
          const itemsWithoutSaved: IAtom[] = removeSavedFromItems(
            this.$rootStore.stores(),
            items
          );
          this.setMostviewed(itemsWithoutSaved);

          let mixedIds: AtomID[];
          if (!this.isLogged) {
            mixedIds = this.mostviewedIds;
          } else {
            mixedIds = Mix2Array(
              this.mostviewedIds,
              this.$rootStore.stores().savedStore
                .allRelatedIdsFromSavedNotSaved,
              this.GUI_CONFIG.display.display.amount_mostview_for_each_related
            );
          }
          const mixed: IAtom[] = this.getHistoryItems(mixedIds);

          // this.setFeed(itemsWithoutSaved);
          this.setFeed(mixed);
        })
        .catch(() => {
          // console.log("error in seach from pattern");
        });
    }

    const itemsId = Array.from(this.$feed).slice(0, this.$amountFeedDisplayed);

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
