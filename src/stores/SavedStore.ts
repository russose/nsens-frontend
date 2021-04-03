import { action, makeObservable, observable } from "mobx";
import { AtomID, IAtom } from "../common/types";
import { _save, _unsave } from "../_api";
import { KnowkookStore } from "./KnowkookStore";
import { IStores } from "./_RootStore";

export class SavedStore {
  private $saved = observable.map<AtomID, IAtom>();
  constructor() {
    makeObservable<SavedStore>(this, {
      setSaved: action,
      clearSaved: action,
      addSaved: action,
      removeSaved: action,
    });
  }

  get saved() {
    return this.$saved;
  }
  getSavedList(): IAtom[] {
    return Array.from(this.saved.values());
  }
  setSaved(atoms: IAtom[]): void {
    atoms.forEach((item) => {
      this.$saved.set(item.id, item);
    });
  }
  clearSaved(): void {
    this.$saved.clear();
  }

  addSaved(itemId: AtomID, stores: IStores): void {
    if (itemId === undefined) {
      return;
    }

    const item = stores.feedStore.getItemFromAnywhere(itemId, stores);

    if (item === undefined) {
      console.log("impossible to save, not item found");
      return;
    }

    this.setSaved([item]); //to not freeze UI

    stores.feedStore
      .fetchRelated(item.id, item.title) //take time
      .then(() => {
        item.related = JSON.stringify(stores.feedStore.getRelated(itemId));
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
          this.$saved.delete(itemId);
          console.log(e);
          console.log("error in saving item");
        })
      );
  }

  removeSaved(itemId: AtomID, knowbookStore: KnowkookStore): void {
    if (itemId === undefined) {
      return;
    }

    if (!knowbookStore.IsItemInAnyKnowbook(itemId)) {
      _unsave(itemId)
        .then(
          action(() => {
            this.$saved.delete(itemId);
          })
        )
        .catch(() => {
          console.log("network error, error in unsaved");
        });
    } else {
      console.log("impossible to unsave: Atoms present in Custom Knowbooks");
    }
  }

  getSavedAtomsFromIds(list_atoms: AtomID[]): IAtom[] {
    if (list_atoms === undefined || list_atoms.length === 0) {
      return [];
    }

    const result = list_atoms.map((id) => {
      if (this.$saved.has(id)) {
        return this.$saved.get(id);
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
}
