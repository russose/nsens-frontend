import { IAtom, ConfigDataLanguage, ConfigDataCategoryType } from "./types";
import { RootStore } from "./states/_RootStore";
import { usersLoaded } from "./data/dataLoader";
import { DataStore } from "./states/DataStore";

export function newAtom(id: number): IAtom {
  const atom = {
    id: id,
    wikibase_item: "none",
    pageid_wp: -1,
    author_id: -1,
    language: ConfigDataLanguage.fr,
    title: "none",
    title_en: "none",
    image: "none",
    creation_date: -1,
    category: ConfigDataCategoryType.TBD,
  };
  return atom;
}

export function prepare_url(root_url: string, params: Object): string {
  // let url = root_url + "?origin=*";
  let query: string = "";
  Object.entries(params).forEach(([key, value]) => {
    query += "&" + key + "=" + value;
  });
  //console.log(url);
  // return encodeURI(url);
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

// export function getListstringFromObjectlist(
//   myobject: Object[],
//   key_value: string
// ): string {
//   let list_of_PageIds_string = "";
//   myobject.map((item: Object) => {
//     Object.entries(item).forEach(([key, value]) => {
//       if (key === key_value) {
//         list_of_PageIds_string = list_of_PageIds_string + value + "|";
//       }
//       return {
//         list_of_PageIds_string,
//       };
//     });
//   });
//   return list_of_PageIds_string.slice(0, -1);
// }

export function initialyzeRootStore(): RootStore {
  const rootStore: RootStore = new RootStore();

  const dataStore: DataStore = rootStore.getDataStore();

  if (dataStore.user === undefined) {
    dataStore.setUser(usersLoaded[0]);
    //dataStore.setAtoms([]);
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
