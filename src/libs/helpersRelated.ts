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
import { api_getRelatedFromWeb_blocking } from "./apiRelated";

export function initialyzeRelatedFromSaved(stores: IStores): void {
  stores.savedStore.savedItems.forEach((item: IAtom) => {
    if (item.related !== empty_value_atom) {
      // const related: IRelatedAtom[] = JSON.parse(item.related);
      const related: IRelatedAtom[] = readRelatedFromItem(item);
      stores.baseStore.setRelated(item.id, related);
    }
  });
}

export function readRelatedFromItem(item: IAtom): IRelatedAtom[] {
  if (item !== undefined && item.related !== empty_value_atom) {
    const related: IRelatedAtom[] = JSON.parse(item.related);
    return related;
  } else {
    return [];
  }
}

export function getRelatedItemsForItemsShuffleSized(
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

  const relatedItems_no_generic_item = await api_getRelatedFromWeb_blocking(
    itemId,
    title,
    lang,
    exclusion_patterns_items
  );

  //With no duplicates by construction
  stores.baseStore.setRelated(itemId, relatedItems_no_generic_item);
}
