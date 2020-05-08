import { observable, action, computed } from "mobx";
import { IUserData, IAtom, AtomID, IIdentity } from "../types";

export class DataStore {
  private $identity: IIdentity | null = null;
  private $saved = observable.map<AtomID, IAtom>();
  private $history = new Map<AtomID, IAtom>();
  @observable private $searchPattern: string = "";
  //@observable private $selectedAtomId: number = 0;

  get identity() {
    return this.$identity;
  }
  @computed
  get saved() {
    return this.$saved;
  }
  get history() {
    return this.$history;
  }

  @computed
  get searchPattern() {
    return this.$searchPattern;
  }

  /************************************************ */

  setUserData(userData: IUserData | null): void {
    if (userData !== null) {
      this.setIdentity(userData.identity);
      this.setSaved(userData.saved);
      this.setHistory(userData.history);
    }
  }

  getSavedList(): IAtom[] {
    return Array.from(this.saved.values());
  }
  getHistoryList(): IAtom[] {
    return Array.from(this.history.values());
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
  //
  setIdentity(identity: IIdentity): void {
    this.$identity = identity;
  }
  setHistory(history: IAtom[]): void {
    history.forEach((item) => this.history.set(item.id, item));
  }
  addAtomsInHistory(atoms: IAtom[]): void {
    if (atoms.length !== 0) {
      atoms.forEach((item) => {
        if (this.history.has(item.id)) {
          this.history.delete(item.id);
        }
        this.history.set(item.id, item);
      });
    }
  }

  @action
  setSearchPattern(searchPattern: string): void {
    this.$searchPattern = searchPattern;
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
