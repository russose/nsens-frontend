import { SavedStore } from "./SavedStore";
import { observable, action, makeObservable } from "mobx";
import {
  IAtom,
  AtomID,
  // IUser,
  IKnowbook,
  KnowbookID,
} from "../common/types";
import {
  _addItemInKnowbook,
  _addKnowbook,
  _removeItemFromKnowbook,
  _renameKnowbook,
  _removeKnowbook,
} from "../_api";

export class KnowkookStore {
  private $knowbooks = observable.map<KnowbookID, IKnowbook>();

  constructor() {
    // makeObservable<SavedStore, "$user">(this, {
    makeObservable<KnowkookStore>(this, {
      // knowbooks: computed,
      setKnowbooks: action,
      clearKnowbooks: action,
      addItemInKnowbook: action,
      removeItemFromKnowbook: action,
      renameKnowbook: action,
      deleteKnowbook: action,
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

  /*******************KNOWBOOKS*************************** */

  renameKnowbook(name: KnowbookID, new_name: KnowbookID) {
    if (!this.$knowbooks.has(name) || this.$knowbooks.has(new_name)) {
      return;
    }

    _renameKnowbook(name, new_name)
      .then(
        action(() => {
          const knowbooks_list: IKnowbook[] = [];
          this.$knowbooks.forEach((knowbook, key_name) => {
            if (key_name !== name) {
              knowbooks_list.push(knowbook);
            } else {
              const knowbook_with_new_name = knowbook;
              knowbook_with_new_name.name = new_name;
              knowbooks_list.push(knowbook_with_new_name);
            }
          });
          this.clearKnowbooks();
          this.setKnowbooks(knowbooks_list);
        })
      )
      .catch((error) => {
        // console.log("error in renaming knowbook");
      });
  }

  deleteKnowbook(name: KnowbookID, savedStore: SavedStore) {
    if (!this.knowbooks.has(name)) {
      return;
    }
    if (this.getKnowbookAtomsList(name, savedStore).length !== 0) {
      return;
    }
    _removeKnowbook(name)
      .then(
        action(() => {
          this.knowbooks.delete(name);
        })
      )
      .catch((error) => {
        // console.log("error in removing knowbook");
      });
  }

  //if the knowbook doesn't extist, create it
  addItemInKnowbook(knowbookID: KnowbookID, atomId: AtomID) {
    if (knowbookID === undefined || atomId === undefined) {
      // console.log("undefined values");
      return;
    }

    if (this.knowbooks.has(knowbookID)) {
      const knowbook_updated = this.knowbooks.get(knowbookID);
      if (knowbook_updated !== undefined) {
        if (knowbook_updated.items.includes(atomId)) {
          return;
        }
        // const knowbook_backup: IKnowbook = knowbook_updated;
        knowbook_updated.items.push(atomId);
        // this.knowbooks.set(knowbookID, knowbook_updated);

        _addItemInKnowbook(knowbookID, atomId)
          .then(
            action(() => {
              // if (knowbook_updated !== undefined) {
              this.knowbooks.set(knowbookID, knowbook_updated);
              // console.log("item added in knowbook successfully");
              // return;
              // }
            })
          )
          .catch((error) => {
            // this.knowbooks.set(knowbookID, knowbook_backup);
            console.log("error in adding item in knowbook");
            // return;
          });
      } else {
        // console.log("error");
      }
    } else {
      const newKnowbook: IKnowbook = {
        id: -1, //id not used in front but only in back
        name: knowbookID,
        items: [atomId],
      };
      // this.knowbooks.set(knowbookID, newKnowbook);
      _addKnowbook(knowbookID)
        .then(() => {
          _addItemInKnowbook(knowbookID, atomId);
        })
        .then(
          action(() => {
            this.knowbooks.set(knowbookID, newKnowbook);
            // console.log(
            //   "knowbook created, item added in knowbook successfully"
            // );
            // return;
          })
        )
        //     .catch(() => {
        //       console.log("error in adding item in knowbook");
        //     });
        // })
        .catch(() => {
          // this.knowbooks.delete(knowbookID);
          console.log("error in creating knowbook and adding item");
          // return;
        });
    }
  }

  //Update both Knowbooks and saved (tags)
  removeItemFromKnowbook(knowbookID: KnowbookID, atomId: AtomID) {
    if (knowbookID === undefined || atomId === undefined) {
      console.log("undefined values");
      return;
    }

    if (this.knowbooks.has(knowbookID)) {
      let knowbook_updated = this.knowbooks.get(knowbookID);
      if (knowbook_updated !== undefined) {
        // const knowbook_backup: IKnowbook = knowbook_updated;
        knowbook_updated.items = knowbook_updated.items.filter((itemId) => {
          return itemId !== atomId;
        });
        // this.knowbooks.set(knowbookID, knowbook_updated);

        _removeItemFromKnowbook(knowbookID, atomId)
          .then(
            action(() => {
              if (knowbook_updated !== undefined) {
                this.knowbooks.set(knowbookID, knowbook_updated);
                // console.log("item removed in knowbook successfully");
              }
              return;
            })
          )
          .catch(() => {
            // this.knowbooks.set(knowbookID, knowbook_backup);
            console.log("error in removing item from knowbook");
            return;
          });
      } else {
        console.log("undefined values");
        return;
      }
    } else {
      console.log("impossible to remove from knowbook");
      return;
    }
  }

  getKnowbookAtomsList(
    knowbookID: KnowbookID,
    savedStore: SavedStore
  ): IAtom[] {
    if (!this.knowbooks.has(knowbookID)) {
      // console.log("impossible to provide Atoms List from knowbook");
      return [];
    } else {
      const my_knowbook = this.knowbooks.get(knowbookID);
      if (my_knowbook !== undefined) {
        return savedStore.getSavedAtomsFromIds(my_knowbook.items);
      } else {
        // console.log("impossible to provide Atoms List from knowbook");
        return [];
      }
    }
  }

  isItemInKnowbook(atomId: AtomID, knowbookId: KnowbookID): boolean {
    const knowbook = this.knowbooks.get(knowbookId);
    if (knowbook !== undefined) {
      const knowbookContentId = knowbook.items;
      return knowbookContentId.includes(atomId);
    } else {
      console.log("knowbook doesn't exist");
      return false;
    }
  }

  IsItemInAnyKnowbook(atomId: AtomID): boolean {
    if (atomId === undefined) {
      return false;
    }

    const knowbookIds: KnowbookID[] = Array.from(this.knowbooks.keys());
    for (let knowbookId of knowbookIds) {
      const inside = this.isItemInKnowbook(atomId, knowbookId);
      if (inside) {
        return true;
      }
    }
    return false;
  }

  ItemsInNoKnowbook(savedStore: SavedStore): IAtom[] {
    const itemsIdList: AtomID[] = [];

    savedStore.saved.forEach((item) => {
      const knowbookIds: KnowbookID[] = Array.from(this.knowbooks.keys());
      for (let knowbookId of knowbookIds) {
        const inside = this.isItemInKnowbook(item.id, knowbookId);
        if (inside) {
          return;
        }
      }
      itemsIdList.push(item.id);
      return;
    });

    return savedStore.getSavedAtomsFromIds(itemsIdList);
  }
}
