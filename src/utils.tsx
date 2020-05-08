import { IAtom, empty_value_atom } from "./types";
import { CONFIG_FETCHING } from "./config";

export function prepare_url(root_url: string, params: Object): string {
  let query: string = "";
  Object.entries(params).forEach(([key, value]) => {
    query += "&" + key + "=" + value;
  });
  return root_url + "?origin=*" + encodeURI(query);
}

export function removeBadImages(list_information_atoms: IAtom[]): IAtom[] {
  const list_information_atoms_updated: IAtom[] = [];
  list_information_atoms.forEach((item) => {
    const item_updated = item;
    if (
      item.image_url === empty_value_atom ||
      item.image_width > 2 * CONFIG_FETCHING.max_width_image ||
      !["jpg", "JPG", "png", "PNG", "tif", "TIF", "svg", "SVG"].includes(
        item.image_url.slice(-3)
      )
    ) {
      item_updated.image_url = CONFIG_FETCHING.path_empty_image;
      //console.log(item.title);
    }
    list_information_atoms_updated.push(item_updated);
  });
  return list_information_atoms_updated;
}

export function findUndefined(list: Object[]) {
  list.forEach((item) => {
    Object.values(item).forEach((value) => {
      if (value === undefined) {
        console.log(item);
      }
    });
  });
}

//My initial findbyID function
// export function findById(array: IAtom[], ids: number[]): IAtom[] {
//   return ids
//     .map((id) => array.find((el) => el.pageid_wp === id))
//     .filter(isDefined);
// }

/**
 * Returns a type predicate to filter undefined values of a list.
 *
 * Usage:
 * myList.filter(isDefined)
 */
export function isDefined<T>(o: Perhaps<T>): o is T {
  return o !== undefined && o !== null;
}

// return T | null | undefined
export type Perhaps<T> = T | null | undefined;
