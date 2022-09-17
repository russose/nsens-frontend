import { IAtom } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getKnowbooksList, api_getSavedList } from "./apiUserData";

export async function initializeSavedLogged(stores: IStores) {
  try {
    const saved: IAtom[] = await api_getSavedList(
      stores.baseStore.paramsPage.lang
    );
    await stores.savedStore.setSaved(saved, true);

    // initialyzeRelatedFromSaved(stores);
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
