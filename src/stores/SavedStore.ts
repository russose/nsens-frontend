import { action, computed, makeObservable, observable } from "mobx";
import { AtomID, IAtom } from "../config/globals";
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
      setSavedWithHistory: action,
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

  async setSaved(atomIds: AtomID[]): Promise<void> {
    if (atomIds === undefined || atomIds.length === 0) {
      return;
    }
    atomIds.forEach((id) => {
      this.$saved.add(id);
    });
  }

  async setSavedWithHistory(
    atoms: IAtom[],
    forceUpdateHistory: boolean
  ): Promise<boolean> {
    let success = false;
    if (atoms === undefined || atoms.length === 0) {
      return success;
    }
    atoms.forEach((item) => {
      this.$saved.add(item.id);
    });
    this.$rootStore.stores().baseStore.setHistory(atoms, forceUpdateHistory);
    return true;
  }
}
