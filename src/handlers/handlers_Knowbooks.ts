import {
  AtomID,
  IKnowbook,
  IKnowbookUpdate,
  KnowbookID,
  TKnowbookUpdateAction,
  TUiBooleanStorage,
  configPaths,
  eventT,
} from "../config/globals";
import {
  api_addPublicKnowbook,
  api_removePublicKnowbook,
} from "../libs/apiPublicKnowbooks";
import { closeAllDialogs, goPage } from "../libs/helpersBase";
import {
  IsItemInAnyKnowbook,
  addItemInKnowbookAndCreateKnowbook_Batch,
  deleteKnowbook,
  isItemInKnowbook,
  updateKnowbookProps,
} from "../libs/helpersSavedKnowbooks";
import { IStores } from "../stores/RootStore";

/******************* Follow Public Knowbooks ************************************ */

export const onFollowPublicKnowbook =
  (stores: IStores) =>
  (knowbook: IKnowbook) =>
  (input: { event: eventT }): void => {
    // prevent following own knowbooks
    if (
      knowbook === undefined ||
      knowbook.owner === stores.baseStore.user.userId
    ) {
      return;
    }

    if (stores.knowbookStore.followedPublicKnowbooks.has(knowbook.id)) {
      stores.knowbookStore.deleteFollowedPublicKnowbook(knowbook.id);
      api_removePublicKnowbook(knowbook.id);
    } else {
      stores.knowbookStore.setFollowedPublicKnowbooks([knowbook]);
      api_addPublicKnowbook(knowbook.id);
    }

    // input.event.preventDefault();
    input.event.stopPropagation();
  };

/******************* Edit Knowbooks ************************************ */

function initKnowbookEditionElements(atomID: AtomID, stores: IStores): void {
  stores.uiStore.clearEditKnowbookMembers();

  const knowbook_id_list = Array.from(stores.knowbookStore.knowbooks.keys());
  knowbook_id_list.forEach((knowbookId) => {
    stores.uiStore.setEditKnowbookMembers(
      knowbookId,
      isItemInKnowbook(atomID, knowbookId, stores)
    );
  });
}

export const onEditKnowbooks =
  (stores: IStores) =>
  (itemId: AtomID) =>
  (input: { event: eventT }): void => {
    stores.uiStore.setSelectedAtom(itemId, "title");
    initKnowbookEditionElements(itemId, stores);
    stores.uiStore.setUiBooleanStorage(
      TUiBooleanStorage.showEditKnowbooks,
      true
    );
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

export const onChangeKnwobooksInclusionEditKnowbooks =
  (stores: IStores) =>
  (id: KnowbookID) =>
  (input: { checked: boolean; syntheticEvent: eventT }): void => {
    stores.uiStore.setEditKnowbookMembers(id, input.checked);
  };

export const onSubmitChangesEditKnowbooks =
  (stores: IStores) =>
  (itemId: AtomID, newKnowbookName: string) =>
  (): void => {
    if (itemId === undefined) {
      return;
    }

    const actions: IKnowbookUpdate[] = [];

    stores.uiStore.editKnowbookMembers.forEach((value, id) => {
      const knowbook = stores.knowbookStore.knowbooks.get(id);
      const action = {
        KnowbookId: knowbook.id,
        KnowbookName: knowbook.name,
        itemId: itemId,
        action: TKnowbookUpdateAction.add,
      };
      if (value === true && !isItemInKnowbook(itemId, id, stores)) {
        // addItemInKnowbookAndCreateKnowbook(knowbook.name, itemId, stores);
        // action.action = TKnowbookUpdateAction.add;
        actions.push(action);
      } else if (value === false && isItemInKnowbook(itemId, id, stores)) {
        // removeItemFromKnowbook(id, itemId, stores);
        action.action = TKnowbookUpdateAction.delete;
        actions.push(action);
      }
    });

    // const knowbookNewName: IKnowbook[] = Array.from(
    //   stores.knowbookStore.knowbooks.values()
    // ).filter((knowbook) => {
    //   return knowbook.name === newKnowbookName;
    // });

    if (newKnowbookName.length !== 0) {
      // if (knowbookNewName.length !== 0) {
      //   if (!isItemInKnowbook(itemId, knowbookNewName[0].id, stores)) {
      //     // addItemInKnowbookAndCreateKnowbook(newKnowbookName, itemId, stores);
      //     actions.push({
      //       KnowbookId: knowbookNewName[0].id,
      //       KnowbookName: newKnowbookName,
      //       itemId: itemId,
      //       action: TKnowbookUpdateAction.add,
      //     });
      //   }
      // } else {
      //   // addItemInKnowbookAndCreateKnowbook(newKnowbookName, itemId, stores);
      //   actions.push({
      //     KnowbookId: knowbookNewName[0].id,
      //     KnowbookName: newKnowbookName,
      //     itemId: itemId,
      //     action: TKnowbookUpdateAction.add,
      //   });
      // }

      actions.push({
        // KnowbookId: knowbookNewName.length !== 0 ? knowbookNewName[0].id : -1,  // Only applicable for deletion
        KnowbookId: -1, // Only applicable for deletion
        KnowbookName: newKnowbookName,
        itemId: itemId,
        action: TKnowbookUpdateAction.add,
      });
    }

    addItemInKnowbookAndCreateKnowbook_Batch(actions, stores);

    closeAllDialogs(stores);
  };

/******************* Edit Knowbook Props ****************************************** */

export const onEditKnowbookProps =
  (stores: IStores) =>
  (knowbookId: KnowbookID) =>
  (input: { event: eventT }): void => {
    stores.uiStore.setSelectedKnowbook(knowbookId);
    // initKnowbookEditionElements(itemId, stores);
    stores.uiStore.setUiBooleanStorage(
      TUiBooleanStorage.showEditKnowbookProps,
      true
    );
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

export const onSubmitChangesEditKnowbooksProps =
  (stores: IStores) =>
  (
    knowbookId: KnowbookID,
    newName: string,
    newDescription: string,
    newSource: string,
    imageUrl: string,
    isPublic: string
  ) =>
  (): void => {
    updateKnowbookProps(
      stores,
      knowbookId,
      newName,
      newDescription,
      newSource,
      imageUrl,
      isPublic === "true" ? true : false
    );

    closeAllDialogs(stores);
  };

/******************* Delete Knowbook ************************************ */

export const onDeleteKnowbook =
  (stores: IStores) =>
  (knowbookId: KnowbookID) =>
  // (input: { event: eventT }): void => {
  () => {
    deleteKnowbook(knowbookId, stores);
    goPage(stores, configPaths.pages.KnowbooksMine);
  };

/*** Misc****************/

export const IsItemInAnyKnowbook_handler =
  (stores: IStores) => (itemID: AtomID) => {
    return IsItemInAnyKnowbook(itemID, stores);
  };

/******************* Rename or Delete Knowbook ************************************ */

// export const onOpenRenameKnowbook =
//   (stores: IStores) =>
//   (name: KnowbookID) =>
//   (input: { event: eventT }): void => {
//     stores.uiStore.setSelectedKnowbookIdName(name);
//     stores.uiStore.setUiStringStorage(
//       TUiStringStorage.renameKnowbookNewName,
//       name
//     );
//     stores.uiStore.setUiBooleanStorage(
//       TUiBooleanStorage.renameKnowbookOpened,
//       true
//     );
//     // input.event.preventDefault();
//     input.event.stopPropagation();
//   };

// export const onChangeInputValueRenameKnowbook =
//   (stores: IStores) =>
//   (input: { value: string; syntheticEvent: eventT }): void => {
//     stores.uiStore.setUiStringStorage(
//       TUiStringStorage.renameKnowbookNewName,
//       input.value
//     );
//   };

// export const onRenameKnowbook = (stores: IStores) => (): void => {
//   renameKnowbook(
//     stores.uiStore.selectedKnowbookIdName,
//     stores.uiStore.getUiStringStorage(TUiStringStorage.renameKnowbookNewName),
//     stores
//   );
//   stores.uiStore.setUiBooleanStorage(
//     TUiBooleanStorage.renameKnowbookOpened,
//     false
//   );
// };

// export const onDeleteKnowbook =
//   (stores: IStores) =>
//   (name: KnowbookID) =>
//   (input: { event: eventT }): void => {
//     deleteKnowbook(name, stores);
//     // input.event.preventDefault();
//     input.event.stopPropagation();
//   };
