import { IAtom, IUserData } from "./types";
import {
  fetchAtomsFromWeb,
  enrichImagesBatchFromWikipediaEN,
  enrichImagesOneByOneFromWikiCommonPediaParralel,
  searchItemsFetchDataCleanImages,
} from "./fetch_data";
import { CONFIG_FETCHING } from "./config";

import myData from "./data/cache_user1.json";
import { DataStore } from "./states/DataStore";
const myUserData = myData.user as IUserData;

export interface ISyncBackFrontProps {
  userData: IUserData | null;
  atomsListResult: IAtom[];
}

export async function indexSyncServerClientBack(
  query_seach: string | undefined,
  query_action: string | undefined
): Promise<ISyncBackFrontProps> {
  let output: ISyncBackFrontProps = {
    userData: null,
    atomsListResult: [],
  };

  if (query_action === undefined) {
    output.userData = myUserData;
  } else if (query_action === "n") {
    //Nothing to do, resturn empty output;
  } else if (query_action === "s") {
    const searchPattern = query_seach;
    if (searchPattern !== undefined) {
      output.atomsListResult = await searchItemsFetchDataCleanImages(
        searchPattern,
        CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA,
        CONFIG_FETCHING.amount_data_fetched
      );
    } else {
      //Nothing to do, resturn empty output;
    }
  } else {
    //This should not happen when finished
  }

  return output;
}

export function save_object_to_file(
  path: string,
  object_string: string | undefined,
  fs: any
) {
  // if (object_string === undefined) {
  //   return;
  // }
  // const fs = require("fs"); //declare on server side before calling the function
  fs.writeFile(path, object_string, "utf8", (err: Object) => {
    if (err) {
      console.log("An error occured while writing to File.");
    }
  });
}

export function buildUserDataExport(dataStore: DataStore): string {
  let userData: IUserData | null = null;
  if (dataStore.identity !== null) {
    userData = {
      identity: dataStore.identity,
      saved: dataStore.getSavedList(),
      history: dataStore.getHistoryList(),
    };
  }
  return JSON.stringify({ user: userData });
}

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
