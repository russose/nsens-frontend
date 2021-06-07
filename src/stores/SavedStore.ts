import { action, makeObservable, observable } from "mobx";
import { AtomID, IAtom } from "../config/globals";

export class SavedStore {
  private $saved = observable.map<AtomID, IAtom>();
  constructor() {
    makeObservable<SavedStore>(this, {
      setSaved: action,
      clearSaved: action,
      deleteSaved: action,
    });
  }

  get saved() {
    return this.$saved;
  }
  clearSaved(): void {
    this.$saved.clear();
  }
  deleteSaved(key: AtomID): void {
    this.$saved.delete(key);
  }

  getSavedList(): IAtom[] {
    return Array.from(this.saved.values());
  }
  setSaved(atoms: IAtom[]): void {
    atoms.forEach((item) => {
      this.$saved.set(item.id, item);
    });
  }
}
