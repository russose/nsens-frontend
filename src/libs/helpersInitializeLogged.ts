import { IStores } from "../stores/RootStore";
import { api_getKnowbooksList, api_getSavedList } from "./apiUserData";
import { initializeUserDataCommon } from "./helpersInitialize";
import { initialyzeRelatedAndRelatedAllFromSaved } from "./helpersRelated";
// import { getKnowbookAtomsList } from "./helpersSavedKnowbooks";
// import { IKnowbook } from "../config/globals";

export async function initializeUserDataLogged(stores: IStores) {
  // await initializeUserDataCommon(stores);
  initializeUserDataCommon(stores);

  const saved = await api_getSavedList();
  stores.savedStore.setSaved(saved);

  initialyzeRelatedAndRelatedAllFromSaved(stores);
  const knowbooks = await api_getKnowbooksList();
  stores.knowbookStore.setKnowbooksFromList(knowbooks);

  //Export Knowbooks with "_"
  // let staticKnowbooks: any = [];
  // knowbooks.forEach((knowbook: IKnowbook) => {
  //   const element = {
  //     nameOrPeriod: knowbook.name,
  //     lang: "fr",
  //     items: getKnowbookAtomsList(knowbook.name, stores).map((item) => {
  //       return item.title;
  //     }),
  //   };
  //   if (element.nameOrPeriod.includes("_")) {
  //     staticKnowbooks.push(element);
  //   }
  // });
  // console.log(staticKnowbooks);
}
