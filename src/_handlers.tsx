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
export const onSaved = (dataStore: DataStore) => (item: IAtom) => (): void => {
  const condition = Array.from(dataStore.saved.keys()).includes(item.id);
  if (condition) {
    dataStore.removeSaved(item);
  } else {
    dataStore.addSaved(item);
  }
};

//Edit Knowbooks (open Edition Window)
export const onEditKnowbooks = (uiStore: UIStore, dataStore: DataStore) => (
  item: IAtom
) => (): void => {
  uiStore.setSelectedAtomId(item.id);
  uiStore.setEditKnowbookOpened(true);
  uiStore.initKnowbookEditionElements(item.id, dataStore);
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
) => (item: AtomID) => (): void => {
  if (item === undefined) {
    return;
  }

  const atom = dataStore.saved.get(item);
  if (uiStore.knowbookEditionNewTag.length !== 0) {
    dataStore.addAtomInKnowbook(uiStore.knowbookEditionNewTag, atom);
  }

  uiStore.knowbookEditionInclusion.forEach((value, key) => {
    if (value === true) {
      dataStore.addAtomInKnowbook(key, atom);
    } else {
      dataStore.removeAtomFromKnowbook(key, atom);
    }
  });

  uiStore.setEditKnowbookOpened(false);
};

// export const openLink = (url: string) => (): void => {
//   window.open(url);
//   // console.log(url);
// };
