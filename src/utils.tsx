import { IAtom, ConfigDataCategoryType } from "./types";
import { DataStore } from "./states/DataStore";

export function newAtom(id: number): IAtom {
  const atom = {
    id: id,
    saved: false,
    tags: [],
    save_date: -1,
    wikibase_item: "none",
    pageid_wp: -1,
    title: "none",
    title_en: "none",
    image: "none",
    category: ConfigDataCategoryType.TBD,
  };
  return atom;
}

export function prepare_url(root_url: string, params: Object): string {
  let query: string = "";
  Object.entries(params).forEach(([key, value]) => {
    query += "&" + key + "=" + value;
  });
  return root_url + "?origin=*" + encodeURI(query);
}

export function save_object_to_file(path: string, object: Object, fs: any) {
  // const fs = require("fs") declare on server side before calling the function
  fs.writeFile(path, JSON.stringify(object), "utf8", (err: Object) => {
    if (err) {
      console.log("An error occured while writing to File.");
    }
  });
}

export function printUserData(dataStore: DataStore) {
  if (dataStore.userData === undefined) {
    return;
  }
  const cache: any = dataStore.userData;
  cache.saved = dataStore.getSavedList();
  console.log("****cache***");
  console.log(JSON.stringify({ user: cache }));
  console.log("************");
}

// export function initialyzeRootStore(): RootStore {
//   const rootStore: RootStore = new RootStore();

//   // const dataStore: DataStore = rootStore.getDataStore();

//   // if (dataStore.user === undefined) {
//   //   dataStore.setUser(usersLoaded[0]);
//   //   //dataStore.setAtoms([]);
//   //   dataStore.setAtoms(usersLoaded[0].atoms_cache);
//   // }

//   //console.log("Initialyze RootStore completed!");

//   return rootStore;
// }

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

// export function read_object_from_file(
//   path: string,
//   object: Object,
//   fs: any
// ): Object {
//   // const fs = require("fs") declare on server side before calling the function
//   let data: Object = {};
//   fs.readFile(path, "utf8", (err: Object, mydata: Object) => {
//     if (err) {
//       console.log("An error occured while reading from File.");
//     }
//     object = mydata;
//     console.log(object);
//   });
//   return data;
// }
