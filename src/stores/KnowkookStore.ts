import { observable, action, makeObservable, computed } from "mobx";
import {
  AtomID,
  Tlanguage,
  IKnowbook,
  IKnowbookStatic,
  KnowbookID,
  StaticKnowbookFamilyType,
} from "../config/globals";
import { getKnowbookAtomsList } from "../libs/helpersSavedKnowbooks";
import { getRandomImageFromItems } from "../libs/utils";
import { RootStore } from "./RootStore";

export class KnowkookStore {
  $rootStore: RootStore;
  private $knowbooks = observable.map<KnowbookID, IKnowbook>();
  private $staticKnowbooks = observable.map<KnowbookID, IKnowbookStatic>();
  private $imgKnowbooks = observable.map<KnowbookID, string>();
  private $imgStaticKnowbooks = observable.map<KnowbookID, string>();

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<KnowkookStore>(this, {
      init: action,
      setKnowbook: action,
      clearStaticKnowbooks: action,
      clearKnowbooks: action,
      deleteKnowbook: action,
      setKnowbooksFromList: action,
      setStaticKnowbooks: action,
      addItemInKnowbook: action,
      removeItemFromKnowbook: action,
      renameKnowbook: action,
      setImageKnowbook: action,
      setImageStaticKnowbook: action,
      // allItemsInStaticKnowbooks: computed,
      itemsInStaticKnowbooksForHome: computed,
    });
  }

  init() {
    this.clearStaticKnowbooks();
    this.clearKnowbooks();
  }

  /**
   * Images
   */

  getImageKnowbook(name: KnowbookID): string {
    return this.$imgKnowbooks.get(name);
  }

  getImageStaticKnowbook(name: KnowbookID): string {
    return this.$imgStaticKnowbooks.get(name);
  }

  setImageKnowbook(name: KnowbookID) {
    this.$imgKnowbooks.set(
      name,
      getRandomImageFromItems(
        getKnowbookAtomsList(name, this.$rootStore.stores())
      )
    );
  }

  setImageStaticKnowbook(name: KnowbookID) {
    if (!this.$imgStaticKnowbooks.has(name)) {
      // To avoid that initial setup from extract is modified
      this.$imgStaticKnowbooks.set(
        name,
        getRandomImageFromItems(this.staticKnowbooks.get(name).items)
      );
    }
  }

  /**
   * Knowbook
   */

  get knowbooks() {
    return this.$knowbooks;
  }
  setKnowbook(key: KnowbookID, item: IKnowbook) {
    this.$knowbooks.set(key, item);
    this.setImageKnowbook(key);
  }

  setKnowbooksFromList(knowbooks: IKnowbook[]): void {
    if (knowbooks === undefined || knowbooks.length === 0) {
      return;
    }

    knowbooks.forEach((knowbook) => {
      this.setKnowbook(knowbook.name, knowbook);
    });
  }

  get staticKnowbooks() {
    return this.$staticKnowbooks;
  }
  setStaticKnowbooks(key: KnowbookID, knowbook: IKnowbookStatic) {
    this.$staticKnowbooks.set(key, knowbook);
    this.setImageStaticKnowbook(key);
  }
  clearStaticKnowbooks(): void {
    this.$staticKnowbooks.clear();
    this.$imgStaticKnowbooks.clear();
  }

  clearKnowbooks(): void {
    this.$knowbooks.clear();
    this.$imgKnowbooks.clear();
  }
  deleteKnowbook(key: KnowbookID): void {
    this.$knowbooks.delete(key);
  }
  addItemInKnowbook(
    knowbookID: KnowbookID,
    atomId: AtomID,
    lang: Tlanguage
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
    lang: Tlanguage
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

  // get allItemsInStaticKnowbooks(): Set<AtomID> {
  //   const knowbookIds: KnowbookID[] = Array.from(this.staticKnowbooks.keys());
  //   return this.itemsInStaticKnowbooks(knowbookIds);
  // }

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
