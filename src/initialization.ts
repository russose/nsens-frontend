import { FeedStore } from "./stores/FeedStore";
import { KnowkookStore } from "./stores/KnowkookStore";
import { UserStore } from "./stores/UserStore";
import { SavedStore } from "./stores/SavedStore";
import { _api } from "./libs/fetch";
import { _getUser, _getSavedList, _getKnowbooksList } from "./_api";

export async function initializeApp(
  savedStore: SavedStore,
  userStore: UserStore,
  knowbookStore: KnowkookStore,
  feedStore: FeedStore
) {
  try {
    const user = await _getUser();
    userStore.setUser({ username: user });

    if (!userStore.isLogged) {
      feedStore.setFeedFromRandom();
      // savedStore.setSaved([]);
      // knowbookStore.setKnowbooks([]);
    } else {
      await initializeUserData(savedStore, userStore, knowbookStore, feedStore);
    }
  } catch (error) {
    // console.log(error);
  }
}

export async function initializeUserData(
  savedStore: SavedStore,
  userStore: UserStore,
  knowbookStore: KnowkookStore,
  feedStore: FeedStore
) {
  try {
    if (userStore.isLogged) {
      const saved = await _getSavedList();
      savedStore.setSaved(saved);
      feedStore.initialyzeRelatedFromSaved(savedStore);
      feedStore.setFeedFromRelated();
      const knowbooks = await _getKnowbooksList();
      knowbookStore.setKnowbooks(knowbooks);
    }
  } catch (error) {
    // console.log(error);
  }
}
