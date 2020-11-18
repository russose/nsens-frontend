import { UserStore } from "./UserStore";
import { observable, action, makeObservable } from "mobx";
import { IAtom, AtomID, LogActionType } from "../common/types";
import { _getRelated, _log, _randomFromWeb, _searchFromWeb } from "../_api";

export class FeedStore {
  private $feed = observable.map<AtomID, IAtom>();

  constructor() {
    makeObservable<FeedStore>(this, {
      setFeed: action,
      setFeedFromRandom: action,
      setFeedFromSearch: action,
    });
  }

  /**
   * Feed
   */
  get feed() {
    return this.$feed;
  }
  getFeedList(): IAtom[] {
    return Array.from(this.feed.values());
  }
  setFeed(feed: IAtom[]): void {
    if (feed === undefined) {
      return;
    }
    this.$feed.clear();
    feed.forEach((item) => this.$feed.set(item.id, item));
  }

  setFeedFromRandom(): void {
    _randomFromWeb()
      .then((atoms) => {
        this.setFeed(atoms);
      })
      .catch((error) => {
        // console.log("error in find random");
        // console.log(error);
      });
  }
  setFeedFromRelated(): void {
    _getRelated("all")
      .then((atoms) => {
        if (atoms.length === 0) {
          this.setFeedFromRandom();
        } else {
          this.setFeed(atoms);
        }
      })
      .catch((error) => {
        // console.log("error in find random");
        // console.log(error);
      });
  }
  setFeedFromSearch(searchPattern: string, userStore: UserStore): void {
    if (searchPattern === undefined) {
      return;
    }

    _searchFromWeb(searchPattern)
      .then((atoms) => {
        this.setFeed(atoms);
      })
      .then(() => {
        if (userStore.isLogged) {
          _log(LogActionType.search, searchPattern);
        }
      })
      .catch((error) => {
        // console.log("error in seach from pattern");
      });
  }
}
