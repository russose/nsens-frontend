import {
  IGUICONFIG,
  IparamsPage,
  UserID,
  configGeneral,
  configPaths,
  initStateCat,
} from "../config/globals";
import { onLogout } from "../handlers/handlers_User";
import { IStores } from "../stores/RootStore";
import { api_getUser, api_getUserId } from "./apiUser";
import { fetchMoreBestPublicKnowbooks, goPage, initDemo } from "./helpersBase";

export async function initializeApp(
  stores: IStores,
  paramsPage: IparamsPage,
  GUI_CONFIG: IGUICONFIG
) {
  try {
    if (GUI_CONFIG.id !== stores.baseStore.GUI_CONFIG.id) {
      // console.log("initializeApp 1", stores.baseStore.initCompleted.core);
      stores.baseStore.setParamsPage(paramsPage);
      stores.baseStore.SetGUI_CONFIG(GUI_CONFIG);
    }

    if (stores.uiStore.getInitCompleted(initStateCat.core) === undefined) {
      stores.uiStore.setInitCompleted(initStateCat.core, false);

      stores.baseStore.init();
      stores.knowbookStore.init();
      stores.savedStore.init();
      stores.uiStore.init();
      stores.graphStore.init();

      stores.baseStore.setScreenNoSSR();
      // stores.baseStore.adaptSVGDimensions();

      fetchMoreBestPublicKnowbooks(stores);

      // if (stores.baseStore.initCompleted.core === undefined) {
      //   stores.baseStore.setInitCompleted(initStateCat.core, false);

      // initializeMostviewed(stores); //await

      //Static knowbooks Extracts (small less blocking)
      // initializeStaticKnowbooksExtract(stores); //await

      // updateHome(stores);

      if (configGeneral.demoModeForScreenshoots) {
        // const helpersBase = await import("./helpersBase");
        // await helpersBase.initDemo(stores);
        await initDemo(stores);
      }

      stores.uiStore.setInitCompleted(initStateCat.core, true);
      /************************************************************/
      // stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, false);
    }
    // else if (stores.baseStore.initCompleted.core !== true) {
    //   return;
    // }

    if (stores.uiStore.getInitCompleted(initStateCat.userData) === undefined) {
      stores.uiStore.setInitCompleted(initStateCat.userData, false);

      const userId: UserID = await api_getUserId();

      // stores.baseStore.setUser({ username: user });
      if (userId === -1) {
        stores.baseStore.setUser(undefined);
      } else {
        const user = await api_getUser();
        if (user === undefined) {
          onLogout(stores)();
          goPage(stores, configPaths.pages.Home, {}, true);
        }
        stores.baseStore.setUser(user);
      }

      // initializeBestPublicKnowbooks(stores, userId);

      // Saved Items and Knowbooks
      if (stores.baseStore.isLogged) {
        //Init PageHeaderMode
        // stores.uiStore.setPageHeaderMode(
        //   TPages.Home,
        //   TPageHeaderModes.homeUserKnowbooks
        // );

        const helpersInitializeLogged = await import(
          "./helpersInitializeLogged"
        );
        // await helpersInitializeLogged.initializeSavedLogged(stores);
        await helpersInitializeLogged.initializeMyKnowbooksLogged(stores);
        await helpersInitializeLogged.initializeMyFollowedKnowbooks(stores);
      } else {
        stores.savedStore.clearSaved();
        stores.graphStore.clearRelatedAtoms();
        stores.graphStore.clearRelatedPublicKnowbooks();
        stores.knowbookStore.clearKnowbooks();
      }

      stores.uiStore.setInitCompleted(initStateCat.userData, true);
    }
  } catch (error) {
    // console.log(error);
  }
}
