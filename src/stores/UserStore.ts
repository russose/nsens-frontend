import { observable, action, computed, makeObservable } from "mobx";
import Router from "next/router";
import {
  ConfigDisplay,
  ConfigLanguage,
  GUI_CONFIG_T,
  IUser,
} from "../common/types";
import { hasTouchScreen } from "../libs/utils";
import {
  issue_text,
  _getKnowbooksList,
  _getSavedList,
  _getUser,
} from "../_api";
import { IStores } from "./_RootStore";

interface IparamsPage {
  lang: ConfigLanguage;
  display: ConfigDisplay;
}

export class UserStore {
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

  constructor() {
    makeObservable<UserStore, "$user">(this, {
      $user: observable,
      isLogged: computed,
      setUser: action,
    });
  }

  get screen() {
    return this.$screen;
  }

  get isLogged(): boolean {
    if (this.user === undefined || this.user === null) {
      return false;
    }
    if (this.user.username === "" || this.$user.username === issue_text) {
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

  set_ParamsPage_GUI_CONFIG(GUI_CONFIG: GUI_CONFIG_T) {
    if (GUI_CONFIG === undefined) {
      return;
    }
    this.$GUI_CONFIG = GUI_CONFIG;
    if (GUI_CONFIG.id !== undefined) {
      const paramsPage: any[] = GUI_CONFIG.id.split("_");
      this.$paramsPage.lang = paramsPage[0];
      this.$paramsPage.display = paramsPage[1];
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

  goPage(paramsPage: IparamsPage, page: string) {
    if (process.browser) {
      Router.push({
        pathname: this.rootPath + page,
        query: paramsPage as any,
      });
    }
  }

  async initializeUserData(stores: IStores) {
    try {
      if (this.isLogged) {
        const saved = await _getSavedList();
        stores.savedStore.setSaved(saved);
        stores.feedStore.initialyzeRelatedAndRelatedAllFromSaved(
          stores.savedStore
        );
        const amount_item_displayed = this.GUI_CONFIG.display
          .amount_item_displayed;
        stores.feedStore.setFeedFromRelated(amount_item_displayed);
        const knowbooks = await _getKnowbooksList();
        stores.knowbookStore.setKnowbooks(knowbooks);
      }
    } catch (error) {
      // console.log(error);
    }
  }

  async initializeApp(stores: IStores) {
    try {
      const user = await _getUser();
      this.setUser({ username: user });
      await this.initializeUserData(stores);
    } catch (error) {
      // console.log(error);
    }
  }

  initializeAppAndRedirect(stores: IStores, GUI_CONFIG: GUI_CONFIG_T): void {
    if (
      this.GUI_CONFIG === undefined ||
      this.GUI_CONFIG.id === undefined ||
      GUI_CONFIG.id !== this.GUI_CONFIG.id
    ) {
      this.set_ParamsPage_GUI_CONFIG(GUI_CONFIG);
    }

    if (this.user === null) {
      //Not initialyzed
      this.initializeApp(stores)
        .then(() => {
          this.redirectAccordingContext();
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  }

  redirectAccordingContext() {
    if (process.browser) {
      const max_width_mobile = this.$GUI_CONFIG.general.max_width_mobile;
      const isMobile: boolean =
        hasTouchScreen(window) || window.innerWidth < max_width_mobile;

      let paramsPage_lang = ConfigLanguage.fr;

      let paramsPage_display;
      if (isMobile) {
        if (
          this.$screen.width < this.$GUI_CONFIG.general.tiny_screen_breakpoint
        ) {
          paramsPage_display = ConfigDisplay.small;
        } else {
          paramsPage_display = ConfigDisplay.mobile;
        }
      } else {
        if (
          this.$screen.width > this.$GUI_CONFIG.general.large_screen_breakpoint
        ) {
          paramsPage_display = ConfigDisplay.large;
        } else {
          paramsPage_display = ConfigDisplay.desktop;
        }
      }

      if (!this.isLogged) {
        this.goPage(
          {
            lang: paramsPage_lang,
            display: paramsPage_display,
          },
          this.GUI_CONFIG.paths.pages.Landing
        );
      } else {
        this.goPage(
          {
            lang: paramsPage_lang,
            display: paramsPage_display,
          },
          this.GUI_CONFIG.paths.pages.Home
        );
      }
    }
  }

  // redirectHomeIfLogged(stores: IStores) {
  //   if (process.browser) {
  //     if (stores.userStore.isLogged) {
  //       // Already Logged
  //       goHome();
  //     }
  //   }
  // }

  // redirectLandingIfNotLogged(stores: IStores) {
  //   if (process.browser) {
  //     if (!stores.userStore.isLogged) {
  //       // Not Logged
  //       goLanding();
  //     }
  //   }
  // }

  // goHome() {
  //   Router.push({
  //     pathname: paths.pages.Home,
  //   });
  // }

  // goLanding() {
  //   Router.push({
  //     pathname: paths.pages.Landing,
  //   });
  // }

  // initializeAppAndDisplay(
  //   stores: IStores,
  //   GUI_CONFIG: GUI_CONFIG_T
  //   // isLanding: boolean = false
  // ): void {

  //   //Already initialyzed
  //   if (this.user !== null) {
  //     if (GUI_CONFIG.id !== this.GUI_CONFIG.id) {
  //       this.set_ParamsPage_GUI_CONFIG(GUI_CONFIG);
  //     }
  //     // console.log("app ALREADY initialyzed");
  //     return;
  //   }

  //   // console.log("app initialyzed");
  //   this.set_ParamsPage_GUI_CONFIG(GUI_CONFIG);
  //   this.initializeApp(stores);

  //   if (process.browser) {
  //     this.$screen = {
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     };
  //   }

  //   // if (process.browser) {
  //   //   this.$screen = {
  //   //     width: window.innerWidth,
  //   //     height: window.innerHeight,
  //   //   };

  //   //   const max_width_mobile = this.$GUI_CONFIG.general.max_width_mobile;
  //   //   this.$paramsPage.lang = ConfigLanguage.fr;

  //   //   const isMobile: boolean =
  //   //     hasTouchScreen(window) || window.innerWidth < max_width_mobile;

  //   //   if (isMobile) {
  //   //     if (this.$screen.width < GUI_CONFIG.general.tiny_screen_breakpoint) {
  //   //       this.$paramsPage.display = ConfigDisplay.small;
  //   //     } else {
  //   //       this.$paramsPage.display = ConfigDisplay.mobile;
  //   //     }
  //   //   } else {
  //   //     if (this.$screen.width > GUI_CONFIG.general.large_screen_breakpoint) {
  //   //       this.$paramsPage.display = ConfigDisplay.large;
  //   //     } else {
  //   //       this.$paramsPage.display = ConfigDisplay.desktop;
  //   //     }
  //   //   }
  //   // }
  // }
}
