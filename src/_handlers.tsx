import { DataStore } from "./states/DataStore";

interface IonSearchInput {
  value: string;
  syntheticEvent: any;
}

//SearchBar
export const onSearchHome = (dataStore: DataStore) => (
  input: IonSearchInput
): void => {
  dataStore.searchAtomsFromWeb(input.value);
};

//Save and Like
export const onSavedClick = (dataStore: DataStore) => (
  id: number
) => (): void => {
  const condition = Array.from(dataStore.saved.keys()).includes(id);
  if (condition) {
    dataStore.removeSaved(id);
  } else {
    dataStore.addSaved(id);
  }
};

export const openLink = (url: string) => (): void => {
  window.open(url);
  // console.log(url);
};

// export const onImageClick = (pageLayoutStore: PageLayoutStore) => (
//   pagelayout: string,
//   id: number
// ) => (): void => {
//   pageLayoutStore.changePage(pagelayout);
//   pageLayoutStore.setselectedDavizId(id);
// };
