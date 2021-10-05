import {
  IKnowbookStatic,
  IparamsPage,
  initStateCat,
  TDisplay,
  IRelatedAtomFull,
  IStaticKnowbookDefinition,
  IStaticKnowbookWithItemsDefinition,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import {
  api_getAllStaticKnowbooksExtractWithItemsLocal,
  api_getAllStaticKnowbooksLocal,
  api_getStaticKnowbookWithItemsLocal,
} from "./apiItems";
import { api_getUser } from "./apiUser";
import { updateHome } from "./helpersBase";
import { readRelatedStringFromItem } from "./helpersRelated";

export async function initializeStaticKnowbooksFullPage(stores: IStores) {
  if (stores.baseStore.initCompleted.staticKnowbooksFull === undefined) {
    stores.uiStore.setShowLoading(true);
    stores.baseStore.setInitCompleted(initStateCat.staticKnowbooksFull, false);
    await initializeStaticKnowbooksFull(stores);
    stores.baseStore.initAllRelatedIdsForHome();
    updateHome(stores);
    stores.baseStore.setInitCompleted(initStateCat.staticKnowbooksFull, true);
    stores.uiStore.setShowLoading(false);
  }
}

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

      stores.baseStore.setGUICONFIGFromDisplay(TDisplay.mobile);

      //Static knowbooks Extracts (small less blocking)
      await initializeStaticKnowbooksExtract(stores);

      stores.baseStore.initAllRelatedIdsForHome();

      // Init dynamic Feed (without this function, display 2x amountfeed)
      updateHome(stores);

      stores.baseStore.setInitCompleted(initStateCat.core, true);
      /************************************************************/
      stores.uiStore.setShowLoading(false);
    } else if (stores.baseStore.initCompleted.core !== true) {
      return;
    }

    if (stores.baseStore.initCompleted.userData === undefined) {
      stores.baseStore.setInitCompleted(initStateCat.userData, false);

      const user = await api_getUser();
      stores.baseStore.setUser({ username: user });

      // Saved Items and Knowbooks
      if (stores.baseStore.isLogged) {
        const helpersInitializeLogged = await import(
          "./helpersInitializeLogged"
        );

        helpersInitializeLogged.initializeSavedLogged(stores);
        helpersInitializeLogged.initializeKnowbooksLogged(stores);
      } else {
        stores.savedStore.clearSaved();
        stores.baseStore.clearRelated();
        stores.knowbookStore.clearKnowbooks();
      }

      stores.baseStore.setInitCompleted(initStateCat.userData, true);
    }
  } catch (error) {
    // console.log(error);
  }
}

export async function initializeStaticKnowbooksFull(stores: IStores) {
  //Static Knowbooks
  const lang = stores.baseStore.paramsPage.lang;
  const staticKnowbooks_local_all: IStaticKnowbookDefinition[] =
    await api_getAllStaticKnowbooksLocal();
  const staticKnowbooks_local = staticKnowbooks_local_all.filter((knowbook) => {
    return knowbook.lang === stores.baseStore.paramsPage.lang;
  });

  try {
    for (const staticKnowbook of staticKnowbooks_local) {
      const knowbook_json: any = await api_getStaticKnowbookWithItemsLocal(
        staticKnowbook.nameOrPeriod,
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

      stores.baseStore.setHistory(knowbook.items, true);

      knowbook.items.forEach((atom) => {
        const related: IRelatedAtomFull[] = readRelatedStringFromItem(atom);
        stores.baseStore.setRelated(atom.id, related);
      });
    }
  } catch (err) {
    // console.log("error in getting static knowbooks...");
  }
}

export async function initializeStaticKnowbooksExtract(stores: IStores) {
  //Static Knowbooks
  const lang = stores.baseStore.paramsPage.lang;
  const staticKnowbooks_local_extract_all: IStaticKnowbookWithItemsDefinition[] =
    await api_getAllStaticKnowbooksExtractWithItemsLocal(lang);

  // try {
  for (const staticKnowbooks_extract of staticKnowbooks_local_extract_all) {
    const knowbook: IKnowbookStatic = {
      id: -1, //id not used in front but only in back
      language: lang,
      type: staticKnowbooks_extract.type,
      name: staticKnowbooks_extract.nameOrPeriod,
      name_display: staticKnowbooks_extract.name_display,
      items: staticKnowbooks_extract.items,
    };
    stores.knowbookStore.setStaticKnowbooks(knowbook.name, knowbook);

    stores.baseStore.setHistory(knowbook.items);

    // knowbook.items.forEach((atom) => {
    //   const related: IRelatedAtomFull[] = readRelatedStringFromItem(atom);
    //   stores.baseStore.setRelated(atom.id, related);
    // });
  }
  // } catch (err) {
  //   // console.log("error in getting static knowbooks...");
  // }
}

// function allowBlockingFetching(stores: IStores): boolean {
//   if (stores.baseStore.increaseFeedDisplayed) {
//     //Home en train d'être peuplé
//     return false;
//   }

//   const homeItems = stores.baseStore.feedItemsToDisplay;
//   const homeItemsImages: string[] = homeItems.map((item) => {
//     return item.image_url;
//   });
//   const homeItemsImagesEmpty = homeItemsImages.filter((urlImage) => {
//     return urlImage === "" || urlImage === undefined;
//   });

//   const result: boolean = homeItemsImagesEmpty.length < homeItems.length * 0.2;

//   console.log(homeItemsImagesEmpty.length);
//   console.log(homeItems);

//   return result;
// }
