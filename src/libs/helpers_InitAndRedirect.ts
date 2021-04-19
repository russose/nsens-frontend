import Router from "next/router";
import {
  configPaths,
  configGeneral,
  AtomID,
  GUI_CONFIG_T,
  ConfigLanguage,
  ConfigDisplay,
  IparamsPage,
} from "../config/globals";
import { IStores } from "../stores/_RootStore";
import { setFeedFromRelated } from "./helpersBase";
import { initialyzeRelatedAndRelatedAllFromSaved } from "./helpersRelated";
import { hasTouchScreen } from "./utils";
import { _getUser } from "./_apiUser";
import { _getSavedList, _getKnowbooksList } from "./_apiUserData";

export function goPage(
  stores: IStores,
  paramsPage: IparamsPage,
  page: string,
  reload: boolean = false
) {
  if (process.browser) {
    Router.push({
      pathname: stores.baseStore.rootPath + page,
      query: paramsPage as any,
    });
    if (reload) {
      Router.reload();
    }
  }
}

export function goPageArticle(
  stores: IStores,
  paramsPage: IparamsPage,
  itemId: AtomID,
  itemTitle: string
  // GUI_CONFIG: GUI_CONFIG_T
) {
  if (process.browser) {
    Router.push({
      pathname: stores.baseStore.rootPath + configPaths.pages.ItemArticle,
      query: { ...paramsPage, ...{ title: itemTitle, id: itemId } },
    });
  }
}

export async function initializeUserData(stores: IStores) {
  try {
    if (stores.baseStore.isLogged) {
      const saved = await _getSavedList();
      stores.savedStore.setSaved(saved);
      initialyzeRelatedAndRelatedAllFromSaved(stores);
      const amount_item_displayed =
        stores.baseStore.GUI_CONFIG.display.amount_item_displayed;
      setFeedFromRelated(stores, amount_item_displayed);
      const knowbooks = await _getKnowbooksList();
      stores.knowbookStore.setKnowbooks(knowbooks);
    }
  } catch (error) {
    // console.log(error);
  }
}

export async function initializeApp(stores: IStores) {
  try {
    const user = await _getUser();
    stores.baseStore.setUser({ username: user });
    stores.uiStore.setShowLoading(true);
    await initializeUserData(stores);
    stores.uiStore.setShowLoading(false);
  } catch (error) {
    // console.log(error);
  }
}

export function initializeAppAndRedirect(
  stores: IStores,
  GUI_CONFIG: GUI_CONFIG_T
): void {
  stores.baseStore.set_ParamsPage_GUI_CONFIG(GUI_CONFIG);
  if (stores.baseStore.user === null) {
    //Not initialyzed
    initializeApp(stores)
      .then(() => {
        redirectAccordingContext(stores);
      })
      .catch((error) => {
        // console.log(error);
      });
  }
}

export function redirectAccordingContext(stores: IStores) {
  if (process.browser) {
    const paramsPage = getParamsPageAccordingContext(stores);
    const paramsPage_lang = paramsPage.lang;
    const paramsPage_display = paramsPage.display;

    if (!stores.baseStore.isLogged) {
      goPage(
        stores,
        {
          lang: paramsPage_lang,
          display: paramsPage_display,
        },
        configPaths.pages.Landing
      );
    } else {
      goPage(
        stores,
        {
          lang: paramsPage_lang,
          display: paramsPage_display,
        },
        configPaths.pages.Home
      );
    }
  }
}

export function getParamsPageAccordingContext(stores: IStores): IparamsPage {
  if (process.browser) {
    const max_width_mobile = configGeneral.max_width_mobile;
    const isMobile: boolean =
      hasTouchScreen(window) || window.innerWidth < max_width_mobile;

    let paramsPage_lang = ConfigLanguage.fr;

    let paramsPage_display: ConfigDisplay;
    if (isMobile) {
      // if (
      //   this.$screen.width < this.$GUI_CONFIG.general.tiny_screen_breakpoint
      // ) {
      //   paramsPage_display = ConfigDisplay.small;
      // } else {
      paramsPage_display = ConfigDisplay.mobile;
      // }
    } else {
      if (
        stores.baseStore.screen.width > configGeneral.large_screen_breakpoint
      ) {
        paramsPage_display = ConfigDisplay.large;
      } else {
        paramsPage_display = ConfigDisplay.desktop;
      }
    }
    return { lang: paramsPage_lang, display: paramsPage_display };
  }
  return undefined;
}
