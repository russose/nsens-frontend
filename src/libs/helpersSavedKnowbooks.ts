import {
  AtomID,
  EXCLUSION_PATTERNS,
  IAtom,
  IKnowbook,
  IKnowbookFull,
  IKnowbookProps,
  IKnowbookUpdate,
  KnowbookID,
  KnowbookName,
  TKnowbookUpdateAction,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getItemsFromTitlesFromWebCleanImage_blocking } from "./apiItems";
import { api_getOnePublicKnowbookFull } from "./apiPublicKnowbooks";
import {
  api_addItemInKnowbook,
  api_addKnowbook,
  api_getKnowbookFull,
  api_removeItemFromKnowbook,
  api_removeKnowbook,
  api_save,
  api_unsave,
  api_updateKnowbook,
} from "./apiUserData";
import { IKnowbookFull2IKnowbook } from "./utils";

async function addSaved(itemId: AtomID, stores: IStores): Promise<boolean> {
  let success = false;
  if (itemId === undefined) {
    return success;
  }

  try {
    const lang = stores.baseStore.paramsPage.lang;
    const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

    let item = stores.baseStore.getHistoryItem(itemId);

    let successSaved;
    if (item === undefined || item.image_url === "") {
      const items = await api_getItemsFromTitlesFromWebCleanImage_blocking(
        item.title,
        lang,
        exclusion_patterns_items
      );
      item = items[0];
    }

    successSaved = await stores.savedStore.setSavedWithHistory([item], true); //force update of item in history with all information

    const item_ = await api_save(item);

    if (item_ === undefined) {
      return false;
    } else {
      return true;
    }
  } catch {
    return false;
  }
}

async function addItemInKnowbookBackAndStore(
  knowbookName: KnowbookName,
  knowbookId: KnowbookID,
  atomId: AtomID,
  stores: IStores
): Promise<boolean> {
  let success = false;
  if (knowbookName === undefined || atomId === undefined) {
    return success;
  }

  let knowbook = await api_addItemInKnowbook(
    knowbookName,
    atomId,
    stores.baseStore.paramsPage.lang
  );

  if (knowbook === undefined) {
    return false;
  }

  stores.knowbookStore.addItemInKnowbookStore(knowbookId, atomId);

  return true;
}

async function addItemInKnowbookAndCreateKnowbook_Single(
  knowbookName: KnowbookName,
  atomId: AtomID,
  stores: IStores
): Promise<boolean> {
  let success = false;
  if (knowbookName === undefined || atomId === undefined) {
    return success;
  }

  const knowbook_list: IKnowbook[] = Array.from(
    stores.knowbookStore.knowbooks.values()
  ).filter((item) => {
    return item.name === knowbookName;
  });

  const knowbook: IKnowbook =
    knowbook_list.length !== 0 ? knowbook_list[0] : undefined;

  const knowbookId: KnowbookID =
    knowbook !== undefined ? knowbook.id : undefined;

  if (isItemInKnowbook(atomId, knowbookId, stores)) {
    return false;
  }

  let successKnowbookCreation = false;
  if (stores.knowbookStore.knowbooks.has(knowbookId)) {
    successKnowbookCreation = await addItemInKnowbookBackAndStore(
      knowbookName,
      knowbookId,
      atomId,
      stores
    );

    if (!successKnowbookCreation) {
      return false;
    }

    // await updateKnowbookImage(stores, knowbookId, knowbook.image_url);

    success = true;

    return success;
  } else {
    const knowbookId_created = await api_addKnowbook(
      knowbookName,
      stores.baseStore.paramsPage.lang
    );

    const newKnowbook: IKnowbook = {
      id: knowbookId_created, //assigned in backend, real value few lines below
      language: stores.baseStore.paramsPage.lang,
      name: knowbookName,
      description: "",
      sourceUrl: "",
      owner: stores.baseStore.user.userId, //assigned in backend
      items: [],
      image_url: "",
      public: false,
      nb_saved: undefined,
    };

    stores.knowbookStore.setKnowbook(knowbookId_created, newKnowbook);
    // await updateKnowbookImage(stores, -1, newKnowbook.image_url, false);

    successKnowbookCreation = await addItemInKnowbookBackAndStore(
      knowbookName,
      knowbookId_created,
      atomId,
      stores
    );

    if (!successKnowbookCreation) {
      return false;
    }

    // newKnowbook.id = knowbookId_created;
    // stores.knowbookStore.deleteKnowbook(-1);
    // stores.knowbookStore.setKnowbook(knowbookId_created, newKnowbook);

    await updateKnowbookImage(stores, knowbookId_created, "");

    success = true;
    return success;
  }
}

export async function addItemInKnowbookAndCreateKnowbook_Batch(
  actions: IKnowbookUpdate[],
  stores: IStores
): Promise<boolean> {
  let success = false;
  if (actions === undefined || actions.length === 0) {
    return success;
  }

  // Warning: all actions shall have the same itemid, otherwise will not work at whole!
  const atomId = actions[0].itemId;

  //Find the first action with add to save the item first in backend
  const actions_add = actions.filter((actions) => {
    return actions.action === TKnowbookUpdateAction.add;
  });

  // Save Item automatically
  if (actions_add.length !== 0 && !stores.savedStore.saved.has(atomId)) {
    success = await addSaved(atomId, stores);

    if (!success) {
      return false;
    }
  }

  for (let action of actions) {
    if (action.action === TKnowbookUpdateAction.add) {
      success = await addItemInKnowbookAndCreateKnowbook_Single(
        action.KnowbookName,
        action.itemId,
        stores
      );
    } else if (action.action === TKnowbookUpdateAction.delete) {
      success = await removeItemFromKnowbook(
        action.KnowbookId,
        action.itemId,
        stores
      );
    }

    if (!success) {
      //if 1 submission fails, stop here
      return false;
    }
  }

  success = true;
  return success;
}

//Update both Knowbooks and saved (tags)
export async function removeItemFromKnowbook(
  knowbookID: KnowbookID,
  atomId: AtomID,
  stores: IStores
): Promise<boolean> {
  let success = false;
  if (knowbookID === undefined || atomId === undefined) {
    return success;
  }

  if (stores.knowbookStore.knowbooks.has(knowbookID)) {
    let knowbook_updated = stores.knowbookStore.knowbooks.get(knowbookID);
    if (knowbook_updated !== undefined) {
      const knowbook = await api_removeItemFromKnowbook(
        knowbook_updated.name,
        atomId,
        stores.baseStore.paramsPage.lang
      );

      if (knowbook === undefined) {
        return false;
      }

      stores.knowbookStore.removeItemFromKnowbookStore(knowbookID, atomId);

      await updateKnowbookImage(
        stores,
        knowbook_updated.id,
        knowbook_updated.image_url
      );

      // Remove Saved item if in no knowbook anymore
      if (!IsItemInAnyKnowbook(atomId, stores)) {
        const item_ = await api_unsave(
          atomId,
          stores.baseStore.paramsPage.lang
        );
        if (item_ !== undefined) {
          //Success
          stores.savedStore.deleteSaved(atomId);
        }
      }

      success = true;
      return success;
    } else {
      return false;
    }
  } else {
    // console.log("impossible to remove from knowbook");
    return false;
  }
}

export async function deleteKnowbook(
  id: KnowbookID,
  stores: IStores
): Promise<boolean> {
  let success = false;
  if (!stores.knowbookStore.knowbooks.has(id)) {
    return success;
  }

  const itemIds: AtomID[] = stores.knowbookStore.knowbooks.get(id).items;

  try {
    for (let itemId of itemIds) {
      success = await removeItemFromKnowbook(id, itemId, stores);

      if (!success) {
        //if 1 submission fails, stop here
        return false;
      }
    }

    const result: string = await api_removeKnowbook(
      stores.knowbookStore.knowbooks.get(id).name,
      stores.baseStore.paramsPage.lang
    );

    if (result !== undefined) {
      stores.knowbookStore.deleteKnowbook(id);
      success = true;
      return success;
    } else {
      return false;
    }
  } catch (error) {
    // console.error("error in deleteKnowbook");
    return false;
  }
}

export function isItemInKnowbook(
  atomId: AtomID,
  knowbookId: KnowbookID,
  stores: IStores
): boolean {
  const knowbook: IKnowbook = stores.knowbookStore.knowbooks.get(knowbookId);
  if (knowbook !== undefined) {
    const knowbookContentId = knowbook.items;
    return knowbookContentId.includes(atomId);
  } else {
    // console.log("knowbook doesn't exist");
    return false;
  }
}

export function IsItemInAnyKnowbook(atomId: AtomID, stores: IStores): boolean {
  if (atomId === undefined) {
    return false;
  }

  const knowbookIds: KnowbookID[] = Array.from(
    stores.knowbookStore.knowbooks.keys()
  );
  for (let knowbookId of knowbookIds) {
    const inside = isItemInKnowbook(atomId, knowbookId, stores);
    if (inside) {
      return true;
    }
  }
  return false;
}

export function ItemsInNoKnowbook(stores: IStores): IAtom[] {
  const itemsIdList: AtomID[] = [];

  stores.savedStore.saved.forEach((itemId) => {
    const knowbookIds: KnowbookID[] = Array.from(
      stores.knowbookStore.knowbooks.keys()
    );
    for (let knowbookId of knowbookIds) {
      const inside = isItemInKnowbook(itemId, knowbookId, stores);
      if (inside) {
        return;
      }
    }
    itemsIdList.push(itemId);
    return;
  });

  return stores.knowbookStore.savedAtomsFromIds(itemsIdList);
}

async function updateKnowbookImage(
  stores: IStores,
  knowbookId: KnowbookID,
  image_url: string,
  withAPI = true
): Promise<boolean> {
  let success = false;
  if (knowbookId === undefined || image_url === undefined) {
    return success;
  }
  const knowbook = stores.knowbookStore.knowbooks.get(knowbookId);
  if (knowbook === undefined) {
    return false;
  }

  let image_url_: string;

  if (knowbook.items.length === 0) {
    image_url_ = "";
  } else if (image_url.length !== 0) {
    image_url_ = image_url;
  } else {
    //Take the first that is not empty
    const items = stores.baseStore.getHistoryItems(knowbook.items);
    // image_url_ = getRandomImageFromItems(items);
    const items_not_empty_image = items.filter((item) => {
      return item.image_url.length !== 0;
    });
    if (items_not_empty_image.length !== 0) {
      image_url_ = items_not_empty_image[0].image_url;
    } else {
      image_url_ = "";
    }
  }

  //Nothing to do
  // if (image_url_ === knowbook.image_url) {
  //   return false;
  // }

  if (withAPI) {
    const result: string = await api_updateKnowbook(
      knowbook.name,
      stores.baseStore.paramsPage.lang,
      {
        image_url: image_url_,
      }
    );

    if (result === undefined) {
      return false;
    }
  }

  stores.knowbookStore.setImage(knowbookId, image_url_);
  success = true;
  return success;
}

export async function updateKnowbookProps(
  stores: IStores,
  knowbookId: KnowbookID,
  new_name: string,
  newDescription: string,
  newSource: string,
  image_url: string,
  isPublic: boolean
): Promise<boolean> {
  let success = false;
  if (
    knowbookId === undefined ||
    (new_name === undefined &&
      newDescription === undefined &&
      newSource === undefined &&
      image_url === undefined &&
      isPublic === undefined)
  ) {
    return success;
  }
  const knowbook = stores.knowbookStore.knowbooks.get(knowbookId);
  const current_name = knowbook.name;

  // if (
  //   knowbook === undefined ||
  //   (new_name === knowbook.name &&
  //     newDescription === knowbook.description &&
  //     newSource === knowbook.sourceUrl &&
  //     image_url === knowbook.image_url &&
  //     isPublic === knowbook.public)
  // ) {
  //   return false;
  // }

  if (knowbook === undefined) {
    return false;
  }

  // if (
  //   isPublic !== knowbook.public ||
  //   newDescription !== knowbook.description ||
  //   newSource !== knowbook.sourceUrl
  // ) {
  //   stores.knowbookStore.setPublicDesciptionSource(
  //     knowbookId,
  //     isPublic,
  //     newDescription,
  //     newSource
  //   );
  // }

  // if (image_url !== knowbook.image_url) {
  //   // stores.knowbookStore.setImage(knowbookId, image_url);
  //   await updateKnowbookImage(stores, knowbookId, image_url);
  // }

  stores.knowbookStore.setPublicDesciptionSource(
    knowbookId,
    isPublic,
    newDescription,
    newSource
  );
  await updateKnowbookImage(stores, knowbookId, image_url);

  // To be done in last to take update image and public into account...
  if (new_name !== knowbook.name) {
    stores.knowbookStore.renameKnowbook(knowbookId, new_name);
  }

  const props: IKnowbookProps = {
    name: new_name,
    description: newDescription,
    sourceUrl: newSource,
    image_url: image_url,
    public: isPublic,
  };

  const result: string = await api_updateKnowbook(
    current_name,
    stores.baseStore.paramsPage.lang,
    props
    // {
    //   name: new_name,
    //   image_url: image_url,
    //   public: isPublic,
    // }
  );

  if (result === undefined) {
    return false;
  } else {
    return true;
  }
}

export async function getAndStoreOneKnowbookFull(
  stores: IStores,
  knowbookId: KnowbookID
): Promise<IKnowbookFull> {
  if (knowbookId === undefined) {
    return undefined;
  }

  let knowbookFullPrivate: IKnowbookFull = undefined;
  if (stores.knowbookStore.knowbooks.has(knowbookId)) {
    knowbookFullPrivate = await api_getKnowbookFull(
      knowbookId,
      stores.baseStore.paramsPage.lang
    );
  }

  if (knowbookFullPrivate !== undefined) {
    // No need to use setSaved since already done during initialyzation chain
    stores.baseStore.setHistory(knowbookFullPrivate.items, true);

    return knowbookFullPrivate;
  } else {
    const knowbookFullPublic = await api_getOnePublicKnowbookFull(knowbookId);

    if (knowbookFullPublic !== undefined) {
      const knowbook_ = IKnowbookFull2IKnowbook(knowbookFullPublic);
      stores.knowbookStore.setPublicKnowbooks([knowbook_]);
      stores.baseStore.setHistory(knowbookFullPublic.items);
      return knowbookFullPublic;
    } else {
      return undefined;
    }
  }
}

//Not used any more, right now
// function performSavedWithRelated(
//   stores: IStores,
//   item: IAtom,
//   lang: Tlanguage,
//   exclusion_patterns: string[]
// ): void {
//   if (item === undefined) {
//     return;
//   }

//   // Desactivé car risque de corruption de données si les images ne sont pas encore synchronisées dans History quand fait le save()
//   // if (stores.baseStore.related.has(item.id)) {
//   //   api_save(item);
//   //   stores.savedStore.setSaved([item], true); //force update of item in history with all information
//   //   return;
//   // }

//   api_getRelatedFromWebCleanImage_blocking(
//     item.id,
//     item.title,
//     lang,
//     exclusion_patterns
//   )
//     .then((relatedList: IRelatedAtomFull[]) => {
//       stores.baseStore.setRelated(item.id, relatedList);
//     })
//     .then(() => {
//       item.related = JSON.stringify(getRelatedFull(stores, item.id));
//       return item;
//     })
//     .then((item) => {
//       api_save(item);
//       stores.savedStore.setSavedWithHistory([item], true); //force update of item in history with all information
//     })

//     .catch((error) => {
//       stores.savedStore.deleteSaved(item.id);
//     });
// }

// export function removeSaved(itemId: AtomID, stores: IStores): void {
//   if (itemId === undefined) {
//     return;
//   }

//   if (!IsItemInAnyKnowbook(itemId, stores)) {
//     stores.savedStore.deleteSaved(itemId);
//     setTimeout(() => {
//       api_unsave(itemId, stores.baseStore.paramsPage.lang)
//         // .then(() => {
//         //   console.log("unsaved successfull");
//         // })
//         .catch(() => {
//           // console.log("network error, error in unsaved");
//         });
//     }, delay_api_in_ms);
//   } else {
//     // console.log("impossible to unsave: Atoms present in Custom Knowbooks");
//   }
// }
