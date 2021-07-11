import { staticKnowbooks } from "../config/configStaticKnowbooks";
import {
  IKnowbookStatic,
  IparamsPage,
  IRelatedAtom,
  initStateCat,
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
  // stores.uiStore.setShowLoading(true);
  // await stores.baseStore.setParamsPageAndGUICONFIGFromParamsPageData(
  //   paramsPage
  // );
  try {
    if (stores.baseStore.initCompleted.app === undefined) {
      stores.baseStore.setInitCompleted(initStateCat.app, false);

      stores.baseStore.setscreenNoSSR();
      await stores.baseStore.setParamsPageAndGUICONFIGFromParamsPageData(
        paramsPage
      );

      const user = await api_getUser();
      stores.baseStore.setUser({ username: user });

      initializeSaved(stores);

      stores.baseStore.setInitCompleted(initStateCat.app, true);
    }
  } catch (error) {
    // console.log(error);
  }

  // stores.uiStore.setShowLoading(false);
}

export async function initializeSaved(stores: IStores) {
  // stores.uiStore.setShowLoading(true);
  if (stores.baseStore.initCompleted.saved === undefined) {
    stores.baseStore.setInitCompleted(initStateCat.saved, false);
    if (stores.baseStore.isLogged) {
      const helpersInitializeLogged = await import("./helpersInitializeLogged");
      await helpersInitializeLogged.initializeSavedLogged(stores);
    } else {
      stores.savedStore.clearSaved();
      stores.baseStore.clearRelatedAndRelatedAll();
    }
    stores.baseStore.setInitCompleted(initStateCat.saved, true);
  }
  // stores.uiStore.setShowLoading(false);
}

export async function initializeFeed(stores: IStores) {
  // stores.uiStore.setShowLoading(true);
  if (
    stores.baseStore.initCompleted.feed === undefined &&
    stores.baseStore.initCompleted.app === true
  ) {
    // try {
    stores.baseStore.setInitCompleted(initStateCat.feed, false);

    const amount_item_displayed =
      stores.baseStore.GUI_CONFIG.display.amount_item_displayed;
    await initialyzeMostviewed(stores);
    setFeedFromMostviewedAndRelated(stores, amount_item_displayed);

    stores.baseStore.setInitCompleted(initStateCat.feed, true);

    // } catch (error) {
    //   console.log(error);
    // }
  }
  // stores.uiStore.setShowLoading(false);
}

export async function initializeKnowbooks(stores: IStores) {
  // stores.uiStore.setShowLoading(true);
  // try {
  if (
    stores.baseStore.initCompleted.staticKnowbooks === undefined &&
    stores.baseStore.initCompleted.app === true
  ) {
    stores.baseStore.setInitCompleted(initStateCat.staticKnowbooks, false);
    await initializeStaticKnowbooks(stores);
    stores.baseStore.setInitCompleted(initStateCat.staticKnowbooks, true);
  }
  // } catch (error) {
  //   // console.log(error);
  // }

  if (
    stores.baseStore.initCompleted.knowbooks === undefined &&
    stores.baseStore.initCompleted.app === true
  ) {
    stores.baseStore.setInitCompleted(initStateCat.knowbooks, false);

    if (stores.baseStore.isLogged) {
      const helpersInitializeLogged = await import("./helpersInitializeLogged");
      await helpersInitializeLogged.initializeKnowbooksLogged(stores);
    } else {
      stores.knowbookStore.clearKnowbooks();
    }
    stores.baseStore.setInitCompleted(initStateCat.knowbooks, true);
  }

  // stores.uiStore.setShowLoading(false);
}

export async function initializeStaticKnowbooks(stores: IStores) {
  //Static Knowbooks
  const lang = stores.baseStore.paramsPage.lang;
  const staticKnowbooks_local = staticKnowbooks;
  try {
    for (const item of staticKnowbooks_local) {
      const knowbook_json: any = await api_getStaticKnowbooksLocal(
        item.nameOrPeriod,
        lang
      );
      const knowbook: IKnowbookStatic = {
        id: -1, //id not used in front but only in back
        name: knowbook_json.nameOrPeriod,
        name_display: knowbook_json.name_display,
        items: knowbook_json.items,
      };
      stores.knowbookStore.setStaticKnowbooks(knowbook.name, knowbook);

      //IMPORTANT
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
