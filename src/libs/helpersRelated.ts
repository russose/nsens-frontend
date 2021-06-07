import {
  AtomID,
  EXCLUSION_PATTERNS,
  IAtom,
  IRelatedAtom,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import {
  empty_value_atom,
  makeArrayFlat,
  shuffleSizedRemoveDoublesFilterIds,
} from "./utils";
import { api_getRelatedFromWeb } from "./apiRelated";

export function initialyzeRelatedAndRelatedAllFromSaved(stores: IStores): void {
  stores.savedStore.getSavedList().forEach((item: IAtom) => {
    if (item.related !== empty_value_atom) {
      const related: IRelatedAtom[] = JSON.parse(item.related);
      //related
      // stores.baseStore.related.set(item.id, related);
      stores.baseStore.setRelated(item.id, related);
      //relatedAll
      addAllRelatedItemsInAllRelated(stores, item.id);
    }
  });
}

export function addAllRelatedItemsInAllRelated(
  stores: IStores,
  itemId: AtomID
): void {
  if (itemId === undefined) {
    return;
  }
  stores.baseStore.getRelatedItems(itemId).forEach((related_item: IAtom) => {
    // stores.baseStore.relatedAll.set(related_item.id, related_item);
    stores.baseStore.setRelatedAll(related_item.id, related_item);
  });
}

export function readRelatedFromItem(item: IAtom): IRelatedAtom[] {
  // if (item === undefined) {
  //   return [];
  // }
  if (item !== undefined && item.related !== empty_value_atom) {
    const related: IRelatedAtom[] = JSON.parse(item.related);
    return related;
  } else {
    return [];
  }
}

export function getRelatedItemsForItems(
  stores: IStores,
  itemIds: AtomID[],
  amount_item_displayed: number
): IAtom[] {
  if (itemIds === undefined) {
    return [];
  }

  const related_list: IAtom[][] = itemIds.map((id) => {
    return stores.baseStore.getRelatedItems(id);
  });

  const related_flat: IAtom[] = makeArrayFlat(related_list);

  const related_shuffledSized_no_doubles_array_filtered =
    shuffleSizedRemoveDoublesFilterIds(
      related_flat,
      itemIds,
      amount_item_displayed
    );
  return related_shuffledSized_no_doubles_array_filtered;

  // const related_shuffledSized: IAtom[] = shuffleSized(
  //   related_flat,
  //   amount_item_displayed
  // );

  // //Remove duplicated items since related from different items could overlap
  // const related_shuffledSized_no_doubles = new Map();
  // related_shuffledSized.forEach((item: IAtom) => {
  //   related_shuffledSized_no_doubles.set(item.id, item);
  // });

  // const related_shuffledSized_no_doubles_array: IAtom[] = Array.from(
  //   related_shuffledSized_no_doubles.values()
  // );

  // // Enlever les items de itemIds
  // const related_shuffledSized_no_doubles_array_filtered =
  //   related_shuffledSized_no_doubles_array.filter((item: IAtom) => {
  //     return !itemIds.includes(item.id);
  //   });

  // return related_shuffledSized_no_doubles_array_filtered;
}

export async function fetchRelatedAndUpdateStores(
  stores: IStores,
  itemId: AtomID,
  title: string
): Promise<void> {
  if (
    stores.baseStore.related.has(itemId) &&
    stores.baseStore.related.get(itemId) !== undefined
  ) {
    return;
  }

  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  const relatedItems_no_generic_item = await api_getRelatedFromWeb(
    itemId,
    title,
    lang,
    exclusion_patterns_items
  );

  //With no duplicates by construction
  // this.$related.set(itemId, relatedItems_no_doubles_array);
  // stores.baseStore.related.set(itemId, relatedItems_no_generic_item);
  stores.baseStore.setRelated(itemId, relatedItems_no_generic_item);
  addAllRelatedItemsInAllRelated(stores, itemId);
}

// export async function fetchRelatedAndUpdateStores(
//   stores: IStores,
//   itemId: AtomID,
//   title: string
// ): Promise<void> {
//   if (
//     itemId === undefined ||
//     title === undefined ||
//     (stores.baseStore.related.has(itemId) &&
//       stores.baseStore.related.get(itemId) !== undefined)
//   ) {
//     return;
//   }

//   const relatedItems_wikipedia: IRelatedAtom[] =
//     await api_getRelatedFromWikipediaFromWeb(
//       title,
//       stores.baseStore.paramsPage.lang
//     );
//   const relatedItems_wikidata: IRelatedAtom[] =
//     await api_getRelatedFromWikidataFromWeb(
//       itemId,
//       stores.baseStore.paramsPage.lang
//     );

//   const relatedItems = relatedItems_wikidata.concat(relatedItems_wikipedia);

//   //Remove duplicated items
//   const relatedItems_no_doubles = new Map();
//   relatedItems.forEach((related) => {
//     relatedItems_no_doubles.set(related.item.id, related);
//   });

//   const relatedItems_no_doubles_array: IRelatedAtom[] = Array.from(
//     relatedItems_no_doubles.values()
//   );

//   // Remove items containing ":" for Portal or other generic item (main filtered in wikidata fetching)
//   const relatedItems_no_generic_item: IRelatedAtom[] =
//     relatedItems_no_doubles_array.filter((relatedItem) => {
//       const exclusion_condition: boolean = relatedItem.item.title.includes(":");
//       return !exclusion_condition;
//     });

//   //With no duplicates by construction
//   // this.$related.set(itemId, relatedItems_no_doubles_array);
//   // stores.baseStore.related.set(itemId, relatedItems_no_generic_item);
//   stores.baseStore.setRelated(itemId, relatedItems_no_generic_item);
//   addAllRelatedItemsInAllRelated(stores, itemId);
// }

export function getItemFromAnyRelated(
  stores: IStores,
  itemId: AtomID
): IAtom | undefined {
  if (itemId === undefined) {
    return undefined;
  }

  // const items: IAtom[] = stores.baseStore
  //   .getAllRelatedItems()
  //   .filter((item) => {
  //     return item.id === itemId;
  //   });

  // if (items.length === 0) {
  //   return undefined;
  // } else {
  //   return items[0];
  // }

  if (stores.baseStore.relatedAll.has(itemId)) {
    return stores.baseStore.relatedAll.get(itemId);
  } else {
    return undefined;
  }
}
