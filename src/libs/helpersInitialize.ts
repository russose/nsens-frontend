import { staticKnowbooks } from "../config/configStaticKnowbooks";
import { IGUICONFIG, IKnowbookStatic, IRelatedAtom } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getStaticKnowbooksLocal } from "./apiItems";
import { api_getUser } from "./apiUser";
import {
  initialyzeMostviewed,
  setFeedFromMostviewedAndRelated,
} from "./helpersBase";
import { readRelatedFromItem } from "./helpersRelated";

export function initialize(stores: IStores, GUI_CONFIG: IGUICONFIG) {
  stores.baseStore.setParamsPageFromGUICONFIG(GUI_CONFIG);
  if (stores.baseStore.user === null) {
    //Not initialyzed
    initializeApp(stores);
  }
}

async function initializeApp(stores: IStores) {
  try {
    const user = await api_getUser();
    stores.baseStore.setUser({ username: user });
    stores.uiStore.setShowLoading(true);
    if (!stores.baseStore.isLogged) {
      // await initializeUserData(stores);
      initializeUserData(stores);
    } else {
      const initializeUserDataLogged = await import(
        "./helpersInitializeLogged"
      );
      initializeUserDataLogged.initializeUserDataLogged(stores);
      // await initializeUserDataLogged(stores);
    }
    stores.uiStore.setShowLoading(false);
  } catch (error) {
    // console.log(error);
  }
}

export async function initializeUserData(stores: IStores) {
  stores.savedStore.clearSaved();
  stores.knowbookStore.clearKnowbooks();
  // await initializeUserDataCommon(stores);
  initializeUserDataCommon(stores);
}

export async function initializeUserDataCommon(stores: IStores) {
  const amount_item_displayed =
    stores.baseStore.GUI_CONFIG.display.amount_item_displayed;

  await initialyzeMostviewed(stores);
  setFeedFromMostviewedAndRelated(stores, amount_item_displayed);

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
