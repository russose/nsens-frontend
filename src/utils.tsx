import { IAtom } from "./types";
import { RootStore } from "./states/_RootStore";
import { usersLoaded } from "./data/dataLoader";
import { DataStore } from "./states/DataStore";

export function prepare_url(root_url: string, params: Object): string {
  let url = root_url + "?origin=*";
  Object.entries(params).forEach(([key, value]) => {
    url += "&" + key + "=" + value;
  });
  //console.log(url);
  return url;
}

export function save_object_to_file(path: string, object: Object, fs: any) {
  // const fs = require("fs") declare on server side before calling the function
  fs.writeFile(path, JSON.stringify(object), "utf8", (err: Object) => {
    if (err) {
      console.log("An error occured while writing to File.");
    }
  });
}

export function initialyzeRootStore(): RootStore {
  const rootStore: RootStore = new RootStore();

  const dataStore: DataStore = rootStore.getDataStore();

  if (dataStore.user === undefined) {
    // pageLayoutStore.set_gui_config(data_gui.fr);
    dataStore.setUser(usersLoaded[0]);
    dataStore.setAtoms(usersLoaded[0].atoms_cache);
  }

  //console.log("Initialyze RootStore completed!");

  return rootStore;
}

//TO BE DELETED?
//My initial findbyID function
export function findById(array: IAtom[], ids: number[]): IAtom[] {
  return ids
    .map((id) => array.find((el) => el.pageid_wp === id))
    .filter(isDefined);
}

/**
 * Returns a type predicate to filter undefined values of a list.
 *
 * Usage:
 * myList.filter(isDefined)
 */
export function isDefined<T>(o: Perhaps<T>): o is T {
  return o !== undefined && o !== null;
}

// return T | null | undefined
export type Perhaps<T> = T | null | undefined;
