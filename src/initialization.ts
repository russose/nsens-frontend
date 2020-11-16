import { KnowkookStore } from "./stores/KnowkookStore";
import { UserStore } from "./stores/UserStore";
import { DataStore } from "./stores/DataStore";
import { _api } from "./common/fetch";
import { _getUser, _getSavedList, _getKnowbooksList } from "./_api";

export async function initializeApp(
  datastore: DataStore,
  userStore: UserStore,
  knowbookStore: KnowkookStore
) {
  try {
    const user = await _getUser();
    userStore.setUser({ username: user });

    if (!userStore.isLogged) {
      datastore.setFeedFromRandom();
      datastore.setSaved([]);
      knowbookStore.setKnowbooks([]);
    } else {
      await initializeUserData(datastore, userStore, knowbookStore);
    }
  } catch (error) {
    // console.log(error);
  }
}

export async function initializeUserData(
  datastore: DataStore,
  userStore: UserStore,
  knowbookStore: KnowkookStore
) {
  try {
    if (userStore.isLogged) {
      // const atoms = await _getAllFeed();
      // datastore.setFeed(atoms);
      datastore.setFeedFromRelated();
      const saved = await _getSavedList();
      datastore.setSaved(saved);
      const knowbooks = await _getKnowbooksList();
      knowbookStore.setKnowbooks(knowbooks);
    }
  } catch (error) {
    // console.log(error);
  }
}
