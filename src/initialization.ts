import { DataStore } from "./stores/DataStore";
import { _api } from "./common/fetch";
import { _getUser, _getSavedList, _getKnowbooksList } from "./_api";

export async function initializeApp(datastore: DataStore) {
  try {
    const user = await _getUser();
    datastore.setUser({ username: user });

    if (!datastore.isLogged) {
      datastore.setFeedFromRandom();
      datastore.setSaved([]);
      datastore.setKnowbooks([]);
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
      // const atoms = await _getAllFeed();
      // datastore.setFeed(atoms);
      datastore.setFeedFromRelated();
      const saved = await _getSavedList();
      datastore.setSaved(saved);
      const knowbooks = await _getKnowbooksList();
      datastore.setKnowbooks(knowbooks);
    }
  } catch (error) {
    // console.log(error);
  }
}
