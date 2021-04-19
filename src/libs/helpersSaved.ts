import { action } from "mobx";
import { AtomID, IAtom } from "../config/globals";
import { IStores } from "../stores/_RootStore";
import { getItemFromAnywhere } from "./helpersBase";
import { IsItemInAnyKnowbook } from "./helpersKnowbooks";
import { fetchRelated } from "./helpersRelated";
import { _save, _unsave } from "./_apiUserData";

export function addSaved(itemId: AtomID, stores: IStores): void {
  if (itemId === undefined) {
    return;
  }

  const item = getItemFromAnywhere(itemId, stores);

  if (item === undefined) {
    // console.log("impossible to save, not item found");
    return;
  }

  stores.savedStore.setSaved([item]); //to not freeze UI

  fetchRelated(stores, item.id, item.title) //take time
    .then(() => {
      item.related = JSON.stringify(stores.baseStore.getRelated(itemId));
      return item;
    })
    // .then(
    //   action(() => {
    //     this.$saved.set(item.id, item);
    //   })
    // )
    .then((item) => {
      _save(item);
    })
    .catch(
      action((e) => {
        stores.savedStore.saved.delete(itemId);
        // console.log(e);
        // console.log("error in saving item");
      })
    );
}

export function removeSaved(itemId: AtomID, stores: IStores): void {
  if (itemId === undefined) {
    return;
  }

  if (!IsItemInAnyKnowbook(itemId, stores)) {
    _unsave(itemId)
      .then(
        action(() => {
          stores.savedStore.saved.delete(itemId);
        })
      )
      .catch(() => {
        // console.log("network error, error in unsaved");
      });
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
