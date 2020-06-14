import { observable, action, computed } from "mobx";
import {
  IUserData,
  IAtom,
  AtomID,
  IIdentity,
  KnowbookID,
  IKnowbook,
} from "../types";

export class DataStore {
  private $identity: IIdentity | null = null;
  //private $knowbooks = observable.map<KnowbookID, IKnowbook>();
  //private $saved = new Map<AtomID, IAtom>();
  private $history = new Map<AtomID, IAtom>();
  private $knowbooks = new Map<KnowbookID, IKnowbook>();
  private $saved = observable.map<AtomID, IAtom>();

  //@computed
  get saved() {
    return this.$saved;
  }
  get identity() {
    return this.$identity;
  }
  get history() {
    return this.$history;
  }
  get knowbooks() {
    return this.$knowbooks;
  }

  /************************************************ */

  setUserData(userData: IUserData | null): void {
    if (userData !== null && userData !== undefined) {
      this.setIdentity(userData.identity);
      this.setSaved(userData.saved);
      this.setHistory(userData.history);
      this.setKnowbooks(userData);
    }
  }

  /************************************************ */
  setKnowbooks(userData: IUserData): void {
    userData.saved.forEach((value, key) => {
      if (value.tags.length !== 0) {
        value.tags.forEach((tag) => {
          this.addAtomInKnowbook(tag, value.id);
        });
      }
    });
  }

  @action
  //Update both Knowbooks and saved (tags)
  addAtomInKnowbook(knowbookID: KnowbookID, atomId: AtomID) {
    if (knowbookID === undefined || atomId === undefined) {
      console.log("undefined values");
      return;
    }

    if (this.knowbooks.has(knowbookID)) {
      let knowbook_updated = this.knowbooks.get(knowbookID);
      if (knowbook_updated !== undefined) {
        if (knowbook_updated.content_atoms.includes(atomId)) {
          return;
        }

        knowbook_updated.content_atoms.push(atomId);
        this.knowbooks.set(knowbookID, knowbook_updated);
      }
    } else {
      const newKnowbook: IKnowbook = {
        id: knowbookID,
        name: knowbookID,
        content_atoms: [atomId],
      };
      this.knowbooks.set(knowbookID, newKnowbook);
    }

    const updated_atom = this.getAtom(atomId);
    if (!updated_atom.tags.includes(knowbookID)) {
      updated_atom.tags.push(knowbookID);
      this.saved.set(atomId, updated_atom);
    }
  }

  @action
  //Update both Knowbooks and saved (tags)
  removeAtomFromKnowbook(knowbookID: KnowbookID, atomId: AtomID) {
    if (knowbookID === undefined || atomId === undefined) {
      console.log("undefined values");
      return;
    }

    if (this.knowbooks.has(knowbookID)) {
      let knowbook_updated = this.knowbooks.get(knowbookID);
      if (knowbook_updated !== undefined) {
        knowbook_updated.content_atoms = knowbook_updated.content_atoms.filter(
          (itemId) => {
            return itemId !== atomId;
          }
        );
        this.knowbooks.set(knowbookID, knowbook_updated);

        const updated_atom = this.getAtom(atomId);
        updated_atom.tags = updated_atom.tags.filter((itemId) => {
          return itemId !== knowbookID;
        });
        this.saved.set(atomId, updated_atom);
      } else {
        console.log("undefined values");
        return;
      }
    } else {
      console.log("impossible to remove from knowbook");
      return;
    }
  }

  getKnowbookAtomsList(knowbookID: KnowbookID): IAtom[] {
    let my_knowbook: IKnowbook | undefined;

    if (this.knowbooks.has(knowbookID)) {
      my_knowbook = this.knowbooks.get(knowbookID);

      return my_knowbook !== undefined
        ? this.getAtomsFromAtomIdList(my_knowbook.content_atoms)
        : [];
    } else {
      console.log("impossible to provide Atoms List from knowbook");
      return [];
    }
  }

  IsAtomInAnyKnowbook(atomId: AtomID): boolean {
    if (this.getAtom(atomId) === undefined) {
      return false;
    }
    const atomTag: KnowbookID[] = this.getAtom(atomId).tags;
    if (atomTag.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  isAtomInKnowbook(atomId: AtomID, knowbookId: KnowbookID): boolean {
    const knowbook = this.knowbooks.get(knowbookId);
    if (knowbook !== undefined) {
      const knowbookContentId = knowbook.content_atoms;
      return knowbookContentId.includes(atomId);
    } else {
      console.log("impossible to get the knowbook");
      return false;
    }
  }

  /************************************************ */

  @action
  setSaved(atoms: IAtom[]): void {
    atoms.forEach((item) => this.$saved.set(item.id, item));
  }

  @action
  //Only use inside the class
  addAtomInSavedFromHistory(itemId: AtomID): void {
    if (itemId === undefined) {
      return;
    }

    if (this.$history.has(itemId)) {
      const atom = this.$history.get(itemId);
      if (atom !== undefined) {
        this.$saved.set(atom.id, atom);
      } else {
        console.log(
          "impossible de trouver l'élément à sauver dans l'historique"
        );
      }
    } else {
      console.log("impossible de trouver l'élément à sauver dans l'historique");
    }
  }

  addSaved(itemId: AtomID): void {
    if (itemId === undefined) {
      return;
    }
    this.addAtomInSavedFromHistory(itemId);
  }

  @action
  removeSaved(itemId: AtomID): void {
    if (!this.IsAtomInAnyKnowbook(itemId)) {
      this.$saved.delete(itemId);
    } else {
      console.log("impossible to unsave Atoms present in Custom Knowbooks");
    }
  }

  //From Saved Atoms
  getAtomsFromAtomIdList(list_atoms: AtomID[]): IAtom[] {
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

  getAtom(id: AtomID): IAtom {
    return this.getAtomsFromAtomIdList([id])[0];
  }

  getSavedList(): IAtom[] {
    return Array.from(this.saved.values());
  }

  /************************************************ */

  getHistoryList(): IAtom[] {
    return Array.from(this.history.values());
  }
  setHistory(history: IAtom[]): void {
    if (history === undefined) {
      return;
    }
    history.forEach((item) => this.history.set(item.id, item));
  }
  addAtomsInHistory(atoms: IAtom[]): void {
    if (atoms === undefined) {
      return;
    }
    if (atoms.length !== 0) {
      atoms.forEach((item) => {
        if (this.history.has(item.id)) {
          this.history.delete(item.id);
        }
        this.history.set(item.id, item);
      });
    }
  }

  /************************************************ */
  setIdentity(identity: IIdentity): void {
    this.$identity = identity;
  }
}
