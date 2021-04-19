import { KnowbookID, AtomID, eventT } from "../common/globals";
import { IStores } from "../stores/_RootStore";
import {
  _login,
  _signup,
  _logout,
  _getValidationNewPassword,
  _setNewPassword,
} from "../libs/_apiUserData";

/******************* Edit Knowbooks ************************************ */

export const onCancel = (stores: IStores) => (): void => {
  stores.uiStore.setEditKnowbookOpened(false);
  stores.uiStore.setRenameKnowbookOpened(false);
};

export const onEditKnowbooks = (stores: IStores) => (
  itemId: AtomID
) => (input: { event: eventT }): void => {
  stores.uiStore.setSelectedAtom(itemId, "title");
  stores.uiStore.initKnowbookEditionElements(itemId, stores);
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
    if (value === true && !stores.knowbookStore.isItemInKnowbook(itemId, key)) {
      stores.knowbookStore.addItemInKnowbook(key, itemId);
    } else if (
      value === false &&
      stores.knowbookStore.isItemInKnowbook(itemId, key)
    ) {
      stores.knowbookStore.removeItemFromKnowbook(key, itemId);
    }
  });

  const knowbookIds: KnowbookID[] = Array.from(
    stores.knowbookStore.knowbooks.keys()
  );
  const value = stores.uiStore.editKnowbookNewValue;
  if (value.length !== 0) {
    if (knowbookIds.includes(value)) {
      if (!stores.knowbookStore.isItemInKnowbook(itemId, value)) {
        stores.knowbookStore.addItemInKnowbook(
          stores.uiStore.editKnowbookNewValue,
          itemId
        );
      }
    } else {
      stores.knowbookStore.addItemInKnowbook(value, itemId);
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
  stores.knowbookStore.renameKnowbook(
    stores.uiStore.selectedKnowbookIdName,
    stores.uiStore.renameKnowbookNewName
  );
  stores.uiStore.setRenameKnowbookOpened(false);
};

export const onDeleteKnowbook = (stores: IStores) => (
  name: KnowbookID
) => (input: { event: eventT }): void => {
  stores.knowbookStore.deleteKnowbook(name, stores);
  input.event.preventDefault();
};
