import { observable, action, makeObservable, computed } from "mobx";
import {
  AtomID,
  Tlanguage,
  IKnowbook,
  IKnowbookStatic,
  KnowbookID,
  StaticKnowbookFamilyType,
  IAtom,
} from "../config/globals";
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
    let image_url = "";
    let i = 0;
    while (image_url === "" && i < 5) {
      image_url = getRandomImageFromItems(this.knowbookAtomsList(name));
      i = i + 1;
    }
    this.$imgKnowbooks.set(name, image_url);
  }

  setImageStaticKnowbook(name: KnowbookID, image_url: string) {
    // if (!this.$imgStaticKnowbooks.has(name)) {
    // To avoid that initial setup from extract is modified
    this.$imgStaticKnowbooks.set(
      name,
      // getRandomImageFromItems(this.staticKnowbooks.get(name).items)
      image_url
    );
    // }
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
    // this.setImageStaticKnowbook(key);
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

  get itemsInStaticKnowbooksForHome(): Set<AtomID> {
    const knowbookIds: KnowbookID[] = [];
    this.staticKnowbooks.forEach((staticknowbook, name) => {
      if (staticknowbook.type !== StaticKnowbookFamilyType.TREND) {
        knowbookIds.push(name);
      }
    });

    return this.itemsInStaticKnowbooks(knowbookIds);
  }

  savedAtomsFromIds(list_atoms: AtomID[]): IAtom[] {
    if (list_atoms === undefined || list_atoms.length === 0) {
      return [];
    }

    const stores = this.$rootStore.stores();
    const result = list_atoms.map((id) => {
      if (stores.savedStore.saved.has(id)) {
        return stores.baseStore.getHistoryItem(id);
      } else {
        // console.log("not in saved", id);
        return undefined;
      }
    });
    const result_no_undefined: IAtom[] = result.filter((item) => {
      return item !== undefined;
    });

    return result_no_undefined;
  }

  knowbookAtomsList(knowbookID: KnowbookID): IAtom[] {
    if (!this.knowbooks.has(knowbookID)) {
      // console.log("impossible to provide Atoms List from knowbook");
      return [];
    } else {
      const stores = this.$rootStore.stores();
      const my_knowbook = stores.knowbookStore.knowbooks.get(knowbookID);
      if (my_knowbook !== undefined) {
        return this.savedAtomsFromIds(my_knowbook.items);
      } else {
        // console.log("impossible to provide Atoms List from knowbook 2");
        return [];
      }
    }
  }

  knowbookStaticAtomsList(knowbookID: KnowbookID): IAtom[] {
    if (!this.staticKnowbooks.has(knowbookID)) {
      // console.log("impossible to provide Atoms List from knowbook");
      return [];
    } else {
      const stores = this.$rootStore.stores();
      const my_knowbook = stores.knowbookStore.staticKnowbooks.get(knowbookID);
      if (my_knowbook !== undefined) {
        return my_knowbook.items;
      } else {
        // console.log("impossible to provide Atoms List from knowbook 2");
        return [];
      }
    }
  }
}
