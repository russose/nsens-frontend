import { DataStore } from "./stores/DataStore";
import { _api } from "./srcCommon/fetch";
import {
  _getUser,
  _getRefreshFeed,
  _getSavedList,
  _getKnowbooksList,
} from "./_api";

const searchPattern = "einstein";

export async function initializeApp(datastore: DataStore) {
  try {
    const user = await _getUser();
    datastore.setUser({ username: user });

    if (!datastore.isLogged) {
      datastore.setFeedFromSearch(searchPattern);
      // datastore.setSaved([]);
      // datastore.setKnowbooks([]);
    } else {
      await initializeUserData(datastore);
    }
  } catch (error) {
    // console.log(error);
  }
}

export async function initializeUserData(datastore: DataStore) {
  try {
    if (datastore.isLogged) {
      const atoms = await _getRefreshFeed();
      const saved = await _getSavedList();
      const knowbooks = await _getKnowbooksList();
      datastore.setFeed(atoms);
      datastore.setSaved(saved);
      datastore.setKnowbooks(knowbooks);
    }
  } catch (error) {
    // console.log(error);
  }
}
