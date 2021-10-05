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
} from "../config/globals";
import { api_getCleanImageFromWeb_blocking } from "../libs/apiItems";
import {
  fetchNewMostviewed,
  removeSavedFromItems,
  setFeedFromMostviewedAndRelated,
} from "../libs/helpersBase";
import { newAtom, shuffleArray } from "../libs/utils";
import { RootStore } from "./RootStore";

interface IInitState {
  [initStateCat.core]: boolean;
  [initStateCat.staticKnowbooksFull]: boolean;
  [initStateCat.userData]: boolean;
}

export class BaseStore {
  $rootStore: RootStore;
  private $initCompleted: IInitState = {
    [initStateCat.core]: undefined,
    [initStateCat.staticKnowbooksFull]: undefined,
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

  private $allRelatedIdsForHome: AtomID[];

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
      isLogged: computed,
      feedItemsToDisplay: computed,
      mostviewedIds: computed,
    });
  }

  init() {
    this.initDateLastMostviewed();
    this.clearHistory();
    this.clearFeed();
    this.clearMostviewed();
    this.clearRelated();
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

  setGUICONFIGFromDisplay(display: TDisplay) {
    if (display === this.$GUI_CONFIG.currentDisplay) {
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
      this.$GUI_CONFIG.display.knowbook_sizes.lgColumn =
        configDataSpecialScreen.large.knowbook_sizes_column;
    } else if (display === TDisplay.extra) {
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
  // get amountFeedDisplayed() {
  //   return this.$amountFeedDisplayed;
  // }
  incrementAmountFeedDisplayed(): void {
    // console.log(this.$amountFeedDisplayed);
    const increment = this.GUI_CONFIG.display.display.displayFeedIncrement;
    this.$amountFeedDisplayed = this.$amountFeedDisplayed + increment;
    // console.log(this.$amountFeedDisplayed);
  }
  initAmountFeedDisplayed() {
    const increment = this.GUI_CONFIG.display.display.displayFeedIncrement;
    this.$amountFeedDisplayed = increment;
  }

  setModeFeedDisplayedIsSearch(value: boolean): void {
    this.$modeFeedDisplayedIsSearch = value;
  }

  get feedItemsToDisplay(): IAtom[] {
    if (this.increaseFeedDisplayed) {
      // if (false) {
      //Important: these 2 if(this.increaseFeedDisplayed) are mandatory to work
      setTimeout(() => {
        if (this.increaseFeedDisplayed) {
          this.incrementAmountFeedDisplayed();
        }
      }, configGeneral.display.feed_time_increment_ms);
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

          setFeedFromMostviewedAndRelated(this.$rootStore.stores());
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

  get allRelatedIdsForHome() {
    return this.$allRelatedIdsForHome;
  }

  initAllRelatedIdsForHome() {
    // const max_items_amount = 200;
    const min_size_saved_to_display_related = 10;

    if (
      this.$rootStore.stores().baseStore.isLogged &&
      this.$rootStore.stores().savedStore.saved.size >
        min_size_saved_to_display_related
    ) {
      // Get all related items of saved items with relation "wikipedia"
      const ids_shuffled: AtomID[] = shuffleArray(
        Array.from(this.$rootStore.stores().savedStore.saved)
      );
      const output = new Set<AtomID>();

      for (const id of ids_shuffled) {
        // if (output.size > max_items_amount) {
        //   break;
        // }
        //Only Wikipedia relations

        if (this.$rootStore.stores().baseStore.related.get(id) !== undefined) {
          const related_only_wikipedia: IRelatedAtom[] = this.$rootStore
            .stores()
            .baseStore.related.get(id)
            .filter((related) => {
              return related.relation === configGeneral.relation_name_wikipedia;
            });
          const relatedItemsIds_only_wikipedia: AtomID[] =
            related_only_wikipedia.map((related) => {
              return related.item;
            });
          relatedItemsIds_only_wikipedia.forEach((id) => {
            if (!this.$rootStore.stores().savedStore.saved.has(id)) {
              output.add(id);
            }
          });
        }
      }

      this.$allRelatedIdsForHome = shuffleArray(Array.from(output));
    } else {
      const ids_shuffled: AtomID[] = shuffleArray(
        Array.from(
          this.$rootStore.stores().knowbookStore.itemsInStaticKnowbooksForHome
        )
      );

      this.$allRelatedIdsForHome = ids_shuffled;
    }
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
