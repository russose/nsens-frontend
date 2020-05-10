import { DataStore } from "./states/DataStore";
import { IAtom } from "./types";
import { CONFIG_FETCHING } from "./config";
import Router from "next/router";

interface IonSearchInput {
  value: string;
  syntheticEvent: any;
}

//SearchBar
export const onSearchHome = (dataStore: DataStore) => (
  input: IonSearchInput
): void => {
  dataStore.setSearchPattern(input.value);
  if (
    dataStore.searchPattern.length > CONFIG_FETCHING.search_min_length_search
  ) {
    Router.push({
      pathname: "/",
      query: { q: encodeURI(dataStore.searchPattern), a: "s" },
    });
  }
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
