import {
  IKnowbookStatic,
  IparamsPage,
  initStateCat,
  ConfigDisplay,
  IRelatedAtomFull,
  IStaticKnowbookDefinition,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import {
  api_getAllStaticKnowbooksLocal,
  api_getStaticKnowbookLocal,
} from "./apiItems";
import { api_getUser } from "./apiUser";
import { setFeedFromMostviewedAndRelated } from "./helpersBase";
import { readRelatedStringFromItem } from "./helpersRelated";

export async function initializeApp(stores: IStores, paramsPage: IparamsPage) {
  try {
    if (stores.baseStore.initCompleted.core === undefined) {
      stores.uiStore.setShowLoading(true);
      /****************Core Blocking*******************************/
      stores.baseStore.setInitCompleted(initStateCat.core, false);

      stores.baseStore.init();
      stores.knowbookStore.init();
      stores.savedStore.init();

      // stores.baseStore.setscreenNoSSR();
      await stores.baseStore.setParamsPageAndGUICONFIGFromParamsPageData(
        paramsPage
      );

      stores.baseStore.setGUICONFIGFromDisplay(ConfigDisplay.mobile);

      const user = await api_getUser();
      stores.baseStore.setUser({ username: user });

      //Static knowbooks
      await initializeStaticKnowbooks(stores);

      stores.baseStore.setInitCompleted(initStateCat.core, true);
      /************************************************************/
      stores.uiStore.setShowLoading(false);
    } else if (stores.baseStore.initCompleted.core !== true) {
      return;
    }

    if (stores.baseStore.initCompleted.userData === undefined) {
      stores.baseStore.setInitCompleted(initStateCat.userData, false);

      // Saved Items
      if (stores.baseStore.isLogged) {
        const helpersInitializeLogged = await import(
          "./helpersInitializeLogged"
        );

        await helpersInitializeLogged.initializeSavedLogged(stores);
      } else {
        stores.savedStore.clearSaved();
        stores.baseStore.clearRelated();
      }

      // Init dynamic Feed
      setFeedFromMostviewedAndRelated(stores);

      //Knowbooks
      if (stores.baseStore.isLogged) {
        const helpersInitializeLogged = await import(
          "./helpersInitializeLogged"
        );
        await helpersInitializeLogged.initializeKnowbooksLogged(stores);
      } else {
        stores.knowbookStore.clearKnowbooks();
      }
      stores.baseStore.setInitCompleted(initStateCat.userData, true);
    }
  } catch (error) {
    // console.log(error);
  }
}

export async function initializeStaticKnowbooks(stores: IStores) {
  //Static Knowbooks
  const lang = stores.baseStore.paramsPage.lang;
  // const staticKnowbooks_local_all = staticTrendFeaturedKnowbooks;
  const staticKnowbooks_local_all: IStaticKnowbookDefinition[] =
    await api_getAllStaticKnowbooksLocal();
  const staticKnowbooks_local = staticKnowbooks_local_all.filter((knowbook) => {
    return knowbook.lang === stores.baseStore.paramsPage.lang;
  });

  try {
    for (const item of staticKnowbooks_local) {
      const knowbook_json: any = await api_getStaticKnowbookLocal(
        item.nameOrPeriod,
        lang
      );
      const knowbook: IKnowbookStatic = {
        id: -1, //id not used in front but only in back
        language: lang,
        type: knowbook_json.type,
        name: knowbook_json.nameOrPeriod,
        name_display: knowbook_json.name_display,
        items: knowbook_json.items,
      };
      stores.knowbookStore.setStaticKnowbooks(knowbook.name, knowbook);

      stores.baseStore.setHistory(knowbook.items);

      knowbook.items.forEach((atom) => {
        const related: IRelatedAtomFull[] = readRelatedStringFromItem(atom);
        stores.baseStore.setRelated(atom.id, related);
      });
    }
  } catch (err) {
    // console.log("error in getting static knowbooks...");
  }
}
