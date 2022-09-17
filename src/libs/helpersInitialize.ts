import {
  IparamsPage,
  initStateCat,
  configGeneral,
  IGUICONFIG,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getUser } from "./apiUser";
import { initDemo } from "./helpersBase";

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

    if (stores.baseStore.initCompleted.core === undefined) {
      stores.baseStore.setInitCompleted(initStateCat.core, false);

      stores.baseStore.init();
      stores.knowbookStore.init();
      stores.savedStore.init();
      stores.uiStore.init();

      stores.baseStore.setScreenNoSSR();
      // stores.baseStore.adaptSVGDimensions();

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

      stores.baseStore.setInitCompleted(initStateCat.core, true);
      /************************************************************/
      // stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, false);
    }
    // else if (stores.baseStore.initCompleted.core !== true) {
    //   return;
    // }

    if (stores.baseStore.initCompleted.userData === undefined) {
      stores.baseStore.setInitCompleted(initStateCat.userData, false);

      const user = await api_getUser();
      stores.baseStore.setUser({ username: user });

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

// export async function initializeApp(
//   stores: IStores,
//   paramsPage: IparamsPage,
//   GUI_CONFIG: IGUICONFIG
// ) {
//   try {
//     console.log("***************");
//     console.log("initializeApp 1", stores.baseStore.initCompleted.core);
//     console.log("initializeApp 1", GUI_CONFIG.language.searchBar);
//     if (stores.baseStore.initCompleted.core === undefined) {
//       // stores.uiStore.setShowLoading(true);
//       stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, true);
//       /****************Core Blocking*******************************/
//       stores.baseStore.setInitCompleted(initStateCat.core, false);

//       stores.baseStore.init();
//       stores.knowbookStore.init();
//       stores.savedStore.init();
//       stores.uiStore.init();

//       stores.baseStore.setParamsPage(paramsPage);
//       stores.baseStore.SetGUI_CONFIG(GUI_CONFIG);

//       console.log(
//         "initializeApp 2",
//         stores.baseStore.GUI_CONFIG.language.searchBar
//       );

//       stores.baseStore.setScreenNoSSR();
//       // stores.baseStore.adaptSVGDimensions();

//       await initializeMostviewed(stores);
//       //Static knowbooks Extracts (small less blocking)
//       await initializeStaticKnowbooksExtract(stores);
//       updateHome(stores);

//       if (configGeneral.demoModeForScreenshoots) {
//         const helpersBase = await import("./helpersBase");
//         await helpersBase.initDemo(stores);
//       }

//       stores.baseStore.setInitCompleted(initStateCat.core, true);
//       /************************************************************/
//       stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, false);
//     } else if (stores.baseStore.initCompleted.core !== true) {
//       return;
//     }

//     if (stores.baseStore.initCompleted.userData === undefined) {
//       stores.baseStore.setInitCompleted(initStateCat.userData, false);

//       const user = await api_getUser();
//       stores.baseStore.setUser({ username: user });

//       // Saved Items and Knowbooks
//       if (stores.baseStore.isLogged) {
//         //Init PageHeaderMode
//         // stores.uiStore.setPageHeaderMode(
//         //   TPages.Home,
//         //   TPageHeaderModes.homeUserKnowbooks
//         // );

//         const helpersInitializeLogged = await import(
//           "./helpersInitializeLogged"
//         );
//         await helpersInitializeLogged.initializeSavedLogged(stores);
//         helpersInitializeLogged.initializeKnowbooksLogged(stores);
//       } else {
//         stores.savedStore.clearSaved();
//         stores.baseStore.clearRelated();
//         stores.knowbookStore.clearKnowbooks();
//       }

//       stores.baseStore.setInitCompleted(initStateCat.userData, true);
//     }
//   } catch (error) {
//     // console.log(error);
//   }
// }

// async function initializeStaticKnowbooksExtract(stores: IStores) {
//   //Static Knowbooks
//   const lang = stores.baseStore.paramsPage.lang;
//   const staticKnowbooks_local_extract_all: IStaticKnowbookWithItemsDefinition[] =
//     await api_getAllStaticKnowbooksExtractWithItemsLocal(lang);

//   for (const staticKnowbooks_extract of staticKnowbooks_local_extract_all) {
//     const knowbook: IKnowbookStatic = {
//       id: -1, //id not used in front but only in back
//       language: lang,
//       type: staticKnowbooks_extract.type,
//       name: staticKnowbooks_extract.nameOrPeriod,
//       name_display: staticKnowbooks_extract.name_display,
//       items: staticKnowbooks_extract.items,
//     };
//     stores.knowbookStore.setStaticKnowbooks(knowbook.name, knowbook);
//     //Force feed update when api_getAllStaticKnowbooksExtractWithItemsLocal completed (otherwise first init fails)
//     // Issue here????
//     //setFeedForHome(stores);

//     stores.baseStore.setHistory(knowbook.items);
//   }
// }

// export async function initializeStaticKnowbooksFullSinglePage(
//   stores: IStores,
//   nameOrPeriod: KnowbookID
// ) {
//   const staticKnowbook: IKnowbookStatic =
//     stores.knowbookStore.staticKnowbooks.get(nameOrPeriod);

//   if (
//     staticKnowbook === undefined ||
//     staticKnowbook.items.length <=
//       configFetching.staticKnowbooks.amount_extractStaticKnowbooks
//   ) {
//     stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, true);
//     await initializeStaticKnowbookFullSingle(stores, nameOrPeriod);
//     stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, false);
//   }
// }

// export async function initializeStaticKnowbookFullSingle(
//   stores: IStores,
//   nameOrPeriod: KnowbookID
// ) {
//   //Static Knowbooks
//   const lang = stores.baseStore.paramsPage.lang;
//   const staticKnowbooks_local_all: IStaticKnowbookDefinition[] =
//     await api_getAllStaticKnowbooksLocal();
//   const staticKnowbook_local = staticKnowbooks_local_all.filter((knowbook) => {
//     return (
//       knowbook.lang === stores.baseStore.paramsPage.lang &&
//       knowbook.nameOrPeriod === nameOrPeriod
//     );
//   })[0];

//   try {
//     const knowbook_json: any = await api_getStaticKnowbookWithItemsLocal(
//       staticKnowbook_local.nameOrPeriod,
//       lang
//     );
//     const knowbook: IKnowbookStatic = {
//       id: -1, //id not used in front but only in back
//       language: lang,
//       type: knowbook_json.type,
//       name: knowbook_json.nameOrPeriod,
//       name_display: knowbook_json.name_display,
//       items: knowbook_json.items,
//     };
//     stores.knowbookStore.setStaticKnowbooks(knowbook.name, knowbook);

//     stores.baseStore.setHistory(knowbook.items, true);

//     knowbook.items.forEach((atom) => {
//       const related: IRelatedAtomFull[] = readRelatedStringFromItem(atom);
//       stores.baseStore.setRelated(atom.id, related);
//     });
//   } catch (err) {
//     // console.log("error in getting static knowbooks...");
//   }
// }
