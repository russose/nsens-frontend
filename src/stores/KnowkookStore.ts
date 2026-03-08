import { action, computed, makeObservable, observable } from "mobx";
import {
  AtomID,
  IAtom,
  IKnowbook,
  KnowbookID,
  KnowbookName,
} from "../config/globals";
import { PLATFORM_OWNER_USERNAME } from "./../config/configStaticKnowbooks";
import { RootStore } from "./RootStore";

export class KnowkookStore {
  $rootStore: RootStore;

  //Contains all knowbooks of the user (public or private)
  private $knowbooks = observable.map<KnowbookID, IKnowbook>();

  private $followedPublicKnowbooks = observable.set<KnowbookID>();

  private $historyPublicKnowbooks = observable.map<KnowbookID, IKnowbook>(); //Containing all publicKnowbooks related

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<KnowkookStore>(this, {
      init: action,
      setKnowbook: action,
      clearKnowbooks: action,
      deleteKnowbook: action,
      setKnowbooksFromList: action,
      addItemInKnowbookStore: action,
      removeItemFromKnowbookStore: action,
      renameKnowbook: action,
      setImage: action,
      // setPublic: action,
      setPublicDesciptionSource: action,
      setPublicKnowbooks: action,
      setFollowedPublicKnowbooks: action,
      deleteFollowedPublicKnowbook: action,
      getSelectedKnowbook: computed,
    });
  }

  init() {
    this.clearKnowbooks();
    this.$followedPublicKnowbooks.clear();
    this.$historyPublicKnowbooks.clear();
  }

  get followedPublicKnowbooks() {
    return this.$followedPublicKnowbooks;
  }

  get knowbooks() {
    return this.$knowbooks;
  }

  get historyPublicKnowbooks() {
    return this.$historyPublicKnowbooks;
  }

  getKnowbookFromId(
    id: KnowbookID,
    privateOnly = false,
    publicOnly = false
  ): IKnowbook {
    if (privateOnly) {
      if (this.$knowbooks.has(id)) {
        return this.$knowbooks.get(id);
      } else {
        return undefined;
      }
    }
    if (publicOnly) {
      if (this.$historyPublicKnowbooks.has(id)) {
        return this.$historyPublicKnowbooks.get(id);
      } else {
        return undefined;
      }
    }

    // comes first since $knowbooks has both private and public knowbook from me
    if (this.$knowbooks.has(id)) {
      return this.$knowbooks.get(id);
    }

    if (this.$historyPublicKnowbooks.has(id)) {
      return this.$historyPublicKnowbooks.get(id);
    }

    return undefined;
  }

  get getSelectedKnowbook(): IKnowbook {
    const key = this.$rootStore.stores().uiStore.selectedKnowbook;
    return this.getKnowbookFromId(key);
  }

  getPublicKnowbooks_all(): IKnowbook[] {
    return Array.from(this.$historyPublicKnowbooks.values());
  }

  setPublicKnowbooks(knowbooks: IKnowbook[]): void {
    if (knowbooks === undefined || knowbooks.length === 0) {
      return;
    }

    knowbooks.forEach((knowbook) => {
      if (knowbook.owner === -1) {
        knowbook.owner_username = PLATFORM_OWNER_USERNAME;
      }
      if (
        (this.$historyPublicKnowbooks.has(knowbook.id) &&
          knowbook.items.length !== 0) ||
        !this.$historyPublicKnowbooks.has(knowbook.id)
      ) {
        this.$historyPublicKnowbooks.set(knowbook.id, knowbook);
      }
    });
  }

  setFollowedPublicKnowbooks(knowbooks: IKnowbook[]): void {
    if (knowbooks === undefined || knowbooks.length === 0) {
      return;
    }

    knowbooks.forEach((knowbook) => {
      this.$followedPublicKnowbooks.add(knowbook.id);
    });

    // ensure knowbooks are stored in historyPublicKnowbooks
    this.setPublicKnowbooks(knowbooks);
  }

  deleteFollowedPublicKnowbook(key: KnowbookID): void {
    this.$followedPublicKnowbooks.delete(key);
  }

  setKnowbook(key: KnowbookID, item: IKnowbook) {
    this.$knowbooks.set(key, item);
  }

  setKnowbooksFromList(knowbooks: IKnowbook[]): void {
    if (knowbooks === undefined || knowbooks.length === 0) {
      return;
    }

    knowbooks.forEach((knowbook) => {
      this.setKnowbook(knowbook.id, knowbook);
    });
  }

  clearKnowbooks(): void {
    this.$knowbooks.clear();
  }
  deleteKnowbook(key: KnowbookID): void {
    this.$knowbooks.delete(key);
  }

  renameKnowbook(id: KnowbookID, new_name: KnowbookName): void {
    if (
      new_name === "" ||
      !this.knowbooks.has(id)
      // ||
      // this.knowbooks.has(new_name)
    ) {
      return;
    }

    const is_any_knowbooks_with_new_name: boolean = Array.from(
      this.knowbooks.values()
    )
      .map((knowbook) => {
        return knowbook.name;
      })
      .includes(new_name);

    if (is_any_knowbooks_with_new_name) {
      return;
    }

    const knowbook: IKnowbook = this.knowbooks.get(id);
    knowbook.name = new_name;
    this.knowbooks.delete(id);
    this.knowbooks.set(id, knowbook);
  }

  setImage(knowbookId: KnowbookID, image_url: string) {
    if (knowbookId === undefined || image_url === undefined) {
      return;
    }
    const knowbook = this.knowbooks.get(knowbookId);
    if (knowbook === undefined) {
      return;
    }

    knowbook.image_url = image_url;
    this.$knowbooks.set(knowbookId, knowbook);
  }

  // setPublic(knowbookId: KnowbookID, isPublic: boolean) {
  //   if (knowbookId === undefined || isPublic === undefined) {
  //     return;
  //   }
  //   const knowbook = this.knowbooks.get(knowbookId);
  //   if (knowbook === undefined) {
  //     return;
  //   }

  //   knowbook.public = isPublic;
  //   this.$knowbooks.set(knowbookId, knowbook);
  // }

  setPublicDesciptionSource(
    knowbookId: KnowbookID,
    isPublic: boolean,
    description: string,
    sourceUrl: string
  ) {
    if (knowbookId === undefined || isPublic === undefined) {
      return;
    }
    const knowbook = this.knowbooks.get(knowbookId);
    if (knowbook === undefined) {
      return;
    }

    knowbook.public = isPublic;
    knowbook.description = description !== undefined ? description : "";
    knowbook.sourceUrl = sourceUrl !== undefined ? sourceUrl : "";

    this.$knowbooks.set(knowbookId, knowbook);
  }

  addItemInKnowbookStore(
    knowbookID: KnowbookID,
    atomId: AtomID
    // lang: Tlanguage
  ): void {
    if (!this.$knowbooks.has(knowbookID)) {
      return;
    }

    const knowbook_to_update: IKnowbook = this.$knowbooks.get(knowbookID);
    if (knowbook_to_update.items.includes(atomId)) {
      return;
    }

    const items_updated: AtomID[] = knowbook_to_update.items.concat(atomId);

    knowbook_to_update.items = items_updated;
    this.$knowbooks.set(knowbookID, knowbook_to_update);

    // this.$knowbooks.set(knowbookID, {
    //   id: knowbook_to_update.id,
    //   language: knowbook_to_update.language,
    //   name: knowbook_to_update.name,
    //   items: items_updated,
    //   image_url: knowbook_to_update.image_url,
    //   image_rank: knowbook_to_update.image_rank,
    //   public: knowbook_to_update.public,
    // });
  }

  removeItemFromKnowbookStore(
    knowbookID: KnowbookID,
    atomId: AtomID
    // lang: Tlanguage
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

    knowbook_to_update.items = items_updated;
    this.$knowbooks.set(knowbookID, knowbook_to_update);

    // this.$knowbooks.set(knowbookID, {
    //   id: knowbook_to_update.id,
    //   language: knowbook_to_update.language,
    //   name: knowbook_to_update.name,
    //   items: items_updated,
    //   image_url: knowbook_to_update.image_url,
    //   image_rank: knowbook_to_update.image_rank,
    //   public: knowbook_to_update.public,
    // });
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

  // knowbookAtomsList(knowbookID: KnowbookID): IAtom[] {
  //   if (!this.knowbooks.has(knowbookID)) {
  //     // console.log("impossible to provide Atoms List from knowbook");
  //     return [];
  //   } else {
  //     const stores = this.$rootStore.stores();
  //     const my_knowbook = stores.knowbookStore.knowbooks.get(knowbookID);
  //     if (my_knowbook !== undefined) {
  //       return this.savedAtomsFromIds(my_knowbook.items);
  //     } else {
  //       // console.log("impossible to provide Atoms List from knowbook 2");
  //       return [];
  //     }
  //   }
  // }

  // knowbookStaticAtomsList(knowbookID: KnowbookID): IAtom[] {
  //   if (!this.staticKnowbooks.has(knowbookID)) {
  //     // console.log("impossible to provide Atoms List from knowbook");
  //     return [];
  //   } else {
  //     const stores = this.$rootStore.stores();
  //     const my_knowbook = stores.knowbookStore.staticKnowbooks.get(knowbookID);
  //     if (my_knowbook !== undefined) {
  //       return my_knowbook.items;
  //     } else {
  //       // console.log("impossible to provide Atoms List from knowbook 2");
  //       return [];
  //     }
  //   }
  // }
}
