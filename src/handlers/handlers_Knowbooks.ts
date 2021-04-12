import { SavedStore } from "../stores/SavedStore";
import { KnowbookID, AtomID, eventT } from "../common/types";
import { UIStore } from "../stores/UIStore";
import {
  _login,
  _signup,
  _logout,
  _getValidationNewPassword,
  _setNewPassword,
} from "../_api";
import { KnowkookStore } from "../stores/KnowkookStore";

/******************* Edit Knowbooks ************************************ */

export const onCancel = (uiStore: UIStore) => (): void => {
  uiStore.setEditKnowbookOpened(false);
  uiStore.setRenameKnowbookOpened(false);
};

export const onEditKnowbooks = (
  uiStore: UIStore,
  knowbookStore: KnowkookStore
) => (itemId: AtomID) => (input: { event: eventT }): void => {
  uiStore.setSelectedAtom(itemId, "title");
  uiStore.initKnowbookEditionElements(itemId, knowbookStore);
  uiStore.setEditKnowbookOpened(true);
  input.event.preventDefault();
};

export const onChangeInputValueEditKnowbooks = (uiStore: UIStore) => (input: {
  value: string;
  syntheticEvent: eventT;
}): void => {
  uiStore.setEditKnowbookNewValue(input.value);
};

export const onChangeKnwobooksInclusionEditKnowbooks = (uiStore: UIStore) => (
  tag: KnowbookID
) => (input: { checked: boolean; syntheticEvent: eventT }): void => {
  uiStore.setEditKnowbookMembers(tag, input.checked);
};

export const onSubmitChangesEditKnowbooks = (
  uiStore: UIStore,
  knowbookStore: KnowkookStore
) => (itemId: AtomID) => (): void => {
  if (itemId === undefined) {
    return;
  }

  uiStore.editKnowbookMembers.forEach((value, key) => {
    if (value === true && !knowbookStore.isItemInKnowbook(itemId, key)) {
      knowbookStore.addItemInKnowbook(key, itemId);
    } else if (value === false && knowbookStore.isItemInKnowbook(itemId, key)) {
      knowbookStore.removeItemFromKnowbook(key, itemId);
    }
  });

  const knowbookIds: KnowbookID[] = Array.from(knowbookStore.knowbooks.keys());
  const value = uiStore.editKnowbookNewValue;
  if (value.length !== 0) {
    if (knowbookIds.includes(value)) {
      if (!knowbookStore.isItemInKnowbook(itemId, value)) {
        knowbookStore.addItemInKnowbook(uiStore.editKnowbookNewValue, itemId);
      }
    } else {
      knowbookStore.addItemInKnowbook(value, itemId);
    }
  }

  uiStore.setEditKnowbookOpened(false);
};

/******************* Rename or Delete Knowbook ************************************ */

export const onOpenRenameKnowbook = (uiStore: UIStore) => (
  name: KnowbookID
) => (input: { event: eventT }): void => {
  uiStore.setSelectedKnowbookIdName(name);
  uiStore.setRenameKnowbookNewName(name);
  uiStore.setRenameKnowbookOpened(true);
  input.event.preventDefault();
};

export const onChangeInputValueRenameKnowbook = (uiStore: UIStore) => (input: {
  value: string;
  syntheticEvent: eventT;
}): void => {
  uiStore.setRenameKnowbookNewName(input.value);
};

export const onRenameKnowbook = (
  uiStore: UIStore,
  knowbookStore: KnowkookStore
) => (): void => {
  knowbookStore.renameKnowbook(
    uiStore.selectedKnowbookIdName,
    uiStore.renameKnowbookNewName
  );
  uiStore.setRenameKnowbookOpened(false);
};

export const onDeleteKnowbook = (
  savedStore: SavedStore,
  knowbookStore: KnowkookStore
) => (name: KnowbookID) => (input: { event: eventT }): void => {
  knowbookStore.deleteKnowbook(name, savedStore);
  input.event.preventDefault();
};
