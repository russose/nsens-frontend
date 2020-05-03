import { DataStore } from "./states/DataStore";
import { IAtom } from "./types";

interface IonSearchInput {
  value: string;
  syntheticEvent: any;
}

//SearchBar
export const onSearchHome = (dataStore: DataStore) => (
  input: IonSearchInput
): void => {
  dataStore.setSearchPattern(input.value);
};

//Save
export const onSavedClick = (dataStore: DataStore) => (
  item: IAtom
) => (): void => {
  const condition = Array.from(dataStore.saved.keys()).includes(item.id);
  if (condition) {
    dataStore.removeSaved(item);
  } else {
    dataStore.addSaved(item);
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
