import { observable, action, computed } from "mobx";
import { IUserData, IAtom, AtomID } from "../types";
import { isDefined } from "../utils";

import { CONFIG_GUI } from "../config";
import Router from "next/router";

export class DataStore {
  private $userData: IUserData | undefined = undefined;
  private $saved = observable.map<AtomID, IAtom>();
  @observable private $searchPattern: string = "";
  //@observable private $selectedAtomId: number = 0;

  setUserData(userData: IUserData): void {
    this.$userData = userData;
    this.setSaved(userData.saved);
  }

  get userData(): IUserData | undefined {
    return this.$userData;
  }

  @computed
  get saved() {
    return this.$saved;
  }
  @computed
  get searchPattern() {
    return this.$searchPattern;
  }

  /************************************************ */

  getSavedList(): IAtom[] {
    return Array.from(this.saved.values());
  }
  getSavedIds() {
    return Array.from(this.saved.keys());
  }

  @action
  setSaved(atoms: IAtom[]): void {
    atoms.forEach((item) => this.saved.set(item.id, item));
  }
  @action
  addSaved(item: IAtom): void {
    this.saved.set(item.id, item);
  }
  @action
  removeSaved(item: IAtom): void {
    this.saved.delete(item.id);
  }
  @action
  setSearchPattern(searchPattern: string): void {
    this.$searchPattern = searchPattern;
    if (searchPattern.length > CONFIG_GUI.all.SEARCH_MIN_LENGTH_SEARCH) {
      Router.push({
        pathname: "/",
        query: { q: this.$searchPattern },
      });
    }
  }
  getHomeUrl() {
    return "/" + "?q=" + encodeURI(this.$searchPattern);
  }

  /************************************************ */

  // get guiConfig(): IConfigData {
  //   return this.$guiConfig;
  // }

  // setGuiConfig(config: IConfigData): void {
  //   this.$guiConfig = config;
  // }

  // @computed
  // get selectedAtomId() {
  //   return this.$selectedAtomId;
  // }

  // @action
  // setselectedAtomId(id: number): void {
  //   this.$selectedAtomId = id;
  // }

  // @action
  // searchAtomsFromWeb(searchPattern: string): IAtom[] {
  //   if (searchPattern.length > CONFIG_GUI.all.SEARCH_MIN_LENGTH_SEARCH) {
  //     fetchAtomsFromWeb(
  //       searchPattern,
  //       CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA,
  //       CONFIG_FETCHING.amount_data_fetched,
  //       enrichImagesFromWikipediaEN
  //     ).then((data) => {
  //       this.setAtoms(data);
  //     });
  //   }

  //   return this.getAtomsList();
  // }

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
