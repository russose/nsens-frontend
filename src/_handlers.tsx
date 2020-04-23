import { PageLayoutStore } from "./states/PageLayoutStore";
import { DataStore } from "./states/DataStore";

interface IonSearchInput {
  value: string;
  syntheticEvent: any;
}

//SearchBar
export const onSearch = (pageLayoutStore: PageLayoutStore) => (
  input: IonSearchInput
): void => {
  pageLayoutStore.setSearchPattern(input.value);
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
  console.log(id);
};

// export const onLikedClick = (dataStore: DataStore) => (
//   id: number
// ) => (): void => {
//   const condition = Array.from(dataStore.liked.keys()).includes(id);
//   if (condition) {
//     dataStore.removeLiked(id);
//   } else {
//     dataStore.addLiked(id);
//   }
// };

export const openLink = (url: string) => (): void => {
  window.open(url);
  console.log(url);
};

//Change page
// export const onChangePageClick = (pageLayoutStore: PageLayoutStore) => (
//   pagelayout: string
// ) => (): void => {
//   pageLayoutStore.changePage(pagelayout);
// };

// export const onImageClick = (pageLayoutStore: PageLayoutStore) => (
//   pagelayout: string,
//   id: number
// ) => (): void => {
//   pageLayoutStore.changePage(pagelayout);
//   pageLayoutStore.setselectedDavizId(id);
// };
