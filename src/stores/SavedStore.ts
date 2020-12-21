import { action, makeObservable, observable } from "mobx";
import { AtomID, IAtom } from "../common/types";
import { _save, _unsave } from "../_api";
import { FeedStore } from "./FeedStore";
import { KnowkookStore } from "./KnowkookStore";

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
    atoms.forEach((item) => this.$saved.set(item.id, item));
  }
  clearSaved(): void {
    this.$saved.clear();
  }

  addSaved(itemId: AtomID, feedStore: FeedStore): void {
    if (itemId === undefined) {
      return;
    }

    const item = feedStore.getItemFromAnywhere(itemId);

    if (item === undefined) {
      console.log("impossible to save, not item found");
      return;
    }

    // this.$saved.set(item.id, item); //to not freeze UI
    this.setSaved([item]); //to not freeze UI

    feedStore
      .fetchRelated(item.id, item.title) //take time
      .then(() => {
        item.related = JSON.stringify(feedStore.getRelated(itemId));
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
    // if (itemId === undefined || !this.isLogged) {
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
        return undefined;
      }
    });
    const result_no_undefined = result.filter((item) => {
      return item !== undefined;
    }) as IAtom[];

    return result_no_undefined;
  }
}
