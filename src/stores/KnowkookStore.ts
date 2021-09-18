import { observable, action, makeObservable, computed } from "mobx";
import {
  AtomID,
  ConfigLanguage,
  IKnowbook,
  IKnowbookStatic,
  KnowbookID,
  StaticKnowbookFamilyType,
} from "../config/globals";
import { RootStore } from "./RootStore";

export class KnowkookStore {
  $rootStore: RootStore;
  private $knowbooks = observable.map<KnowbookID, IKnowbook>();
  private $staticKnowbooks = observable.map<KnowbookID, IKnowbookStatic>();

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<KnowkookStore>(this, {
      init: action,
      setKnowbooks: action,
      clearStaticKnowbooks: action,
      clearKnowbooks: action,
      deleteKnowbook: action,
      setKnowbooksFromList: action,
      setStaticKnowbooks: action,
      addItemInKnowbook: action,
      removeItemFromKnowbook: action,
      renameKnowbook: action,
      allItemsInStaticKnowbooks: computed,
      itemsInStaticKnowbooksForHome: computed,
    });
  }
  /**
   * Knowbook
   */

  init() {
    this.clearStaticKnowbooks();
    this.clearKnowbooks();
  }

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
  clearStaticKnowbooks(): void {
    this.$staticKnowbooks.clear();
  }

  clearKnowbooks(): void {
    this.$knowbooks.clear();
  }
  deleteKnowbook(key: KnowbookID): void {
    this.$knowbooks.delete(key);
  }
  addItemInKnowbook(
    knowbookID: KnowbookID,
    atomId: AtomID,
    lang: ConfigLanguage
  ): void {
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
      language: lang,
      name: knowbook_to_update.name,
      items: items_updated,
    });
  }

  removeItemFromKnowbook(
    knowbookID: KnowbookID,
    atomId: AtomID,
    lang: ConfigLanguage
  ): void {
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
      language: lang,
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

  itemsInStaticKnowbooks(ids: KnowbookID[]): Set<AtomID> {
    const itemsInStaticKnowbooks_ = new Set<AtomID>();
    for (let knowbookId of ids) {
      this.staticKnowbooks.get(knowbookId).items.forEach((item) => {
        itemsInStaticKnowbooks_.add(item.id);
      });
    }
    return itemsInStaticKnowbooks_;
  }

  get allItemsInStaticKnowbooks(): Set<AtomID> {
    const knowbookIds: KnowbookID[] = Array.from(this.staticKnowbooks.keys());
    return this.itemsInStaticKnowbooks(knowbookIds);
  }

  get itemsInStaticKnowbooksForHome(): Set<AtomID> {
    const knowbookIds: KnowbookID[] = [];
    this.staticKnowbooks.forEach((staticknowbook, name) => {
      if (staticknowbook.type !== StaticKnowbookFamilyType.TREND) {
        knowbookIds.push(name);
      }
    });

    return this.itemsInStaticKnowbooks(knowbookIds);
  }
}
