import { observable, action, makeObservable } from "mobx";
import {
  IAtom,
  AtomID,
  // IUser,
  IKnowbook,
  KnowbookID,
} from "../config/globals";
import { getSavedAtomsFromIds } from "../libs/helpersSaved";
import {
  _addItemInKnowbook,
  _addKnowbook,
  _removeItemFromKnowbook,
  _renameKnowbook,
  _removeKnowbook,
} from "../libs/_apiUserData";
import { IStores } from "./_RootStore";

export class KnowkookStore {
  private $knowbooks = observable.map<KnowbookID, IKnowbook>();

  constructor() {
    // makeObservable<SavedStore, "$user">(this, {
    makeObservable<KnowkookStore>(this, {
      // knowbooks: computed,
      setKnowbooks: action,
      clearKnowbooks: action,
      // addItemInKnowbook: action,
      // removeItemFromKnowbook: action,
      // renameKnowbook: action,
      // deleteKnowbook: action,
    });
  }
  /**
   * Knowbook
   */
  get knowbooks() {
    return this.$knowbooks;
  }
  setKnowbooks(knowbooks: IKnowbook[]): void {
    knowbooks.forEach((item) => {
      this.$knowbooks.set(item.name, item);
    });
  }
  clearKnowbooks(): void {
    this.$knowbooks.clear();
  }
}
