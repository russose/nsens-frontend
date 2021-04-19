import { action, makeObservable, observable } from "mobx";
import { AtomID, IAtom } from "../config/globals";
import { _save, _unsave } from "../libs/_apiUserData";

export class SavedStore {
  private $saved = observable.map<AtomID, IAtom>();
  constructor() {
    makeObservable<SavedStore>(this, {
      setSaved: action,
      clearSaved: action,
      // addSaved: action,
      // removeSaved: action,
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
}
