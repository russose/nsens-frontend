import { action, computed, makeObservable, observable } from "mobx";
import { AtomID, IAtom } from "../config/globals";
import { RootStore } from "./RootStore";

export class SavedStore {
  $rootStore: RootStore;

  private $saved = observable.set<AtomID>();
  private $relatedAllItemsFromSaved = new Set<AtomID>();

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;

    makeObservable<SavedStore>(this, {
      savedItems: computed,
      setSaved: action,
      clearSaved: action,
      deleteSaved: action,
    });
  }

  get saved() {
    return this.$saved;
  }
  get savedItems(): IAtom[] {
    // return stores.baseStore.getHistoryItems(this.saved);
    return this.$rootStore
      .stores()
      .baseStore.getHistoryItems(Array.from(this.$saved));
  }

  clearSaved(): void {
    this.$saved.clear();
  }
  deleteSaved(key: AtomID): void {
    this.$saved.delete(key);
    // const saved_filtered: AtomID[] = this.saved.filter((id) => {
    //   return id !== key;
    // });
    // // ATTENTION, PAS CERTAIN QUE CA FONCTIONNE PARFAITEMENT AVEC MOBX...
    // this.$saved = saved_filtered;
  }

  setSaved(atoms: IAtom[]): void {
    if (atoms === undefined || atoms.length === 0) {
      return;
    }

    atoms.forEach((item) => {
      this.$saved.add(item.id);
    });

    this.$rootStore.stores().baseStore.setHistory(atoms);
  }

  get relatedAllItemsFromSaved(): IAtom[] {
    const ids: AtomID[] = Array.from(this.$relatedAllItemsFromSaved);
    return this.$rootStore.stores().baseStore.getHistoryItems(ids);
  }

  refreshRelatedAllItemsFromSaved(): void {
    const savedIds: AtomID[] = Array.from(this.$saved);

    this.$relatedAllItemsFromSaved.clear();
    savedIds.forEach((id) => {
      const relatedItems = this.$rootStore
        .stores()
        .baseStore.getRelatedItems(id);
      relatedItems.forEach((item) => {
        this.$relatedAllItemsFromSaved.add(item.id);
      });
    });
  }
}
