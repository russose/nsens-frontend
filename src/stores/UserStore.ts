import { observable, action, computed, makeObservable } from "mobx";
import { IUser } from "../common/types";

export class UserStore {
  private $user: IUser | null = null; //when username="", it means the user is not logged!

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
}
