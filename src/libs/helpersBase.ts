import { AtomID, IAtom } from "../config/globals";
import { IStores } from "../stores/_RootStore";
import { shuffleSized } from "./utils";
import { _randomFromWeb, _searchFromWeb } from "./_apiItems";
import {
  _getRelatedFromWikipediaFromWeb,
  _getRelatedFromWikidataFromWeb,
} from "./_apiRelated";
import { getItemFromAnyRelated } from "./helpersRelated";

export function getItemFromAnywhere(
  itemId: AtomID,
  stores: IStores
): IAtom | undefined {
  if (itemId === undefined) {
    return undefined;
  }

  let item: IAtom;
  if (stores.savedStore.saved.get(itemId) !== undefined) {
    item = stores.savedStore.saved.get(itemId);
  } else if (stores.baseStore.history.has(itemId)) {
    item = stores.baseStore.history.get(itemId);
  } else {
    item = getItemFromAnyRelated(stores, itemId);
  }

  return item;
}

export function getRandomItemIdFromAnywhere(stores: IStores): AtomID {
  const history_ids = Array.from(stores.baseStore.history.keys());
  const relatedAll_ids = Array.from(stores.baseStore.relatedAll.keys());
  const saved_ids = Array.from(stores.savedStore.saved.keys());
  const all_ids: AtomID[] = history_ids
    .concat(relatedAll_ids)
    .concat(saved_ids);

  return shuffleSized(all_ids, 1)[0];
}

export function setFeedFromRandom(stores: IStores): void {
  _randomFromWeb(stores.baseStore.paramsPage.lang)
    .then((atoms) => {
      stores.baseStore.setFeed(atoms);
    })
    .catch((error) => {});
}

export function setFeedFromSearch(
  stores: IStores,
  searchPattern: string
): void {
  if (searchPattern === undefined) {
    return;
  }

  _searchFromWeb(searchPattern, stores.baseStore.paramsPage.lang)
    .then((atoms) => {
      stores.baseStore.setFeed(atoms);
    })
    // .then(() => {
    //   //LOG SEARCHED ITEM, DISABLED
    //   _log(LogActionType.search, searchPattern);
    // })
    .catch((error) => {
      // console.log("error in seach from pattern");
    });
}

export function setFeedFromRelated(
  stores: IStores,
  amount_item_displayed: number
): void {
  const related: IAtom[] = stores.baseStore.getAllRelatedItems();

  if (related.length === 0) {
    setFeedFromRandom(stores);
  } else {
    stores.baseStore.setFeed(shuffleSized(related, amount_item_displayed));
  }
}
