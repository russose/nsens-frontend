import { action, makeObservable, observable } from "mobx";
import { AtomID, empty_value_atom, IAtom, IRelatedAtom } from "../common/types";
import { makeArrayFlat, shuffleArray } from "../libs/utils";
import {
  _getRelatedFromWikidataFromWeb,
  _getRelatedFromWikipediaFromWeb,
  _log,
  _randomFromWeb,
  _searchFromWeb,
} from "../_api";
import { SavedStore } from "./SavedStore";
import { IStores } from "./_RootStore";

function shuffleSized(array: any[], amount_item_displayed: number): any[] {
  const shuffled = shuffleArray(array);
  const shuffled_sized = shuffled.slice(0, amount_item_displayed);
  return shuffled_sized;
}

export class FeedStore {
  private $feed = observable.map<AtomID, IAtom>();
  private $history = observable.map<AtomID, IAtom>();

  private $related = observable.map<AtomID, IRelatedAtom[]>();
  private $relatedAll = observable.map<AtomID, IAtom>();

  constructor() {
    makeObservable<FeedStore>(this, {
      setFeed: action,
      setHistory: action,
      setFeedFromRandom: action,
      setFeedFromSearch: action,
      setFeedFromRelated: action,
      initialyzeRelatedAndRelatedAllFromSaved: action,
      addAllRelatedItemsInAllRelated: action,
      fetchRelated: action,
    });
  }

  getItemFromAnywhere(itemId: AtomID, stores: IStores): IAtom | undefined {
    if (itemId === undefined) {
      return undefined;
    }

    let item: IAtom;
    if (stores.savedStore.saved.get(itemId) !== undefined) {
      item = stores.savedStore.saved.get(itemId);
    } else if (this.history.has(itemId)) {
      item = this.history.get(itemId);
    } else {
      item = this.getItemFromAnyRelated(itemId);
    }

    return item;
  }

  getRandomItemIdFromAnywhere(stores: IStores): AtomID {
    const history_ids = Array.from(this.$history.keys());
    const relatedAll_ids = Array.from(this.$relatedAll.keys());
    const saved_ids = Array.from(stores.savedStore.saved.keys());
    const all_ids: AtomID[] = history_ids
      .concat(relatedAll_ids)
      .concat(saved_ids);

    return shuffleSized(all_ids, 1)[0];
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
      // .then(() => {
      //   //LOG SEARCHED ITEM, DISABLED
      //   _log(LogActionType.search, searchPattern);
      // })
      .catch((error) => {
        // console.log("error in seach from pattern");
      });
  }
  setFeedFromRelated(amount_item_displayed: number): void {
    const related: IAtom[] = this.getAllRelatedItems();

    if (related.length === 0) {
      this.setFeedFromRandom();
    } else {
      this.setFeed(shuffleSized(related, amount_item_displayed));
    }
  }

  /*
  Related
  */

  initialyzeRelatedAndRelatedAllFromSaved(savedStore: SavedStore): void {
    savedStore.getSavedList().forEach((item: IAtom) => {
      if (item.related !== empty_value_atom) {
        const related: IRelatedAtom[] = JSON.parse(item.related);
        //related
        this.$related.set(item.id, related);
        //relatedAll
        this.addAllRelatedItemsInAllRelated(item.id);
      }
    });
  }

  addAllRelatedItemsInAllRelated(itemId: AtomID): void {
    if (itemId === undefined) {
      return;
    }
    this.getRelatedItems(itemId).forEach((related_item: IAtom) => {
      this.$relatedAll.set(related_item.id, related_item);
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
    if (related === undefined) {
      return [];
    }
    const related_items: IAtom[] = related.map((item) => {
      return item.item;
    });
    //No duplicates since they are removed in fetchRelated
    return related_items;
  }

  getRelatedItemsForItems(
    itemIds: AtomID[],
    amount_item_displayed: number
  ): IAtom[] {
    if (itemIds === undefined) {
      return [];
    }

    const related_list: IAtom[][] = itemIds.map((id) => {
      return this.getRelatedItems(id);
    });

    const related_flat: IAtom[] = makeArrayFlat(related_list);

    const related_shuffledSized: IAtom[] = shuffleSized(
      related_flat,
      amount_item_displayed
    );

    //Remove duplicated items since related from different items could overlap
    const related_shuffledSized_no_doubles = new Map();
    related_shuffledSized.forEach((item: IAtom) => {
      related_shuffledSized_no_doubles.set(item.id, item);
    });

    const related_shuffledSized_no_doubles_array: IAtom[] = Array.from(
      related_shuffledSized_no_doubles.values()
    );

    return related_shuffledSized_no_doubles_array;
  }

  getAllRelatedItems(): IAtom[] {
    return Array.from(this.$relatedAll.values());
  }

  async fetchRelated(itemId: AtomID, title: string): Promise<void> {
    if (
      itemId === undefined ||
      title === undefined ||
      (this.$related.has(itemId) && this.$related.get(itemId) !== undefined)
    ) {
      return;
    }

    const relatedItems_wikipedia: IRelatedAtom[] = await _getRelatedFromWikipediaFromWeb(
      title
    );
    const relatedItems_wikidata: IRelatedAtom[] = await _getRelatedFromWikidataFromWeb(
      itemId
    );

    const relatedItems = relatedItems_wikidata.concat(relatedItems_wikipedia);

    //Remove duplicated items
    const relatedItems_no_doubles = new Map();
    relatedItems.forEach((related) => {
      relatedItems_no_doubles.set(related.item.id, related);
    });

    const relatedItems_no_doubles_array: IRelatedAtom[] = Array.from(
      relatedItems_no_doubles.values()
    );

    // Remove items containing ":" for Portal or other generic item (main filtered in wikidata fetching)
    const relatedItems_no_generic_item: IRelatedAtom[] = relatedItems_no_doubles_array.filter(
      (relatedItem) => {
        const exclusion_condition: boolean = relatedItem.item.title.includes(
          ":"
        );
        return !exclusion_condition;
      }
    );

    //With no duplicates by construction
    // this.$related.set(itemId, relatedItems_no_doubles_array);
    this.$related.set(itemId, relatedItems_no_generic_item);
    this.addAllRelatedItemsInAllRelated(itemId);
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
