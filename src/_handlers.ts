import { DataStore } from "./states/DataStore";
import { IAtom, KnowbookID, AtomID } from "./types";
import { CONFIG_FETCHING } from "./config";
import Router from "next/router";
import { UIStore } from "./states/UIStore";

interface IonInput {
  value: string;
  syntheticEvent: any;
}
interface IonChecked {
  checked: boolean;
  syntheticEvent: any;
}

//SearchBar
export const onSearchHome = (uiStore: UIStore) => (input: IonInput): void => {
  uiStore.setSearchPattern(input.value);
  if (uiStore.searchPattern.length > CONFIG_FETCHING.search_min_length_search) {
    Router.push({
      pathname: "/",
      query: { q: encodeURI(uiStore.searchPattern), a: "s" },
    });
  }
};

//Save Atom Card
export const onSaved = (dataStore: DataStore) => (
  itemID: AtomID
) => (): void => {
  if (
    dataStore.saved.has(itemID) === undefined ||
    dataStore.saved.has(itemID) === false
  ) {
    dataStore.addSaved(itemID);
  } else {
    dataStore.removeSaved(itemID);
  }
};

export const isItemSavedActivated = (dataStore: DataStore) => (
  itemID: AtomID
) => {
  return dataStore.IsAtomInAnyKnowbook(itemID);
};

export const isItemSaved = (dataStore: DataStore) => (itemID: AtomID) => {
  if (dataStore.saved.has(itemID) === undefined) {
    return false;
  }
  if (dataStore.saved.has(itemID)) {
    return true;
  } else {
    return false;
  }
};

//Edit Knowbooks (open Edition Window)
export const onEditKnowbooks = (uiStore: UIStore, dataStore: DataStore) => (
  itemId: AtomID
) => (): void => {
  uiStore.setSelectedAtomId(itemId);
  uiStore.setEditKnowbookOpened(true);
  uiStore.initKnowbookEditionElements(itemId, dataStore);
};
export const onCancelEditKnowbooks = (uiStore: UIStore) => (): void => {
  uiStore.setEditKnowbookOpened(false);
};
export const onChangeInputValueEditKnowbooks = (uiStore: UIStore) => (
  input: IonInput
): void => {
  uiStore.UpdateNewTag(input.value);
};
export const onChangeKnwobooksInclusionEditKnowbooks = (uiStore: UIStore) => (
  tag: KnowbookID
) => (input: IonChecked): void => {
  uiStore.UpdateKnwobooksInclusion(tag, input.checked);
};

export const onSubmitChangesEditKnowbooks = (
  uiStore: UIStore,
  dataStore: DataStore
) => (itemId: AtomID) => (): void => {
  if (itemId === undefined) {
    return;
  }

  //const atom = dataStore.getAtom(item);
  if (uiStore.knowbookEditionNewTag.length !== 0) {
    dataStore.addAtomInKnowbook(uiStore.knowbookEditionNewTag, itemId);
  }

  uiStore.knowbookEditionInclusion.forEach((value, key) => {
    if (value === true) {
      dataStore.addAtomInKnowbook(key, itemId);
    } else {
      dataStore.removeAtomFromKnowbook(key, itemId);
    }
  });

  uiStore.setEditKnowbookOpened(false);
};
