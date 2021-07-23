import {
  AtomID,
  EXCLUSION_PATTERNS,
  IAtom,
  IKnowbook,
  KnowbookID,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getItemsFromTitlesFromWeb_blocking } from "./apiItems";
import {
  api_addItemInKnowbook,
  api_addKnowbook,
  api_removeItemFromKnowbook,
  api_removeKnowbook,
  api_renameKnowbook,
  api_save,
  api_unsave,
} from "./apiUserData";
import { fetchRelatedAndUpdateStores } from "./helpersRelated";

const delay_api_in_s = 5000;

export function getItemFromAnyStores(
  itemId: AtomID,
  stores: IStores
): IAtom | undefined {
  if (itemId === undefined) {
    return undefined;
  }

  let item: IAtom;
  if (stores.savedStore.saved.get(itemId) !== undefined) {
    item = stores.savedStore.saved.get(itemId);
  } else if (stores.baseStore.history.has(itemId)) {
    item = stores.baseStore.history.get(itemId);
  }
  // else {
  //   item = getItemFromAnyRelated(stores, itemId);
  // }
  else if (stores.baseStore.relatedAll.has(itemId)) {
    item = stores.baseStore.relatedAll.get(itemId);
  } else {
    item = undefined;
  }

  return item;
}
export function addSaved(itemId: AtomID, stores: IStores): void {
  if (itemId === undefined) {
    return;
  }
  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  const item = getItemFromAnyStores(itemId, stores);

  if (item === undefined) {
    api_getItemsFromTitlesFromWeb_blocking(
      stores.uiStore.selectedAtom.title,
      lang,
      exclusion_patterns_items
    )
      .then((items) => {
        stores.baseStore.setHistory(items);
        performSaved(items[0], stores);
      })
      .catch(() => {
        // console.log("network error, error in unsaved");
      });
  } else {
    performSaved(item, stores);
  }
}

function performSaved(item: IAtom, stores: IStores): void {
  if (item === undefined) {
    return;
  }

  const itemId = item.id;

  //Introduced some bugs if delays are not introduced (see setTimeout)
  stores.savedStore.setSaved([item]); //to not freeze UI

  fetchRelatedAndUpdateStores(stores, item.id, item.title) //take time
    .then(() => {
      item.related = JSON.stringify(stores.baseStore.getRelated(itemId));
      return item;
    })
    .then((item) => {
      api_save(item);
      // return item;
    })
    // .then((item) => {
    //   stores.savedStore.setSaved([item]);
    // })
    .catch((e) => {
      stores.savedStore.deleteSaved(itemId);
    });
}

export function removeSaved(itemId: AtomID, stores: IStores): void {
  if (itemId === undefined) {
    return;
  }

  if (!IsItemInAnyKnowbook(itemId, stores)) {
    // api_unsave(itemId)
    //   .then(() => {
    //     stores.savedStore.deleteSaved(itemId);
    //   })
    //   .catch(() => {
    //     // console.log("network error, error in unsaved");
    //   });

    stores.savedStore.deleteSaved(itemId);
    setTimeout(() => {
      api_unsave(itemId, stores.baseStore.paramsPage.lang)
        // .then(() => {
        //   console.log("unsaved successfull");
        // })
        .catch(() => {
          // console.log("network error, error in unsaved");
        });
    }, delay_api_in_s);
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
      return stores.savedStore.saved.get(id);
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
    .then(
      // action(
      () => {
        // const knowbooks_list: IKnowbook[] = [];
        // stores.knowbookStore.knowbooks.forEach((knowbook, key_name) => {
        //   if (key_name !== name) {
        //     knowbooks_list.push(knowbook);
        //   } else {
        //     const knowbook_with_new_name = knowbook;
        //     knowbook_with_new_name.name = new_name;
        //     knowbooks_list.push(knowbook_with_new_name);
        //   }
        // });
        // stores.knowbookStore.clearKnowbooks();
        // stores.knowbookStore.setKnowbooksFromList(knowbooks_list);

        stores.knowbookStore.renameKnowbook(name, new_name);
      }
      // )
    )
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
    .then(
      // action(
      () => {
        // stores.knowbookStore.knowbooks.delete(name);
        stores.knowbookStore.deleteKnowbooks(name);
      }
      // )
    )
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
    // api_addItemInKnowbook(knowbookID, atomId)
    //   .then(() => {
    //     stores.knowbookStore.addItemInKnowbook(knowbookID, atomId);
    //   })
    //   .catch((error) => {
    //     // console.log("error in adding item in knowbook");
    //   });

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
      )
        // .then(() => {
        //   console.log("added in knowbook successfully");
        // })
        .catch(() => {
          // console.log("network error, error in unsaved");
        });
    }, delay_api_in_s);
  } else {
    const newKnowbook: IKnowbook = {
      id: -1, //id not used in front but only in back
      language: stores.baseStore.paramsPage.lang,
      name: knowbookID,
      items: [atomId],
    };
    // api_addKnowbook(knowbookID)
    //   .then(() => {
    //     api_addItemInKnowbook(knowbookID, atomId);
    //   })
    //   .then(() => {
    //     stores.knowbookStore.setKnowbooks(knowbookID, newKnowbook);
    //   })
    //   .catch((error) => {
    //     console.log("error in creating knowbook and adding item");
    //     // console.log(error);
    //   });

    stores.knowbookStore.setKnowbooks(knowbookID, newKnowbook);
    setTimeout(() => {
      api_addKnowbook(knowbookID, stores.baseStore.paramsPage.lang)
        .then(() => {
          api_addItemInKnowbook(
            knowbookID,
            atomId,
            stores.baseStore.paramsPage.lang
          );
        })
        // .then(() => {
        //   console.log("added in knowbook successfully");
        // })
        .catch((error) => {
          // console.log("error in creating knowbook and adding item");
          // console.log(error);
        });
    }, delay_api_in_s);
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
      // const knowbook_backup: IKnowbook = knowbook_updated;

      //OLD
      // knowbook_updated.items = knowbook_updated.items.filter((itemId) => {
      //   return itemId !== atomId;
      // });

      // this.knowbooks.set(knowbookID, knowbook_updated);

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
      // console.log("impossible to provide Atoms List from knowbook");
      return [];
    }
  }
}

export function isItemInKnowbook(
  atomId: AtomID,
  knowbookId: KnowbookID,
  stores: IStores
): boolean {
  const knowbook = stores.knowbookStore.knowbooks.get(knowbookId);
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

  stores.savedStore.saved.forEach((item) => {
    const knowbookIds: KnowbookID[] = Array.from(
      stores.knowbookStore.knowbooks.keys()
    );
    for (let knowbookId of knowbookIds) {
      const inside = isItemInKnowbook(item.id, knowbookId, stores);
      if (inside) {
        return;
      }
    }
    itemsIdList.push(item.id);
    return;
  });

  return getSavedAtomsFromIds(itemsIdList, stores);
}

/* UI HELPERS */
export function initKnowbookEditionElements(
  atomID: AtomID,
  stores: IStores
): void {
  stores.uiStore.setEditKnowbookNewValue("");
  stores.uiStore.editKnowbookMembers.clear();

  const knowbook_id_list = Array.from(stores.knowbookStore.knowbooks.keys());
  knowbook_id_list.forEach((knowbookId) => {
    stores.uiStore.editKnowbookMembers.set(
      knowbookId,
      isItemInKnowbook(atomID, knowbookId, stores)
    );
  });
}
