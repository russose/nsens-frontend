import { LogActionType } from "./../common/types";
import { observable, action, computed } from "mobx";
import { IAtom, AtomID, IUser, KnowbookID, IKnowbook } from "../common/types";
import {
  _save,
  _unsave,
  _log,
  _addItemInKnowbook,
  _addKnowbook,
  _removeItemFromKnowbook,
} from "../_api";
import { CONFIG_FETCHING } from "../common/config";
import {
  randomItemsFetchDataCleanImages,
  searchItemsFetchDataCleanImages,
} from "../common/fetchAtom";

export class DataStore {
  @observable private $user: IUser | null = null; //when username="", it means the user is not logged!
  private $feed = observable.map<AtomID, IAtom>();
  private $saved = observable.map<AtomID, IAtom>();
  private $knowbooks = observable.map<KnowbookID, IKnowbook>();
  // private $knowbooks = new Map<KnowbookID, IKnowbook>();

  @computed get isLogged(): boolean {
    if (this.user === undefined || this.user === null) {
      return false;
    }
    if (this.user.username === "") {
      return false;
    } else {
      return true;
    }
  }

  get user() {
    return this.$user;
  }
  @action
  setUser(user: IUser): void {
    this.$user = user;
  }
  get feed() {
    return this.$feed;
  }
  getFeedList(): IAtom[] {
    return Array.from(this.feed.values());
  }
  @action
  setFeed(feed: IAtom[]): void {
    if (feed === undefined) {
      return;
    }
    this.$feed.clear();
    feed.forEach((item) => this.$feed.set(item.id, item));
  }
  get saved() {
    return this.$saved;
  }
  getSavedList(): IAtom[] {
    return Array.from(this.saved.values());
  }
  @action
  setSaved(atoms: IAtom[]): void {
    atoms.forEach((item) => this.$saved.set(item.id, item));
  }
  @action
  clearSaved(): void {
    this.$saved.clear();
  }
  get knowbooks() {
    return this.$knowbooks;
  }
  @action
  setKnowbooks(knowbooks: IKnowbook[]): void {
    knowbooks.forEach((item) => {
      this.$knowbooks.set(item.name, item);
    });
  }
  @action
  clearKnowbooks(): void {
    this.$knowbooks.clear();
  }

  /******************INIT**************************** */
  // initDatastore(userData: IUserData): void {
  //   this.setUser(userData.user);
  //   this.setFeed(userData.feed);
  //   this.setSaved(userData.saved);
  //   this.setKnowbooks(userData.knowbooks);
  // }

  /*****************FEED**************************** */

  @action
  setFeedFromRandom(): void {
    randomItemsFetchDataCleanImages(
      CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA,
      CONFIG_FETCHING.amount_data_fetched
    )
      .then((atoms) => {
        this.setFeed(atoms);
      })
      .catch((error) => {
        // console.log("error in find random");
        console.log(error);
      });
  }
  @action
  setFeedFromSearch(searchPattern: string): void {
    if (searchPattern === undefined) {
      return;
    }

    searchItemsFetchDataCleanImages(
      searchPattern,
      CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA,
      CONFIG_FETCHING.amount_data_fetched
    )
      .then((atoms) => {
        this.setFeed(atoms);
      })
      .then(() => {
        if (this.isLogged) {
          _log(LogActionType.search, searchPattern);
        }
      })
      .catch((error) => {
        console.log("error in seach from pattern");
        console.log(error);
      });
  }

  /******************SAVED************************** */

  @action
  addSaved(itemId: AtomID): void {
    if (itemId === undefined || !this.isLogged) {
      return;
    }
    if (this.$feed.has(itemId)) {
      const atom = this.$feed.get(itemId);
      if (atom !== undefined) {
        // this.$saved.set(atom.id, atom);
        _save(atom)
          .then(
            action(() => {
              this.$saved.set(atom.id, atom);
              // console.log("saved successfully");
            })
          )
          .catch(() => {
            // this.$saved.delete(itemId);
            console.log("network error, error in saved");
          });
      } else {
        console.log("impossible to save");
      }
    } else {
      console.log("impossible to save");
    }
  }

  @action
  removeSaved(itemId: AtomID): void {
    if (itemId === undefined || !this.isLogged) {
      return;
    }

    if (!this.IsItemInAnyKnowbook(itemId)) {
      // const atom_backup: IAtom | undefined = this.$saved.get(itemId);
      // if (atom_backup === undefined) {
      //   return;
      // }
      // this.$saved.delete(itemId);
      _unsave(itemId)
        .then(
          action(() => {
            this.$saved.delete(itemId);
            // console.log("unsaved successfully");
          })
        )
        .catch(() => {
          // this.$saved.set(itemId, atom_backup);
          console.log("network error, error in unsaved");
        });
    } else {
      console.log("impossible to unsave: Atoms present in Custom Knowbooks");
    }
  }

  getSavedAtomsFromIds(list_atoms: AtomID[]): IAtom[] {
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

  /*******************KNOWBOOKS*************************** */

  @action
  //if the knowbook doesn't extist, create it
  addItemInKnowbook(knowbookID: KnowbookID, atomId: AtomID) {
    if (knowbookID === undefined || atomId === undefined) {
      // console.log("undefined values");
      return;
    }
    //We do not check that atomId is in saved since it is blocked by the UI and the back check it by construction
    if (this.knowbooks.has(knowbookID)) {
      let knowbook_updated = this.knowbooks.get(knowbookID);
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
              if (knowbook_updated !== undefined) {
                this.knowbooks.set(knowbookID, knowbook_updated);
                // console.log("item added in knowbook successfully");
                // return;
              }
            })
          )
          .catch((error) => {
            // this.knowbooks.set(knowbookID, knowbook_backup);
            console.log("error in adding item in knowbook");
            // return;
          });
      }
    } else {
      const newKnowbook: IKnowbook = {
        name: knowbookID,
        items: [atomId],
      };
      // this.knowbooks.set(knowbookID, newKnowbook);
      _addKnowbook(knowbookID)
        .then(() => {
          _addItemInKnowbook(knowbookID, atomId)
            .then(
              action(() => {
                this.knowbooks.set(knowbookID, newKnowbook);
                // console.log(
                //   "knowbook created, item added in knowbook successfully"
                // );
                return;
              })
            )
            .catch(() => {
              console.log("error in adding item in knowbook");
            });
        })
        .catch(() => {
          // this.knowbooks.delete(knowbookID);
          console.log("error in creating knowbook");
          return;
        });
    }
  }

  @action
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

  getKnowbookAtomsList(knowbookID: KnowbookID): IAtom[] {
    let my_knowbook: IKnowbook | undefined;

    if (this.knowbooks.has(knowbookID)) {
      my_knowbook = this.knowbooks.get(knowbookID);

      return my_knowbook !== undefined
        ? this.getSavedAtomsFromIds(my_knowbook.items)
        : [];
    } else {
      // console.log("impossible to provide Atoms List from knowbook");
      return [];
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

  ItemsInNoKnowbook(): IAtom[] {
    const itemsIdList: AtomID[] = [];

    this.saved.forEach((item) => {
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

    return this.getSavedAtomsFromIds(itemsIdList);
  }
}
