import { AtomID, IAtom, IRelatedAtomFull } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { removeSavedFromItems } from "./helpersBase";
import { empty_value_atom, makeArrayFlat, shuffleSized } from "./utils";

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

function shuffleSizedRemoveDoublesFilterIds(
  items: AtomID[],
  itemToRemoveIds: AtomID[],
  amount_item_displayed: number
): AtomID[] {
  if (items === undefined) {
    return [];
  }

  const items_shuffledSized: AtomID[] = shuffleSized(
    items,
    amount_item_displayed
  );

  //Remove duplicated items since related from different items could overlap
  const items_shuffledSized_no_doubles = new Set<AtomID>();
  items_shuffledSized.forEach((item: AtomID) => {
    items_shuffledSized_no_doubles.add(item);
  });

  const items_shuffledSized_no_doubles_array: AtomID[] = Array.from(
    items_shuffledSized_no_doubles.values()
  );

  // Enlever les items de itemIds
  const items_shuffledSized_no_doubles_array_filtered =
    items_shuffledSized_no_doubles_array.filter((id: AtomID) => {
      return !itemToRemoveIds.includes(id);
    });

  return items_shuffledSized_no_doubles_array_filtered;
}

export function getRelatedItemsForItemsShuffleSized(
  stores: IStores,
  itemIds: AtomID[],
  amount_item_displayed: number
): IAtom[] {
  if (itemIds === undefined) {
    return [];
  }

  const related_list: AtomID[][] = itemIds.map((id) => {
    return stores.baseStore.getRelatedItems(id);
  });

  const related_flat: AtomID[] = makeArrayFlat(related_list);

  const related_shuffledSized_no_doubles_array_filtered =
    shuffleSizedRemoveDoublesFilterIds(
      related_flat,
      itemIds,
      amount_item_displayed
    );

  const items: IAtom[] = stores.baseStore.getHistoryItems(
    related_shuffledSized_no_doubles_array_filtered
  );

  const items_noSaved = removeSavedFromItems(stores, items);

  return items_noSaved;
}

export function getRelatedItemsForItemsShuffleSized_Static(
  stores: IStores,
  items: IAtom[],
  amount_item_displayed: number
): IAtom[] {
  const related_list: AtomID[][] = items.map((item) => {
    return readRelatedStringFromItem(item).map((related) => {
      return related.item.id;
    });
  });
  const related_flat: AtomID[] = makeArrayFlat(related_list);

  const itemIds_to_exclude = items.map((item) => {
    return item.id;
  });

  const related_shuffledSized_no_doubles_array_filtered =
    shuffleSizedRemoveDoublesFilterIds(
      related_flat,
      itemIds_to_exclude,
      amount_item_displayed
    );

  const items_: IAtom[] = stores.baseStore.getHistoryItems(
    related_shuffledSized_no_doubles_array_filtered
  );

  const items_noSaved = removeSavedFromItems(stores, items_);

  return items_noSaved;
}
