import {
  KnowbookID,
  AtomID,
  eventT,
  TUiBooleanStorage,
  TUiStringStorage,
} from "../config/globals";
import {
  addItemInKnowbook,
  deleteKnowbook,
  initKnowbookEditionElements,
  isItemInKnowbook,
  removeItemFromKnowbook,
  renameKnowbook,
} from "../libs/helpersSavedKnowbooks";
import { IStores } from "../stores/RootStore";

/******************* Edit Knowbooks ************************************ */

export const onCancelEditKnowbook = (stores: IStores) => (): void => {
  stores.uiStore.setUiBooleanStorage(
    TUiBooleanStorage.editKnowbookOpened,
    false
  );
  stores.uiStore.setUiBooleanStorage(
    TUiBooleanStorage.renameKnowbookOpened,
    false
  );
};

export const onEditKnowbooks =
  (stores: IStores) =>
  (itemId: AtomID) =>
  (input: { event: eventT }): void => {
    stores.uiStore.setSelectedAtom(itemId, "title");
    initKnowbookEditionElements(itemId, stores);
    stores.uiStore.setUiBooleanStorage(
      TUiBooleanStorage.editKnowbookOpened,
      true
    );
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

export const onChangeInputValueEditKnowbooks =
  (stores: IStores) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
    stores.uiStore.setUiStringStorage(
      TUiStringStorage.editKnowbookNewValue,
      input.value
    );
  };

export const onChangeKnwobooksInclusionEditKnowbooks =
  (stores: IStores) =>
  (tag: KnowbookID) =>
  (input: { checked: boolean; syntheticEvent: eventT }): void => {
    stores.uiStore.setEditKnowbookMembers(tag, input.checked);
  };

export const onSubmitChangesEditKnowbooks =
  (stores: IStores) => (itemId: AtomID) => (): void => {
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
    const value = stores.uiStore.getUiStringStorage(
      TUiStringStorage.editKnowbookNewValue
    );
    if (value.length !== 0) {
      if (knowbookIds.includes(value)) {
        if (!isItemInKnowbook(itemId, value, stores)) {
          addItemInKnowbook(
            stores.uiStore.getUiStringStorage(
              TUiStringStorage.editKnowbookNewValue
            ),
            itemId,
            stores
          );
        }
      } else {
        addItemInKnowbook(value, itemId, stores);
      }
    }

    stores.uiStore.setUiBooleanStorage(
      TUiBooleanStorage.editKnowbookOpened,
      false
    );
  };

/******************* Rename or Delete Knowbook ************************************ */

export const onOpenRenameKnowbook =
  (stores: IStores) =>
  (name: KnowbookID) =>
  (input: { event: eventT }): void => {
    stores.uiStore.setSelectedKnowbookIdName(name);
    stores.uiStore.setUiStringStorage(
      TUiStringStorage.renameKnowbookNewName,
      name
    );
    stores.uiStore.setUiBooleanStorage(
      TUiBooleanStorage.renameKnowbookOpened,
      true
    );
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

export const onChangeInputValueRenameKnowbook =
  (stores: IStores) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
    stores.uiStore.setUiStringStorage(
      TUiStringStorage.renameKnowbookNewName,
      input.value
    );
  };

export const onRenameKnowbook = (stores: IStores) => (): void => {
  renameKnowbook(
    stores.uiStore.selectedKnowbookIdName,
    stores.uiStore.getUiStringStorage(TUiStringStorage.renameKnowbookNewName),
    stores
  );
  stores.uiStore.setUiBooleanStorage(
    TUiBooleanStorage.renameKnowbookOpened,
    false
  );
};

export const onDeleteKnowbook =
  (stores: IStores) =>
  (name: KnowbookID) =>
  (input: { event: eventT }): void => {
    deleteKnowbook(name, stores);
    // input.event.preventDefault();
    input.event.stopPropagation();
  };
