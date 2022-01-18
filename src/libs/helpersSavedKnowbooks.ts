import {
  AtomID,
  Tlanguage,
  EXCLUSION_PATTERNS,
  IAtom,
  IKnowbook,
  IRelatedAtomFull,
  KnowbookID,
  TUiStringStorage,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getItemsFromTitlesFromWebCleanImage_blocking } from "./apiItems";
import { api_getRelatedFromWebCleanImage_blocking } from "./apiRelated";
import {
  api_addItemInKnowbook,
  api_addKnowbook,
  api_removeItemFromKnowbook,
  api_removeKnowbook,
  api_renameKnowbook,
  api_save,
  api_unsave,
} from "./apiUserData";

const delay_api_in_ms = 5000;

export function addSaved(itemId: AtomID, stores: IStores): void {
  if (itemId === undefined) {
    return;
  }
  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  const item = stores.baseStore.getHistoryItem(itemId);

  if (item === undefined || item.image_url === "") {
    //Introduced some bugs if delays are not introduced (see setTimeout)
    stores.savedStore.setSaved([item], false); //to not freeze UI
    api_getItemsFromTitlesFromWebCleanImage_blocking(
      stores.uiStore.selectedAtom.title,
      lang,
      exclusion_patterns_items
    )
      .then((items) => {
        performSavedWithRelated(
          stores,
          items[0],
          lang,
          exclusion_patterns_items
        );
      })
      .catch(() => {
        // console.log("network error, error in unsaved");
      });
  } else {
    //Introduced some bugs if delays are not introduced (see setTimeout)
    stores.savedStore.setSaved([item], false); //to not freeze UI
    performSavedWithRelated(stores, item, lang, exclusion_patterns_items);
  }
}

function performSavedWithRelated(
  stores: IStores,
  item: IAtom,
  lang: Tlanguage,
  exclusion_patterns: string[]
): void {
  if (item === undefined) {
    return;
  }

  // Desactivé car risque de corruption de données si les images ne sont pas encore synchronisées dans History quand fait le save()
  // if (stores.baseStore.related.has(item.id)) {
  //   api_save(item);
  //   stores.savedStore.setSaved([item], true); //force update of item in history with all information
  //   return;
  // }

  api_getRelatedFromWebCleanImage_blocking(
    item.id,
    item.title,
    lang,
    exclusion_patterns
  )
    .then((relatedList: IRelatedAtomFull[]) => {
      stores.baseStore.setRelated(item.id, relatedList);
    })
    .then(() => {
      item.related = JSON.stringify(stores.baseStore.getRelatedFull(item.id));
      return item;
    })
    .then((item) => {
      api_save(item);
      stores.savedStore.setSaved([item], true); //force update of item in history with all information
    })

    .catch((error) => {
      stores.savedStore.deleteSaved(item.id);
    });
}

export function removeSaved(itemId: AtomID, stores: IStores): void {
  if (itemId === undefined) {
    return;
  }

  if (!IsItemInAnyKnowbook(itemId, stores)) {
    stores.savedStore.deleteSaved(itemId);
    setTimeout(() => {
      api_unsave(itemId, stores.baseStore.paramsPage.lang)
        // .then(() => {
        //   console.log("unsaved successfull");
        // })
        .catch(() => {
          // console.log("network error, error in unsaved");
        });
    }, delay_api_in_ms);
  } else {
    // console.log("impossible to unsave: Atoms present in Custom Knowbooks");
  }
}

export function getSavedAtomsFromIds(
  list_atoms: AtomID[],
  stores: IStores
): IAtom[] {
  if (list_atoms === undefined || list_atoms.length === 0) {
    return [];
  }

  const result = list_atoms.map((id) => {
    if (stores.savedStore.saved.has(id)) {
      return stores.baseStore.getHistoryItem(id);
    } else {
      // console.log("not in saved", id);
      return undefined;
    }
  });
  const result_no_undefined: IAtom[] = result.filter((item) => {
    return item !== undefined;
  });

  return result_no_undefined;
}

export function renameKnowbook(
  name: KnowbookID,
  new_name: KnowbookID,
  stores: IStores
) {
  if (
    !stores.knowbookStore.knowbooks.has(name) ||
    stores.knowbookStore.knowbooks.has(new_name)
  ) {
    return;
  }

  api_renameKnowbook(name, new_name, stores.baseStore.paramsPage.lang)
    .then(() => {
      stores.knowbookStore.renameKnowbook(name, new_name);
    })
    .catch((error) => {
      // console.log("error in renaming knowbook");
    });
}

export function deleteKnowbook(name: KnowbookID, stores: IStores) {
  if (!stores.knowbookStore.knowbooks.has(name)) {
    return;
  }
  if (getKnowbookAtomsList(name, stores).length !== 0) {
    return;
  }
  api_removeKnowbook(name, stores.baseStore.paramsPage.lang)
    .then(() => {
      stores.knowbookStore.deleteKnowbook(name);
    })
    .catch((error) => {
      // console.log("error in removing knowbook");
    });
}

//if the knowbook doesn't extist, create it
export function addItemInKnowbook(
  knowbookID: KnowbookID,
  atomId: AtomID,
  stores: IStores
) {
  if (
    knowbookID === undefined ||
    atomId === undefined ||
    isItemInKnowbook(atomId, knowbookID, stores)
  ) {
    return;
  }

  if (stores.knowbookStore.knowbooks.has(knowbookID)) {
    stores.knowbookStore.addItemInKnowbook(
      knowbookID,
      atomId,
      stores.baseStore.paramsPage.lang
    );
    setTimeout(() => {
      api_addItemInKnowbook(
        knowbookID,
        atomId,
        stores.baseStore.paramsPage.lang
      ).catch(() => {
        // console.log("network error, error in unsaved");
      });
    }, delay_api_in_ms);
  } else {
    const newKnowbook: IKnowbook = {
      id: -1, //id not used in front but only in back
      language: stores.baseStore.paramsPage.lang,
      name: knowbookID,
      items: [atomId],
    };

    stores.knowbookStore.setKnowbook(knowbookID, newKnowbook);
    setTimeout(() => {
      api_addKnowbook(knowbookID, stores.baseStore.paramsPage.lang)
        .then(() => {
          api_addItemInKnowbook(
            knowbookID,
            atomId,
            stores.baseStore.paramsPage.lang
          );
        })
        .catch((error) => {
          // console.log("error in creating knowbook and adding item");
          // console.log(error);
        });
    }, delay_api_in_ms);
  }
}

//Update both Knowbooks and saved (tags)
export function removeItemFromKnowbook(
  knowbookID: KnowbookID,
  atomId: AtomID,
  stores: IStores
) {
  if (knowbookID === undefined || atomId === undefined) {
    return;
  }

  if (stores.knowbookStore.knowbooks.has(knowbookID)) {
    let knowbook_updated = stores.knowbookStore.knowbooks.get(knowbookID);
    if (knowbook_updated !== undefined) {
      api_removeItemFromKnowbook(
        knowbookID,
        atomId,
        stores.baseStore.paramsPage.lang
      )
        .then(() => {
          stores.knowbookStore.removeItemFromKnowbook(
            knowbookID,
            atomId,
            stores.baseStore.paramsPage.lang
          );
          return;
        })
        .catch(() => {
          // console.log("error in removing item from knowbook");
          return;
        });
    } else {
      // console.log("undefined values");
      return;
    }
  } else {
    // console.log("impossible to remove from knowbook");
    return;
  }
}

export function getKnowbookAtomsList(
  knowbookID: KnowbookID,
  stores: IStores
): IAtom[] {
  if (!stores.knowbookStore.knowbooks.has(knowbookID)) {
    // console.log("impossible to provide Atoms List from knowbook");
    return [];
  } else {
    const my_knowbook = stores.knowbookStore.knowbooks.get(knowbookID);
    if (my_knowbook !== undefined) {
      return getSavedAtomsFromIds(my_knowbook.items, stores);
    } else {
      // console.log("impossible to provide Atoms List from knowbook 2");
      return [];
    }
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

// export function IsItemInAnyStaticKnowbook(
//   atomId: AtomID,
//   stores: IStores
// ): boolean {
//   if (atomId === undefined) {
//     return false;
//   }

//   const result: boolean =
//     stores.knowbookStore.allItemsInStaticKnowbooks.has(atomId);

//   return result;
// }

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

  return getSavedAtomsFromIds(itemsIdList, stores);
}

/* UI HELPERS */
export function initKnowbookEditionElements(
  atomID: AtomID,
  stores: IStores
): void {
  // stores.uiStore.setEditKnowbookNewValue("");
  stores.uiStore.setUiStringStorage(TUiStringStorage.editKnowbookNewValue, "");
  stores.uiStore.editKnowbookMembers.clear();

  const knowbook_id_list = Array.from(stores.knowbookStore.knowbooks.keys());
  knowbook_id_list.forEach((knowbookId) => {
    stores.uiStore.editKnowbookMembers.set(
      knowbookId,
      isItemInKnowbook(atomID, knowbookId, stores)
    );
  });
}
