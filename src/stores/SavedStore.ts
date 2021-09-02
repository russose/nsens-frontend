import { action, computed, makeObservable, observable } from "mobx";
import { AtomID, IAtom } from "../config/globals";
import { shuffleArray } from "../libs/utils";
import { RootStore } from "./RootStore";

export class SavedStore {
  $rootStore: RootStore;

  private $saved = observable.set<AtomID>();

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;

    makeObservable<SavedStore>(this, {
      init: action,
      savedItems: computed,
      setSaved: action,
      clearSaved: action,
      deleteSaved: action,
      allRelatedIdsFromSavedNotSaved: computed,
    });
  }

  init() {
    this.clearSaved();
  }

  get saved() {
    return this.$saved;
  }
  get savedItems(): IAtom[] {
    return this.$rootStore
      .stores()
      .baseStore.getHistoryItems(Array.from(this.$saved));
  }

  clearSaved(): void {
    this.$saved.clear();
  }
  deleteSaved(key: AtomID): void {
    this.$saved.delete(key);
  }

  setSaved(atoms: IAtom[], forceUpdateHistory: boolean): void {
    if (atoms === undefined || atoms.length === 0) {
      return;
    }
    atoms.forEach((item) => {
      this.$saved.add(item.id);
    });
    this.$rootStore.stores().baseStore.setHistory(atoms, forceUpdateHistory);
  }

  get allRelatedIdsFromSavedNotSaved(): AtomID[] {
    const max_items_amount = 100;
    const savedIds_shuffled: AtomID[] = shuffleArray(Array.from(this.$saved));
    const allRelatedIdsFromSavedNotSaved_ = new Set<AtomID>();

    for (const id of savedIds_shuffled) {
      if (allRelatedIdsFromSavedNotSaved_.size > max_items_amount) {
        break;
      }
      const relatedItemsIds = this.$rootStore
        .stores()
        .baseStore.getRelatedItems(id);

      relatedItemsIds.forEach((item) => {
        if (!this.$saved.has(item)) {
          allRelatedIdsFromSavedNotSaved_.add(item);
        }
      });
    }

    return shuffleArray(Array.from(allRelatedIdsFromSavedNotSaved_));
  }
}
