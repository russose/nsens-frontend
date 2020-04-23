import { observable, action, computed } from "mobx";
import { IUser, IUserAction, IAtom, AtomID } from "../types";
import { isDefined } from "../utils";

export class DataStore {
  @observable private $user: IUser | undefined = undefined;
  private $atoms = observable.map<AtomID, IAtom>();
  private $saved = observable.map<AtomID, IUserAction>();
  // private $liked = observable.map<AtomID, IUserAction>();

  @computed
  get atoms() {
    return this.$atoms;
  }

  @computed
  get user(): IUser | undefined {
    return this.$user;
  }

  @computed
  get saved() {
    return this.$saved;
  }

  // @computed
  // get liked() {
  //   return this.$liked;
  // }

  @action
  setUser(user: IUser): void {
    this.$user = user;

    user.saved.forEach((item) =>
      this.$saved.set(item.id, {
        id: item.id,
        date: item.date,
      })
    );

    // user.liked.forEach((item) =>
    //   this.$liked.set(item.id, {
    //     id: item.id,
    //     date: item.date,
    //   })
    // );
  }

  @action
  setAtoms(atoms: IAtom[]): void {
    atoms.forEach((item) => this.$atoms.set(item.pageid_wp, item));
  }

  // @action
  // addLiked(id: AtomID): void {
  //   this.$liked.set(id, {
  //     id: id,
  //     date: 123212,
  //   });
  // }

  // @action
  // removeLiked(id: AtomID): void {
  //   this.$liked.delete(id);
  // }

  @action
  addSaved(id: AtomID): void {
    this.$saved.set(id, {
      id: id,
      date: 123212,
    });
  }

  @action
  removeSaved(id: AtomID): void {
    this.$saved.delete(id);
  }

  getAtomsById(list_of_ids: number[]): IAtom[] {
    return list_of_ids.map((index) => this.$atoms.get(index)).filter(isDefined);
  }

  getAtomsFromSearchPattern(searchPattern: string): IAtom[] {
    const ids_all = [0, 3, 8, 1, 2];
    let ids = [];

    for (var [key, value] of Array.from(this.atoms.entries())) {
      const stringtoSearchIn = value["title"];
      const position = stringtoSearchIn.search(searchPattern);
      if (position !== -1) {
        ids.push(key);
      }
    }
    if (ids.length === 0) {
      ids = ids_all;
    }

    return this.getAtomsById(ids);
  }

  getAtomsList(): IAtom[] {
    return Array.from(this.atoms.values());
  }

  getSavedAtoms(): IAtom[] {
    return this.getAtomsById(this.getSavedIds());
  }

  getSavedIds() {
    //console.log(Array.from(this.saved.keys()));
    return Array.from(this.saved.keys());
  }
}
