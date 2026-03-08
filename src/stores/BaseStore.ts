import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import {
  AtomID,
  configPaths,
  IAtom,
  IDate,
  IGUICONFIG,
  IparamsPage,
  IPosition,
  IUser,
  placeholder_image_not_refreshed,
  Tlanguage,
} from "../config/globals";
import { api_getCleanImageFromWeb_blocking } from "../libs/apiItems";
import { newAtom } from "../libs/utils";
import { RootStore } from "./RootStore";

// interface IInitState {
//   [initStateCat.core]: boolean;
//   [initStateCat.userData]: boolean;
//   [initStateCat.itemRelated]: boolean;
//   [initStateCat.staticKnowbooks]: boolean;
// }

export class BaseStore {
  $rootStore: RootStore;
  // private $initCompleted: IInitState = {
  //   [initStateCat.core]: undefined,
  //   [initStateCat.userData]: undefined,
  //   [initStateCat.itemRelated]: undefined,
  //   [initStateCat.staticKnowbooks]: undefined,
  // };

  private $user: IUser | null = null;

  private $GUI_CONFIG: IGUICONFIG = {
    language: undefined,
    display: undefined,
    id: undefined,
  };

  private $paramsPage: IparamsPage = { lang: undefined, display: undefined };

  private $screen: {
    width: number;
    height: number;
    center: IPosition;
    realLocation: Tlanguage; //Especially for Amazon link opening
  } = undefined;

  private $history = observable.map<AtomID, IAtom>(); //Containing all items content
  // private $searchFeed = observable.set<AtomID>();
  private $mostviewed = observable.set<AtomID>();
  private $dateLastMostviewed: IDate;

  // private $related = observable.map<AtomID, IRelatedAtom[]>();

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<BaseStore, "$user">(this, {
      $user: observable,
      init: action,
      setUser: action,
      decreaseDateLastMostviewed: action,
      initDateLastMostviewed: action,
      setHistory: action,
      clearHistory: action,
      setMostviewed: action,
      clearMostviewed: action,
      // clearSearchFeed: action,
      // setSearchFeed: action,
      setGoodImageInHistoryItem: action,
      // setRelated: action,
      // clearRelated: action,
      isLogged: computed,
      mostviewedIds: computed,
    });
  }

  init() {
    this.initDateLastMostviewed();
    this.clearHistory();
    // this.clearSearchFeed();
    this.clearMostviewed();
    // this.clearRelated();
  }

  /**  General **/
  // get initCompleted(): IInitState {
  //   return this.$initCompleted;
  // }

  // setInitCompleted(state: initStateCat, value: boolean): void {
  //   this.$initCompleted[state] = value;
  // }

  get isLogged(): boolean {
    if (
      this.$user === undefined ||
      this.$user === null
      // ||this.$user.email === ""
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
  setScreenNoSSR(): void {
    // if (process.browser) {
    if (typeof window !== "undefined") {
      const width = Math.min(window.innerWidth, window.outerWidth);
      const height = Math.min(window.innerHeight, window.outerHeight);

      const language_navigator = navigator.language;
      let realLocation: Tlanguage;
      if (language_navigator.includes("fr")) {
        realLocation = Tlanguage.fr;
      } else if (language_navigator.includes("it")) {
        realLocation = Tlanguage.it;
      } else {
        realLocation = Tlanguage.en;
      }
      const screen = {
        width: width,
        height: height,
        center: { x: width / 2, y: height / 2 },
        realLocation: realLocation,
      };

      this.$screen = screen;
    }
  }

  get paramsPage() {
    return this.$paramsPage;
  }

  SetGUI_CONFIG(GUI_CONFIG: IGUICONFIG) {
    this.$GUI_CONFIG = GUI_CONFIG;
  }

  setParamsPage(paramsPage: IparamsPage) {
    this.$paramsPage = paramsPage;
  }

  get GUI_CONFIG() {
    return this.$GUI_CONFIG;
  }

  // setGUICONFIGFromDisplay_old(display: TDisplay) {
  //   if (display === this.currentDisplay) {
  //     return;
  //   }

  //   if (display === TDisplay.mobile) {
  //     this.$GUI_CONFIG.display = configDataMobile;
  //   } else if (display === TDisplay.desktop) {
  //     this.$GUI_CONFIG.display = configDataDesktop;
  //   }

  //   // else if (display === TDisplay.large) {
  //   //   this.$GUI_CONFIG.display = configDataDesktop;
  //   //   this.$GUI_CONFIG.display.atom_sizes.lgColumn =
  //   //     configDataSpecialScreen.large.atom_sizes_column;
  //   //   // this.$GUI_CONFIG.display.knowbook_sizes.lgColumn =
  //   //   //   configDataSpecialScreen.large.knowbook_sizes_column;
  //   // }
  //   // else if (display === TDisplay.extra) {
  //   //   this.$GUI_CONFIG.display = configDataDesktop;
  //   //   // GUI_CONFIG__.display.About.features.lgColumn =
  //   //   //   configGUISpecialScreen.configDataSpecialScreen.large.landing_features_column;
  //   //   this.$GUI_CONFIG.display.atom_sizes.lgColumn =
  //   //     configDataSpecialScreen.extra_large.atom_sizes_column;
  //   //   // this.$GUI_CONFIG.display.knowbook_sizes.lgColumn =
  //   //   //   configDataSpecialScreen.extra_large.knowbook_sizes_column;
  //   // }

  //   // this.$GUI_CONFIG.currentDisplay = display;
  //   this.$currentDisplay = display;

  //   this.adaptSVGDimensions();
  // }

  // adaptSVGDimensions(): void {
  //   if (this.screen === undefined) {
  //     return;
  //   }
  //   const screen_size_min = Math.min(this.screen.height, this.screen.width);
  //   let scale_factor = 1;
  //   if (this.currentDisplay === TDisplay.mobile) {
  //     scale_factor = screen_size_min / 360;
  //   } else {
  //     scale_factor = screen_size_min / 768;
  //   }

  //   if (scale_factor < 0.8) {
  //     scale_factor = 0.8;
  //   } else if (scale_factor > 1.2) {
  //     scale_factor = 1.2;
  //   }

  //   this.$GUI_CONFIG.display.knowbook_sizes.height = Math.round(
  //     this.$GUI_CONFIG.display.knowbook_sizes.height * scale_factor
  //   );
  //   this.$GUI_CONFIG.display.atom_sizes.height = Math.round(
  //     this.$GUI_CONFIG.display.atom_sizes.height * scale_factor
  //   );
  // }

  // async setParamsPageAndGUICONFIGFromParamsPageData(paramsPage: IparamsPage) {
  //   if (
  //     paramsPage === undefined ||
  //     paramsPage.lang === undefined ||
  //     paramsPage.display === undefined
  //   ) {
  //     return;
  //   }
  //   const lang = paramsPage.lang;
  //   let configDataLang: TconfigDataLanguage;

  //   if (lang === Tlanguage.fr) {
  //     // const configDataFr = await import("../config/configDataFr");
  //     // configDataLang = configDataFr.configDataFr;
  //     configDataLang = await configDataFr_D();
  //   } else if (lang === Tlanguage.it) {
  //     // const configDataIt = await import("../config/configDataIt");
  //     // configDataLang = configDataIt.configDataIt;
  //     configDataLang = await configDataIt_D();
  //   } else if (lang === Tlanguage.en) {
  //     // const configDataEn = await import("../config/configDataEn");
  //     // configDataLang = configDataEn.configDataEn;
  //     configDataLang = await configDataEn_D();
  //   }

  //   this.$GUI_CONFIG.language = configDataLang;

  //   /****/
  //   const display = paramsPage.display;
  //   let configDataDisplay: TconfigDataDisplay;
  //   if (display === TDisplay.mobile) {
  //     configDataDisplay = await configDataMobile_D();
  //   } else if (display === TDisplay.desktop) {
  //     configDataDisplay = await configDataDesktop_D();
  //   }

  //   this.$GUI_CONFIG.display = configDataDisplay;
  //   this.$currentDisplay = display;
  //   this.adaptSVGDimensions();

  //   this.$paramsPage.lang = lang;
  //   this.$paramsPage.display = display;
  // }

  /**  History **/
  getHistoryItem(id: AtomID): IAtom {
    return this.getHistoryItems([id])[0];
  }

  getHistoryItems(ids: AtomID[]): IAtom[] {
    if (ids === undefined || ids.length === 0) {
      return [];
    }

    const items = ids.map((id) => {
      return this.$history.get(id);
    });

    const items_without_undefined = items.filter((item) => {
      return item !== undefined;
    });

    return items_without_undefined;

    // return ids.map((id) => {
    //   return this.$history.get(id);
    // });
  }

  async setGoodImageInHistoryItem(id: AtomID): Promise<void> {
    const item = this.getHistoryItem(id);
    if (item === undefined) {
      return;
    }

    if (item.image_url === "") {
      // console.log("setGoodImageInHistoryItem for ", item.title);

      //Prevent lauching many fechting during the compleion of this method
      runInAction(() => {
        item.image_url = placeholder_image_not_refreshed;
      });

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
    if (
      atoms === undefined ||
      atoms.length === 0 ||
      atoms.filter((i) => {
        return i !== undefined;
      }).length === 0
    ) {
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

  // clearSearchFeed(): void {
  //   this.$searchFeed.clear();
  // }
  // setSearchFeed(atoms: IAtom[]): void {
  //   if (atoms === undefined || atoms.length === 0) {
  //     return;
  //   }

  //   atoms.forEach((item) => {
  //     this.$searchFeed.add(item.id);
  //   });

  //   this.setHistory(atoms);
  // }

  // get seachFeedItems(): IAtom[] {
  //   return this.getHistoryItems(Array.from(this.$searchFeed));
  // }

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

  // get increaseFeedDisplayed() {
  //   return this.$increaseFeedDisplayed;
  // }
  // setIncreaseFeedDisplayed(value: boolean): void {
  //   this.$increaseFeedDisplayed = value;
  // }
  // get onEnterOnce() {
  //   return this.$onEnterOnce;
  // }
  // setOnEnterOnce(value: boolean): void {
  //   this.$onEnterOnce = value;
  // }

  // initAmountFeedDisplayed() {
  //   // const increment = this.GUI_CONFIG.display.display.displayFeedIncrement;
  //   const increment = 0;
  //   this.$amountFeedDisplayed = increment;
  // }
  // incrementAmountFeedDisplayed(): void {
  //   if (this.$amountFeedDisplayed > 4) {
  //     return;
  //   }
  //   const increment = this.GUI_CONFIG.display.display.displayFeedIncrement;
  //   this.$amountFeedDisplayed = this.$amountFeedDisplayed + increment;
  //   console.log(this.$amountFeedDisplayed);
  // }

  // amount_loop_no_changes = 0;
  // get feedItemsToDisplay(): IAtom[] {
  //   // if (
  //   //   this.increaseFeedDisplayed &&
  //   //   this.amount_loop_no_changes < 2 &&
  //   //   this.onEnterOnce
  //   // ) {
  //   //   //Important: these 2 if(this.increaseFeedDisplayed) are mandatory to work
  //   //   setTimeout(() => {
  //   //     if (this.increaseFeedDisplayed) {
  //   //       this.incrementAmountFeedDisplayed();
  //   //       this.amount_loop_no_changes = this.amount_loop_no_changes + 1;
  //   //     }
  //   //   }, configGeneral.display.feed_time_increment_ms);
  //   // }

  //   if (this.increaseFeedDisplayed && this.onEnterOnce) {
  //     console.log("entered in if");
  //     setTimeout(() => {
  //       if (this.increaseFeedDisplayed) {
  //         this.incrementAmountFeedDisplayed();
  //       }
  //     }, configGeneral.display.feed_time_increment_ms);
  //   }

  //   const itemsId = Array.from(this.$feed).slice(0, this.$amountFeedDisplayed);
  //   // if (itemsId.length !== this.$feed.size) {
  //   //   this.amount_loop_no_changes = 0;
  //   // }

  //   for (const id of itemsId) {
  //     this.setGoodImageInHistoryItem(id);
  //   }

  //   return this.getHistoryItems(itemsId);
  // }

  // get feedItemsToDisplay(): IAtom[] {
  //   if (this.increaseFeedDisplayed && this.initCompleted.core === true) {
  //     sleep_(configGeneral.display.feed_time_increment_ms).then(() => {
  //       if (this.increaseFeedDisplayed) {
  //         this.incrementAmountFeedDisplayed();
  //       }
  //     });
  //   }
  //   const itemsId = Array.from(this.$feed).slice(0, this.$amountFeedDisplayed);
  //   for (const id of itemsId) {
  //     this.setGoodImageInHistoryItem(id);
  //   }
  //   return this.getHistoryItems(itemsId);
  // }
}
