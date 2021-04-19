import { action } from "mobx";
import { KnowbookID, IKnowbook, AtomID, IAtom } from "../config/globals";
import { IStores } from "../stores/_RootStore";
import { getSavedAtomsFromIds } from "./helpersSaved";
import {
  _renameKnowbook,
  _removeKnowbook,
  _addItemInKnowbook,
  _addKnowbook,
  _removeItemFromKnowbook,
} from "./_apiUserData";

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

  _renameKnowbook(name, new_name)
    .then(
      action(() => {
        const knowbooks_list: IKnowbook[] = [];
        stores.knowbookStore.knowbooks.forEach((knowbook, key_name) => {
          if (key_name !== name) {
            knowbooks_list.push(knowbook);
          } else {
            const knowbook_with_new_name = knowbook;
            knowbook_with_new_name.name = new_name;
            knowbooks_list.push(knowbook_with_new_name);
          }
        });
        stores.knowbookStore.clearKnowbooks();
        stores.knowbookStore.setKnowbooks(knowbooks_list);
      })
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
  _removeKnowbook(name)
    .then(
      action(() => {
        stores.knowbookStore.knowbooks.delete(name);
      })
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
  if (knowbookID === undefined || atomId === undefined) {
    // console.log("undefined values");
    return;
  }

  if (stores.knowbookStore.knowbooks.has(knowbookID)) {
    const knowbook_updated = stores.knowbookStore.knowbooks.get(knowbookID);
    if (knowbook_updated !== undefined) {
      if (knowbook_updated.items.includes(atomId)) {
        return;
      }
      // const knowbook_backup: IKnowbook = knowbook_updated;
      knowbook_updated.items.push(atomId);
      // this.knowbooks.set(knowbookID, knowbook_updated);

      _addItemInKnowbook(knowbookID, atomId)
        .then(
          action(() => {
            // if (knowbook_updated !== undefined) {
            stores.knowbookStore.knowbooks.set(knowbookID, knowbook_updated);
            // console.log("item added in knowbook successfully");
            // return;
            // }
          })
        )
        .catch((error) => {
          // this.knowbooks.set(knowbookID, knowbook_backup);
          // console.log("error in adding item in knowbook");
          // return;
        });
    } else {
      // console.log("error");
    }
  } else {
    const newKnowbook: IKnowbook = {
      id: -1, //id not used in front but only in back
      name: knowbookID,
      items: [atomId],
    };
    // this.knowbooks.set(knowbookID, newKnowbook);
    _addKnowbook(knowbookID)
      .then(() => {
        _addItemInKnowbook(knowbookID, atomId);
      })
      .then(
        action(() => {
          stores.knowbookStore.knowbooks.set(knowbookID, newKnowbook);
          // console.log(
          //   "knowbook created, item added in knowbook successfully"
          // );
          // return;
        })
      )
      //     .catch(() => {
      //       console.log("error in adding item in knowbook");
      //     });
      // })
      .catch(() => {
        // this.knowbooks.delete(knowbookID);
        // console.log("error in creating knowbook and adding item");
        // return;
      });
  }
}

//Update both Knowbooks and saved (tags)
export function removeItemFromKnowbook(
  knowbookID: KnowbookID,
  atomId: AtomID,
  stores: IStores
) {
  if (knowbookID === undefined || atomId === undefined) {
    // console.log("undefined values");
    return;
  }

  if (stores.knowbookStore.knowbooks.has(knowbookID)) {
    let knowbook_updated = stores.knowbookStore.knowbooks.get(knowbookID);
    if (knowbook_updated !== undefined) {
      // const knowbook_backup: IKnowbook = knowbook_updated;
      knowbook_updated.items = knowbook_updated.items.filter((itemId) => {
        return itemId !== atomId;
      });
      // this.knowbooks.set(knowbookID, knowbook_updated);

      _removeItemFromKnowbook(knowbookID, atomId)
        .then(
          action(() => {
            if (knowbook_updated !== undefined) {
              stores.knowbookStore.knowbooks.set(knowbookID, knowbook_updated);
              // console.log("item removed in knowbook successfully");
            }
            return;
          })
        )
        .catch(() => {
          // this.knowbooks.set(knowbookID, knowbook_backup);
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
