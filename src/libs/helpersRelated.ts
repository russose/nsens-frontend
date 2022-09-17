import {
  AtomID,
  EXCLUSION_PATTERNS,
  IAtom,
  initStateCat,
  IRelatedAtom,
  IRelatedAtomFull,
  TUiBooleanStorage,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getItemsFromTitlesFromWebCleanImage_blocking } from "./apiItems";
import { api_getRelatedFromWebWithoutImage } from "./apiRelated";
import { empty_value_atom } from "./utils";

export function readRelatedStringFromItem(item: IAtom): IRelatedAtomFull[] {
  if (item !== undefined && item.related !== empty_value_atom) {
    const related: IRelatedAtomFull[] = JSON.parse(item.related);
    return related;
  } else {
    return [];
  }
}

export function initialyzeRelatedFromSaved(stores: IStores): void {
  stores.savedStore.savedItems.forEach((item: IAtom) => {
    if (item.related !== empty_value_atom) {
      const relatedFull: IRelatedAtomFull[] = readRelatedStringFromItem(item);
      stores.baseStore.setRelated(item.id, relatedFull);
    }
  });
}

export function getRelatedFull(
  stores: IStores,
  itemId: AtomID
): IRelatedAtomFull[] {
  if (itemId === undefined) {
    return [];
  }
  const relatedFull: IRelatedAtomFull[] = stores.baseStore.related
    .get(itemId)
    .map((related_element: IRelatedAtom) => {
      const related_element_full: IRelatedAtomFull = {
        relation: related_element.relation,
        item: stores.baseStore.getHistoryItem(related_element.item),
      };
      return related_element_full;
    });
  return relatedFull;
}

export function getRelatedItems(stores: IStores, itemId: AtomID): AtomID[] {
  if (itemId === undefined) {
    return [];
  }
  const relatedAtoms: IRelatedAtom[] = stores.baseStore.related.get(itemId);
  if (relatedAtoms === undefined) {
    return [];
  }
  const related_items: AtomID[] = relatedAtoms.map((atom) => {
    return atom.item;
  });

  //No duplicates since they are removed in fetchRelated
  return related_items;
}

export function setRelatedMap(root_itemId: AtomID, stores: IStores): void {
  const related: IRelatedAtom[] = stores.baseStore.related.get(root_itemId);
  if (
    root_itemId === undefined ||
    related === undefined ||
    related.length === 0
  ) {
    return;
  }

  const relatedMap_local = new Map<string, AtomID[]>();

  related.forEach((el) => {
    const key = el.relation;
    if (!relatedMap_local.has(key)) {
      relatedMap_local.set(key, [el.item]);
    } else {
      const item_list: AtomID[] = relatedMap_local.get(key);
      item_list.push(el.item);
      relatedMap_local.set(key, item_list);
    }
  });

  stores.graphStore.clearRelatedMap();
  //Sort Map by lengh
  const keys_values_sorted = Array.from(relatedMap_local.entries()).sort(
    (a, b) => {
      if (a[1].length > b[1].length) {
        //a est avant à b
        return -1;
      } else if (a[1].length < b[1].length) {
        //a est après à b
        return 1;
      } else {
        return 0;
      }
    }
  );

  keys_values_sorted.forEach((key_value) => {
    stores.graphStore.setRelatedMap(key_value[0], key_value[1]);
  });

  stores.graphStore.setRootItemId(root_itemId);
}

export async function fetchRelatedItems(
  root_itemId: AtomID,
  root_itemTitle: string,
  stores: IStores
): Promise<void> {
  const baseStore = stores.baseStore;
  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  stores.baseStore.setInitCompleted(initStateCat.itemRelated, false);

  let root_item: IAtom = stores.baseStore.getHistoryItem(root_itemId);

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, true);

  if (root_item === undefined) {
    const items = await api_getItemsFromTitlesFromWebCleanImage_blocking(
      root_itemTitle,
      lang,
      exclusion_patterns_items
    );
    stores.baseStore.setHistory(items);
    root_item = items[0];
  }

  if (!baseStore.related.has(root_item.id)) {
    const relatedList: IRelatedAtomFull[] =
      await api_getRelatedFromWebWithoutImage(
        root_item.id,
        root_item.title,
        lang,
        exclusion_patterns_items
      );

    //With no duplicates by construction
    stores.baseStore.setRelated(root_item.id, relatedList);

    setRelatedMap(root_item.id, stores);
  } else {
    setRelatedMap(root_itemId, stores);
  }

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, false);

  stores.uiStore.setUiBooleanStorage(
    TUiBooleanStorage.renderGraphNetwork,
    true
  );

  stores.baseStore.setInitCompleted(initStateCat.itemRelated, true);
}

// function shuffleSizedRemoveDoublesFilterIds(
//   items: AtomID[],
//   itemToRemoveIds: AtomID[],
//   amount_item_displayed: number
// ): AtomID[] {
//   if (items === undefined) {
//     return [];
//   }

//   const items_shuffledSized: AtomID[] = shuffleSized(
//     items,
//     amount_item_displayed
//   );

//   //Remove duplicated items since related from different items could overlap
//   const items_shuffledSized_no_doubles = new Set<AtomID>();
//   items_shuffledSized.forEach((item: AtomID) => {
//     items_shuffledSized_no_doubles.add(item);
//   });

//   const items_shuffledSized_no_doubles_array: AtomID[] = Array.from(
//     items_shuffledSized_no_doubles.values()
//   );

//   // Enlever les items de itemIds
//   const items_shuffledSized_no_doubles_array_filtered =
//     items_shuffledSized_no_doubles_array.filter((id: AtomID) => {
//       return !itemToRemoveIds.includes(id);
//     });

//   return items_shuffledSized_no_doubles_array_filtered;
// }

// export function getRelatedItemsForItemsShuffleSized(
//   stores: IStores,
//   itemIds: AtomID[],
//   amount_item_displayed: number
// ): IAtom[] {
//   if (itemIds === undefined) {
//     return [];
//   }

//   const related_list: AtomID[][] = itemIds.map((id) => {
//     return getRelatedItems(stores, id);
//   });

//   const related_flat: AtomID[] = makeArrayFlat(related_list);

//   const related_shuffledSized_no_doubles_array_filtered =
//     shuffleSizedRemoveDoublesFilterIds(
//       related_flat,
//       itemIds,
//       amount_item_displayed
//     );

//   const items: IAtom[] = stores.baseStore.getHistoryItems(
//     related_shuffledSized_no_doubles_array_filtered
//   );

//   const items_noSaved = removeSavedFromItems(stores, items);

//   return items_noSaved;
// }

// export function getRelatedItemsForItemsShuffleSized_Static(
//   stores: IStores,
//   items: IAtom[],
//   amount_item_displayed: number
// ): IAtom[] {
//   const related_list: AtomID[][] = items.map((item) => {
//     return readRelatedStringFromItem(item).map((related) => {
//       return related.item.id;
//     });
//   });
//   const related_flat: AtomID[] = makeArrayFlat(related_list);

//   const itemIds_to_exclude = items.map((item) => {
//     return item.id;
//   });

//   const related_shuffledSized_no_doubles_array_filtered =
//     shuffleSizedRemoveDoublesFilterIds(
//       related_flat,
//       itemIds_to_exclude,
//       amount_item_displayed
//     );

//   const items_: IAtom[] = stores.baseStore.getHistoryItems(
//     related_shuffledSized_no_doubles_array_filtered
//   );

//   const items_noSaved = removeSavedFromItems(stores, items_);

//   return items_noSaved;
// }
