import { observable, action, computed } from "mobx";
import {
  IUserData,
  IAtom,
  AtomID,
  IIdentity,
  KnowbookID,
  IKnowbook,
} from "../types";
import { USER_GUI_CONFIG } from "../config";

const emptyTag = USER_GUI_CONFIG.empty_tag;
const allTags = USER_GUI_CONFIG.all_tags;

export class DataStore {
  private $identity: IIdentity | null = null;
  private $saved = observable.map<AtomID, IAtom>();
  private $history = new Map<AtomID, IAtom>();
  private $knowbooks = new Map<KnowbookID, IKnowbook>();

  get identity() {
    return this.$identity;
  }
  @computed
  get saved() {
    return this.$saved;
  }
  get history() {
    return this.$history;
  }
  get knowbooks() {
    return this.$knowbooks;
  }

  /************************************************ */

  setUserData(userData: IUserData | null): void {
    if (userData !== null) {
      this.setIdentity(userData.identity);
      this.setSaved(userData.saved);
      this.setHistory(userData.history);
      this.setKnowbooks(userData);
    }
  }

  /************************************************ */

  setKnowbooks(userData: IUserData): void {
    userData.saved.forEach((value, key) => {
      this.addAtomInKnowbook(allTags, value);
      if (value.tags.length !== 0) {
        value.tags.forEach((tag) => {
          this.addAtomInKnowbook(tag, value);
        });
      } else {
        this.addAtomInKnowbook(emptyTag, value);
      }
    });

    // userData.saved.forEach((value, key) => {
    //   this.addAtomInKnowbook(emptyTag, value);
    //   // if (value.tags.length !== 0) {
    //   value.tags.forEach((tag) => {
    //     this.addAtomInKnowbook(tag, value);
    //   });
    //   // } else {
    //   //   this.addAtomInKnowbook(emptyTag, value);
    //   // }
    // });
  }

  addAtomInKnowbook(knowbookID: KnowbookID, atom: IAtom | undefined) {
    if (knowbookID === undefined || atom === undefined) {
      return;
    }
    if (this.knowbooks.has(knowbookID)) {
      let knowbook_updated: IKnowbook | undefined = this.knowbooks.get(
        knowbookID
      );
      if (knowbook_updated !== undefined) {
        knowbook_updated.content_atoms.push(atom);
        this.knowbooks.set(knowbookID, knowbook_updated);
      }
    } else {
      const newKnowbook: IKnowbook = {
        id: knowbookID,
        name: knowbookID,
        content_atoms: [atom],
      };
      this.knowbooks.set(knowbookID, newKnowbook);
    }

    // this.knowbooks.forEach((value, key) => {
    //   console.log(key, value.name, value.content_atoms);
    // });
  }

  removeAtomFromKnowbook(knowbookID: KnowbookID, atom: IAtom | undefined) {
    if (atom === undefined) {
      return;
    }

    if (this.knowbooks.has(knowbookID)) {
      let knowbook_updated: IKnowbook | undefined = this.knowbooks.get(
        knowbookID
      );
      if (knowbook_updated !== undefined) {
        knowbook_updated.content_atoms = knowbook_updated.content_atoms.filter(
          (item) => {
            item.id !== atom.id;
          }
        );
        this.knowbooks.set(knowbookID, knowbook_updated);
      }
    }
  }

  getKnowbookAtomsList(knowbookID: KnowbookID): IAtom[] {
    let my_knowbook: IKnowbook | undefined;
    let my_knowbookID: KnowbookID = knowbookID;
    if (knowbookID === undefined) {
      my_knowbookID = emptyTag;
    }

    if (this.knowbooks.has(my_knowbookID)) {
      my_knowbook = this.knowbooks.get(my_knowbookID);

      return my_knowbook !== undefined ? my_knowbook.content_atoms : [];
    } else {
      return [];
    }
  }

  getAtomsIdsSavedAndInKnowbooks(): AtomID[] {
    const ids_all = this.getKnowbookAtomsList(allTags).map((item) => {
      return item.id;
    });
    const ids_none = this.getKnowbookAtomsList(emptyTag).map((item) => {
      return item.id;
    });
    let ids: AtomID[] = [];
    ids_all.forEach((item) => {
      if (!ids_none.includes(item)) {
        ids.push(item);
      }
    });

    return ids;
  }

  isAtomInKnowbook(atomId: AtomID, knowbookId: KnowbookID): boolean {
    const knowbook = this.knowbooks.get(knowbookId);
    if (knowbook !== undefined) {
      const knowbookContentId = knowbook.content_atoms.map((item) => {
        return item.id;
      });
      return knowbookContentId.includes(atomId);
    } else {
      return false;
    }
  }

  /************************************************ */

  getSavedList(): IAtom[] {
    return Array.from(this.saved.values());
  }

  getSavedIds() {
    return Array.from(this.saved.keys());
  }

  @action
  setSaved(atoms: IAtom[]): void {
    atoms.forEach((item) => this.saved.set(item.id, item));
  }
  @action
  addSaved(item: IAtom): void {
    this.saved.set(item.id, item);
    this.addAtomInKnowbook(emptyTag, item);
    this.addAtomInKnowbook(allTags, item);
  }
  @action
  removeSaved(item: IAtom): void {
    //TO DO: check that item is in NO knowbooks except emptyTag and allTags
    this.saved.delete(item.id);
  }

  /************************************************ */

  getHistoryList(): IAtom[] {
    return Array.from(this.history.values());
  }
  setHistory(history: IAtom[]): void {
    history.forEach((item) => this.history.set(item.id, item));
  }
  addAtomsInHistory(atoms: IAtom[]): void {
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

  /************************************************ */

  // get guiConfig(): IConfigData {
  //   return this.$guiConfig;
  // }

  // setGuiConfig(config: IConfigData): void {
  //   this.$guiConfig = config;
  // }

  // @computed
  // get selectedAtomId() {
  //   return this.$selectedAtomId;
  // }

  // @action
  // setselectedAtomId(id: number): void {
  //   this.$selectedAtomId = id;
  // }
}
