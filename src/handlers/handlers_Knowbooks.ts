import { KnowbookID, AtomID, eventT } from "../config/globals";
import {
  addItemInKnowbook,
  deleteKnowbook,
  isItemInKnowbook,
  removeItemFromKnowbook,
  renameKnowbook,
} from "../libs/helpersKnowbooks";
import { initKnowbookEditionElements } from "../libs/helpersUI";
import { IStores } from "../stores/_RootStore";

/******************* Edit Knowbooks ************************************ */

export const onCancel = (stores: IStores) => (): void => {
  stores.uiStore.setEditKnowbookOpened(false);
  stores.uiStore.setRenameKnowbookOpened(false);
};

export const onEditKnowbooks = (stores: IStores) => (
  itemId: AtomID
) => (input: { event: eventT }): void => {
  stores.uiStore.setSelectedAtom(itemId, "title");
  initKnowbookEditionElements(itemId, stores);
  stores.uiStore.setEditKnowbookOpened(true);
  input.event.preventDefault();
};

export const onChangeInputValueEditKnowbooks = (stores: IStores) => (input: {
  value: string;
  syntheticEvent: eventT;
}): void => {
  stores.uiStore.setEditKnowbookNewValue(input.value);
};

export const onChangeKnwobooksInclusionEditKnowbooks = (stores: IStores) => (
  tag: KnowbookID
) => (input: { checked: boolean; syntheticEvent: eventT }): void => {
  stores.uiStore.setEditKnowbookMembers(tag, input.checked);
};

export const onSubmitChangesEditKnowbooks = (stores: IStores) => (
  itemId: AtomID
) => (): void => {
  if (itemId === undefined) {
    return;
  }

  stores.uiStore.editKnowbookMembers.forEach((value, key) => {
    if (value === true && !isItemInKnowbook(itemId, key, stores)) {
      addItemInKnowbook(key, itemId, stores);
    } else if (value === false && isItemInKnowbook(itemId, key, stores)) {
      removeItemFromKnowbook(key, itemId, stores);
    }
  });

  const knowbookIds: KnowbookID[] = Array.from(
    stores.knowbookStore.knowbooks.keys()
  );
  const value = stores.uiStore.editKnowbookNewValue;
  if (value.length !== 0) {
    if (knowbookIds.includes(value)) {
      if (!isItemInKnowbook(itemId, value, stores)) {
        addItemInKnowbook(stores.uiStore.editKnowbookNewValue, itemId, stores);
      }
    } else {
      addItemInKnowbook(value, itemId, stores);
    }
  }

  stores.uiStore.setEditKnowbookOpened(false);
};

/******************* Rename or Delete Knowbook ************************************ */

export const onOpenRenameKnowbook = (stores: IStores) => (
  name: KnowbookID
) => (input: { event: eventT }): void => {
  stores.uiStore.setSelectedKnowbookIdName(name);
  stores.uiStore.setRenameKnowbookNewName(name);
  stores.uiStore.setRenameKnowbookOpened(true);
  input.event.preventDefault();
};

export const onChangeInputValueRenameKnowbook = (stores: IStores) => (input: {
  value: string;
  syntheticEvent: eventT;
}): void => {
  stores.uiStore.setRenameKnowbookNewName(input.value);
};

export const onRenameKnowbook = (stores: IStores) => (): void => {
  renameKnowbook(
    stores.uiStore.selectedKnowbookIdName,
    stores.uiStore.renameKnowbookNewName,
    stores
  );
  stores.uiStore.setRenameKnowbookOpened(false);
};

export const onDeleteKnowbook = (stores: IStores) => (
  name: KnowbookID
) => (input: { event: eventT }): void => {
  deleteKnowbook(name, stores);
  input.event.preventDefault();
};
