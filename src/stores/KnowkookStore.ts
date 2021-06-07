import { observable, action, makeObservable } from "mobx";
import {
  AtomID,
  IKnowbook,
  IKnowbookStatic,
  KnowbookID,
} from "../config/globals";

export class KnowkookStore {
  private $knowbooks = observable.map<KnowbookID, IKnowbook>();
  private $staticKnowbooks = observable.map<KnowbookID, IKnowbookStatic>();

  constructor() {
    makeObservable<KnowkookStore>(this, {
      // knowbooks: computed,
      setKnowbooks: action,
      clearKnowbooks: action,
      deleteKnowbooks: action,
      setKnowbooksFromList: action,
      setStaticKnowbooks: action,
      addItemInKnowbook: action,
      removeItemFromKnowbook: action,
      renameKnowbook: action,
    });
  }
  /**
   * Knowbook
   */
  get knowbooks() {
    return this.$knowbooks;
  }
  setKnowbooks(key: KnowbookID, item: IKnowbook) {
    this.$knowbooks.set(key, item);
  }
  setKnowbooksFromList(knowbooks: IKnowbook[]): void {
    if (knowbooks === undefined || knowbooks.length === 0) {
      return;
    }

    knowbooks.forEach((knowbook) => {
      this.$knowbooks.set(knowbook.name, knowbook);
    });
  }

  get staticKnowbooks() {
    return this.$staticKnowbooks;
  }
  setStaticKnowbooks(key: KnowbookID, knowbook: IKnowbookStatic) {
    this.$staticKnowbooks.set(key, knowbook);
  }

  clearKnowbooks(): void {
    this.$knowbooks.clear();
  }
  deleteKnowbooks(key: KnowbookID): void {
    this.$knowbooks.delete(key);
  }
  addItemInKnowbook(knowbookID: KnowbookID, atomId: AtomID): void {
    if (!this.$knowbooks.has(knowbookID)) {
      return;
    }

    const knowbook_to_update: IKnowbook = this.$knowbooks.get(knowbookID);
    if (knowbook_to_update.items.includes(atomId)) {
      return;
    }

    const items_updated: AtomID[] = knowbook_to_update.items.concat(atomId);

    this.$knowbooks.set(knowbookID, {
      id: knowbook_to_update.id,
      name: knowbook_to_update.name,
      items: items_updated,
    });
  }

  removeItemFromKnowbook(knowbookID: KnowbookID, atomId: AtomID): void {
    if (!this.$knowbooks.has(knowbookID)) {
      return;
    }

    const knowbook_to_update: IKnowbook = this.$knowbooks.get(knowbookID);
    const items_updated: AtomID[] = knowbook_to_update.items.filter(
      (itemId) => {
        return itemId !== atomId;
      }
    );

    this.$knowbooks.set(knowbookID, {
      id: knowbook_to_update.id,
      name: knowbook_to_update.name,
      items: items_updated,
    });
  }

  renameKnowbook(name: KnowbookID, new_name: KnowbookID): void {
    if (
      new_name === "" ||
      !this.knowbooks.has(name) ||
      this.knowbooks.has(new_name)
    ) {
      return;
    }

    const knowbook: IKnowbook = this.knowbooks.get(name);
    knowbook.name = new_name;
    // console.log(knowbook.name);
    this.knowbooks.delete(name);
    this.knowbooks.set(new_name, knowbook);
  }
}
