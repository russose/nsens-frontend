import { observable, action, computed, makeObservable } from "mobx";
import { IUser } from "../common/types";
import { _getKnowbooksList, _getSavedList, _getUser } from "../_api";
import { IStores } from "./_RootStore";

export class UserStore {
  private $user: IUser | null = null; //when username="", it means the user is not logged! When username=null, it means the App is not initialyzed

  constructor() {
    makeObservable<UserStore, "$user">(this, {
      $user: observable,
      isLogged: computed,
      setUser: action,
    });
  }

  get isLogged(): boolean {
    if (this.user === undefined || this.user === null) {
      return false;
    }
    if (this.user.username === "") {
      return false;
    } else {
      return true;
    }
  }

  get user() {
    return this.$user;
  }

  setUser(user: IUser): void {
    this.$user = user;
  }

  async initializeApp(stores: IStores) {
    try {
      const user = await _getUser();
      stores.userStore.setUser({ username: user });

      // if (!userStore.isLogged) {
      //   feedStore.setFeedFromRandom();
      //   // savedStore.setSaved([]);
      //   // knowbookStore.setKnowbooks([]);
      // } else {
      //   await initializeUserData(savedStore, userStore, knowbookStore, feedStore);
      // }
      await this.initializeUserData(stores);
    } catch (error) {
      // console.log(error);
    }
  }

  async initializeUserData(stores: IStores) {
    try {
      if (stores.userStore.isLogged) {
        const saved = await _getSavedList();
        stores.savedStore.setSaved(saved);
        stores.feedStore.initialyzeRelatedFromSaved(stores.savedStore);
        stores.feedStore.setFeedFromRelated();
        const knowbooks = await _getKnowbooksList();
        stores.knowbookStore.setKnowbooks(knowbooks);
      }
    } catch (error) {
      // console.log(error);
    }
  }
}
