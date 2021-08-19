import { staticKnowbooks } from "../config/configStaticKnowbooks";
import {
  IKnowbookStatic,
  IparamsPage,
  IRelatedAtom,
  initStateCat,
  ConfigDisplay,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getStaticKnowbooksLocal } from "./apiItems";
import { api_getUser } from "./apiUser";
import {
  initialyzeMostviewed,
  setFeedFromMostviewedAndRelated,
} from "./helpersBase";
import { readRelatedFromItem } from "./helpersRelated";

export async function initializeApp(stores: IStores, paramsPage: IparamsPage) {
  try {
    if (stores.baseStore.initCompleted.core === undefined) {
      stores.uiStore.setShowLoading(true);
      /****************Core Blocking*******************************/
      stores.baseStore.setInitCompleted(initStateCat.core, false);

      //To be checked if buggy...
      stores.baseStore.clearHistory();
      stores.baseStore.clearRelated();
      stores.savedStore.clearSaved();
      stores.knowbookStore.clearStaticKnowbooks();
      stores.knowbookStore.clearKnowbooks();

      // stores.baseStore.setscreenNoSSR();
      await stores.baseStore.setParamsPageAndGUICONFIGFromParamsPageData(
        paramsPage
      );

      stores.baseStore.setGUICONFIGFromDisplay(ConfigDisplay.mobile);

      const user = await api_getUser();
      stores.baseStore.setUser({ username: user });

      //Mostviewed
      await initialyzeMostviewed(stores);

      stores.baseStore.setInitCompleted(initStateCat.core, true);
      /************************************************************/
      stores.uiStore.setShowLoading(false);
    } else if (stores.baseStore.initCompleted.core !== true) {
      return;
    }

    if (stores.baseStore.initCompleted.staticKnowbooks === undefined) {
      stores.baseStore.setInitCompleted(initStateCat.staticKnowbooks, false);
      //Static knowbooks
      // await initializeStaticKnowbooks(stores);
      initializeStaticKnowbooks(stores);
      stores.baseStore.setInitCompleted(initStateCat.staticKnowbooks, true);
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

      setFeedFromMostviewedAndRelated(
        stores,
        stores.baseStore.GUI_CONFIG.display.amount_item_displayed
      );

      //Knowbooks
      if (stores.baseStore.isLogged) {
        const helpersInitializeLogged = await import(
          "./helpersInitializeLogged"
        );
        helpersInitializeLogged.initializeKnowbooksLogged(stores);
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
  const staticKnowbooks_local_all = staticKnowbooks;
  const staticKnowbooks_local = staticKnowbooks_local_all.filter((knowbook) => {
    return (
      knowbook.lang === "" || knowbook.lang === stores.baseStore.paramsPage.lang
    );
  });

  //   image_paths_list = image_paths_list.filter((item) => {
  //     return item !== "";
  //   });
  try {
    for (const item of staticKnowbooks_local) {
      const knowbook_json: any = await api_getStaticKnowbooksLocal(
        item.nameOrPeriod,
        lang
      );
      const knowbook: IKnowbookStatic = {
        id: -1, //id not used in front but only in back
        language: lang,
        name: knowbook_json.nameOrPeriod,
        name_display: knowbook_json.name_display,
        items: knowbook_json.items,
      };
      stores.knowbookStore.setStaticKnowbooks(knowbook.name, knowbook);

      //IMPORTANT: not necessary anymore with new implementation of AllRelatedItemsFromSaved
      //add static knowbook items in history (for getItemFromAnyRelated), with their related items
      //related items added in "related" BUT NOT in RelatedAll used in feed
      stores.baseStore.setHistory(knowbook.items);
      knowbook.items.forEach((item) => {
        const related: IRelatedAtom[] = readRelatedFromItem(item);
        stores.baseStore.setRelated(item.id, related);
        const related_items = related.map((related) => {
          return related.item;
        });
        stores.baseStore.setHistory(related_items);
      });
    }
  } catch (err) {
    // console.log("error in getting static knowbooks...");
  }
}
