import { IAtom, IKnowbook } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getMyFollowedPublicKnowbooksNoItems } from "./apiPublicKnowbooks";
import { api_getKnowbooksList, api_getSavedList } from "./apiUserData";

export async function initializeSavedLogged(stores: IStores) {
  try {
    const saved: IAtom[] = await api_getSavedList(
      stores.baseStore.paramsPage.lang
    );
    await stores.savedStore.setSavedWithHistory(saved, true);
  } catch (error) {
    // console.log(error);
  }
}

export async function initializeMyKnowbooksLogged(stores: IStores) {
  try {
    const knowbooks = await api_getKnowbooksList(
      stores.baseStore.paramsPage.lang
    );

    //complete the username for own knowbooks
    knowbooks.forEach((knowbook) => {
      knowbook.owner_username = stores.baseStore.user.username;
    });

    stores.knowbookStore.setKnowbooksFromList(knowbooks);

    for (const knowbook of knowbooks) {
      stores.savedStore.setSaved(knowbook.items);
      // Remove my public knowbooks from publicKnowbooks to have them only in myKnowbooks
      // if (knowbook.public) {
      //   stores.knowbookStore.deletePublicKnowbook({
      //     name: knowbook.name,
      //     owner: knowbook.owner,
      //   });
      // }
    }
  } catch (error) {
    // console.log(error);
  }
}

export async function initializeMyFollowedKnowbooks(stores: IStores) {
  const lang = stores.baseStore.paramsPage.lang;
  const myFollowedPublicKnowbooks: IKnowbook[] =
    await api_getMyFollowedPublicKnowbooksNoItems(lang);
  stores.knowbookStore.setFollowedPublicKnowbooks(myFollowedPublicKnowbooks);
}
