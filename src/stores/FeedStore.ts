import { action, makeObservable, observable } from "mobx";
import { GUI_CONFIG } from "../common/config";
import {
  AtomID,
  empty_value_atom,
  IAtom,
  IRelatedAtom,
  LogActionType,
} from "../common/types";
import {
  makeArrayFlat,
  removeDuplicatesItems,
  shuffleArray,
} from "../libs/utils";
import {
  _getRelatedFromWikidataFromWeb,
  _getRelatedFromWikipediaFromWeb,
  _log,
  _randomFromWeb,
  _searchFromWeb,
} from "../_api";
import { SavedStore } from "./SavedStore";

const amount_item_displayed = GUI_CONFIG.display.amount_item_displayed;

function shuffleSized(array: any[]): any[] {
  const shuffled = shuffleArray(array);
  const shuffled_sized = shuffled.slice(0, amount_item_displayed);
  return shuffled_sized;
}

export class FeedStore {
  private $feed = observable.map<AtomID, IAtom>();
  private $history = observable.map<AtomID, IAtom>();
  private $related = observable.map<AtomID, IRelatedAtom[]>();

  constructor() {
    makeObservable<FeedStore>(this, {
      setFeed: action,
      setHistory: action,
      setFeedFromRandom: action,
      setFeedFromSearch: action,
      setFeedFromRelated: action,
      initialyzeRelatedFromSaved: action,
      fetchRelated: action,
    });
  }

  getItemFromAnywhere(itemId: AtomID): IAtom | undefined {
    if (itemId === undefined) {
      return undefined;
    }

    let item: IAtom;
    if (this.history.has(itemId)) {
      item = this.history.get(itemId);
    } else {
      item = this.getItemFromAnyRelated(itemId);
    }

    return item;
  }

  /*
  Feed and History
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
    this.setHistory(feed);
  }

  get history() {
    return this.$history;
  }
  setHistory(atoms: IAtom[]): void {
    if (atoms === undefined) {
      return;
    }
    atoms.forEach((item) => {
      if (!this.$history.has(item.id)) {
        this.$history.set(item.id, item);
      }
    });
  }

  setFeedFromRandom(): void {
    _randomFromWeb()
      .then((atoms) => {
        this.setFeed(atoms);
      })
      .catch((error) => {});
  }
  setFeedFromSearch(searchPattern: string): void {
    if (searchPattern === undefined) {
      return;
    }

    _searchFromWeb(searchPattern)
      .then((atoms) => {
        this.setFeed(atoms);
      })
      .then(() => {
        // if (userStore.isLogged) {
        _log(LogActionType.search, searchPattern);
        // }
      })
      .catch((error) => {
        // console.log("error in seach from pattern");
      });
  }
  setFeedFromRelated(): void {
    const related: IAtom[] = this.getAllRelatedItems();

    if (related.length === 0) {
      this.setFeedFromRandom();
    } else {
      // const related_shuffled = shuffleArray(related);
      // this.setFeed(related_shuffled.slice(0, amount_item_displayed));
      this.setFeed(shuffleSized(related));
    }
  }

  /*
  Related
  */

  initialyzeRelatedFromSaved(savedStore: SavedStore): void {
    savedStore.getSavedList().forEach((item: IAtom) => {
      if (item.related !== empty_value_atom) {
        const related: IRelatedAtom[] = JSON.parse(item.related);
        this.$related.set(item.id, related);
      }
    });
  }

  getRelated(itemId: AtomID): IRelatedAtom[] {
    if (itemId === undefined) {
      return [];
    }
    return this.$related.get(itemId);
  }

  getRelatedItems(itemId: AtomID): IAtom[] {
    if (itemId === undefined) {
      return [];
    }
    const related: IRelatedAtom[] = this.$related.get(itemId);
    const related_items: IAtom[] = related.map((item) => {
      return item.item;
    });
    return removeDuplicatesItems(related_items);
  }

  getRelatedItemsForItems(itemIds: AtomID[]): IAtom[] {
    if (itemIds === undefined) {
      return [];
    }

    const related_list: IAtom[][] = itemIds.map((id) => {
      return this.getRelatedItems(id);
    });

    let related_flat: IAtom[] = makeArrayFlat(related_list);
    related_flat = removeDuplicatesItems(related_flat);

    const result: IAtom[] = shuffleSized(related_flat);

    return result;
  }

  getAllRelatedItems(): IAtom[] {
    let all: IAtom[] = [];
    Array.from(this.$related.keys()).forEach((itemId: AtomID) => {
      const related_items: IAtom[] = this.getRelatedItems(itemId);
      all = all.concat(related_items);
    });

    return removeDuplicatesItems(all);
  }

  async fetchRelated(itemId: AtomID, title: string): Promise<void> {
    if (
      itemId === undefined ||
      title === undefined ||
      this.$related.has(itemId)
    ) {
      return;
    }

    const relatedItems_wikipedia: IRelatedAtom[] = await _getRelatedFromWikipediaFromWeb(
      // itemId,
      title
    );
    const relatedItems_wikidata: IRelatedAtom[] = await _getRelatedFromWikidataFromWeb(
      itemId
    );

    const relatedItems = relatedItems_wikidata.concat(relatedItems_wikipedia);

    // Filter remove some of them (eg containing category)
    // let relatedItems_filtered: IRelatedAtom[] = relatedItems.filter((item) => {
    //   const exclusion_condition: boolean = item.item.title_en.includes(
    //     "Category:"
    //   );
    //   return !exclusion_condition;
    // });

    this.$related.set(itemId, relatedItems);
  }

  getItemFromAnyRelated(itemId: AtomID): IAtom | undefined {
    if (itemId === undefined) {
      return undefined;
    }

    const items: IAtom[] = this.getAllRelatedItems().filter((item) => {
      return item.id === itemId;
    });

    if (items.length === 0) {
      return undefined;
    } else {
      return items[0];
    }
  }
}
