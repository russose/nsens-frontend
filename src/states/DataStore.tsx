import { observable, action, computed } from "mobx";
import { IUser, IUserAction, IAtom, AtomID, IConfigData } from "../types";
import { isDefined } from "../utils";
import { fetchAtomsFromWeb } from "../fetch_data";
import {
  ROOT_URL_WIKIPEDIA,
  SEARCH_MIN_LENGTH_SEARCH,
} from "../data/dataLoader";

import data_gui from "../data/data_gui.json";

export class DataStore {
  @observable private $user: IUser | undefined = undefined;
  @observable private $selectedAtomId: number = 0;
  private $atoms = observable.map<AtomID, IAtom>();
  private $saved = observable.map<AtomID, IUserAction>();

  private $guiConfig: IConfigData = data_gui.fr;

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
  get guiConfig(): IConfigData {
    return this.$guiConfig;
  }

  @action
  setUser(user: IUser): void {
    this.$user = user;

    user.saved.forEach((item) =>
      this.$saved.set(item.id, {
        id: item.id,
        date: item.date,
      })
    );
  }
  @action
  setAtoms(atoms: IAtom[]): void {
    this.$atoms.clear();
    atoms.forEach((item) => this.$atoms.set(item.pageid_wp, item));
  }
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

  @action
  searchAtomsFromWeb(searchPattern: string): IAtom[] {
    if (searchPattern.length > SEARCH_MIN_LENGTH_SEARCH) {
      fetchAtomsFromWeb(searchPattern, ROOT_URL_WIKIPEDIA, 20).then((data) => {
        this.setAtoms(data);
      });
    }

    return this.getAtomsList();
  }

  getAtomsById(list_of_ids: number[]): IAtom[] {
    return list_of_ids.map((index) => this.$atoms.get(index)).filter(isDefined);
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

  /************************************************ */

  setGuiConfig(config: IConfigData): void {
    this.$guiConfig = config;
  }

  @computed
  get selectedAtomId() {
    return this.$selectedAtomId;
  }

  @action
  setselectedAtomId(id: number): void {
    this.$selectedAtomId = id;
  }

  // getAtomsFromSearchPattern(searchPattern: string): IAtom[] {
  //   const ids_all = [0, 3, 8, 1, 2];
  //   let ids = [];

  //   for (var [key, value] of Array.from(this.atoms.entries())) {
  //     const stringtoSearchIn = value["title"];
  //     const position = stringtoSearchIn.search(searchPattern);
  //     if (position !== -1) {
  //       ids.push(key);
  //     }
  //   }
  //   if (ids.length === 0) {
  //     ids = ids_all;
  //   }

  //   return this.getAtomsById(ids);
  // }
}
