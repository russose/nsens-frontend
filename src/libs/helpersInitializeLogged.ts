import { IStores } from "../stores/RootStore";
import { api_getKnowbooksList, api_getSavedList } from "./apiUserData";
import { initialyzeRelatedAndRelatedAllFromSaved } from "./helpersRelated";

export async function initializeSavedLogged(stores: IStores) {
  try {
    const saved = await api_getSavedList(stores.baseStore.paramsPage.lang);
    stores.savedStore.setSaved(saved);
    initialyzeRelatedAndRelatedAllFromSaved(stores);
  } catch (error) {
    // console.log(error);
  }
}

export async function initializeKnowbooksLogged(stores: IStores) {
  try {
    const knowbooks = await api_getKnowbooksList(
      stores.baseStore.paramsPage.lang
    );
    stores.knowbookStore.setKnowbooksFromList(knowbooks);
  } catch (error) {
    // console.log(error);
  }
}
