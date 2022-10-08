import { AtomID, Tlanguage, IAtom, configPaths } from "../config/globals";
import { IStores } from "../stores/RootStore";

export function range(amount_element: number): number[] {
  //=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  return Array.from(Array(amount_element).keys());
}

// export const empty_handler = () => {};

export function DateToStringWithZero(date: number): string {
  if (date < 10) {
    return "0" + date.toString();
  } else {
    return date.toString();
  }
}

export function shortenString(input: string, max_size: number): string {
  // const output_raw = input.substring(0, max_size) + "...";
  const words: string[] = input.split(" ");
  let i = 0;
  let output_raw = "";
  while (output_raw.length <= max_size && i < words.length) {
    output_raw = output_raw + " " + words[i];
    i = i + 1;
  }
  const output = output_raw;
  return output + " ...";
}

export function prepareArticle(article: string): string {
  if (article === undefined || article === null) {
    return "issue with this article";
  }
  const href_with_including_a_regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi;
  const link_open_regex = /<\s*a[^>]*>/gi;
  const link_close_regex = /<\s*\/a[^>]*>/gi;

  // const sections_ending_including_body = new RegExp(
  //   "<section(.)*" + last_section_header + "(.|\n)*</body>",
  //   "gi"
  // );

  // const base_url = "//" + language + ".wikipedia.org/";

  const article_clean = article
    .replace(href_with_including_a_regex, "<a") //Remove complex href, cf article "tenseur de Ricci"
    .replace(link_open_regex, "") //remove links
    .replace(link_close_regex, "");
  // .replaceAll('"//', '"https://');
  // .replaceAll(base, "") //remove base to not destroy navigation...
  // .replaceAll('href="/', 'href="' + base_url) //add path to relative link of stylesheet
  // .replaceAll(sections_ending_including_body, "</body>") //remove end of article

  return article_clean;
}
export const empty_value_atom = "";
export function newAtom(
  id: AtomID,
  lang: Tlanguage,
  itemToCopy: IAtom = undefined
): IAtom {
  if (itemToCopy === undefined && (id === undefined || lang === undefined)) {
    return undefined;
  }

  if (itemToCopy === undefined) {
    const atom = {
      id: id,
      wikibase_item: empty_value_atom,
      pageid_wp: -1,
      title: empty_value_atom,
      title_en: empty_value_atom,
      language: lang,
      image_url: empty_value_atom,
      image_width: -1,
      image_height: -1,
      thumbnail_url: empty_value_atom,
      related: empty_value_atom,
    };
    return atom;
  } else {
    const item_copy: IAtom = {
      id: itemToCopy.id,
      wikibase_item: itemToCopy.wikibase_item,
      pageid_wp: itemToCopy.pageid_wp,
      title: itemToCopy.title,
      title_en: itemToCopy.title_en,
      language: itemToCopy.language,
      image_url: itemToCopy.image_url,
      image_width: itemToCopy.image_width,
      image_height: itemToCopy.image_height,
      thumbnail_url: itemToCopy.thumbnail_url,
      related: itemToCopy.related,
    };
    return item_copy;
  }
}

export function getRandomImageFromItems(items: IAtom[]): string {
  let image_paths_list: string[] = items.map((item) => {
    return item.image_url;
  });
  image_paths_list = image_paths_list.filter((item) => {
    return item !== "";
  });
  if (image_paths_list.length === 0) {
    return "";
  } else {
    const image_path =
      image_paths_list[entierAleatoire(0, image_paths_list.length - 1)];
    return image_path;
  }
}

export function path_link_main_item_page(id: AtomID, stores: IStores): string {
  if (
    stores.baseStore.screen === undefined ||
    stores.baseStore.screen.height === undefined
  ) {
    return configPaths.pages.ItemNetwork;
  }

  if (stores.baseStore.screen.width <= 375) {
    return configPaths.pages.ItemFlat;
  } else {
    return configPaths.pages.ItemNetwork;
  }
}

export function hasTouchScreen(window: any): boolean {
  //https://developer.mozilla.org/fr/docs/Web/API/Navigator
  let hasTouchScreen = false;
  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = window.navigator.msMaxTouchPoints > 0;
  } else {
    let mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      let UA = window.navigator.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }
  return hasTouchScreen;
}

export function isFirefox(): boolean {
  let result = false;
  if (typeof window !== "undefined") {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    result = isFirefox;
  }
  return result;
}

export function isInstalled(): boolean {
  let result = false;
  if (typeof window !== "undefined") {
    const navigator: any = window.navigator;
    // For iOS
    if (
      navigator !== undefined &&
      navigator.standalone !== undefined &&
      navigator.standalone
    ) {
      result = true;
    }
    // For Android
    if (window.matchMedia("(display-mode: standalone)").matches) {
      result = true;
    }
  }
  return result;
}

export function shuffleArray_modified(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function shuffleArray(array: any[]): any[] {
  const indexes: number[] = shuffleArray_modified(range(array.length));
  const result: any[] = [];
  for (const ind of indexes) {
    result.push(array[ind]);
  }

  return result;
}

export function shuffleSized(
  array: any[],
  amount_item_displayed: number
): any[] {
  const shuffled = shuffleArray(array);
  const shuffled_sized = shuffled.slice(0, amount_item_displayed);
  return shuffled_sized;
}

export function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export function sleep_(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// export function findUndefined(list: Object[]) {
//   list.forEach((item) => {
//     Object.values(item).forEach((value) => {
//       if (value === undefined) {
//         // console.log(item);
//       }
//     });
//   });
// }

// //nombre aléatoire entre min (inclus) et max (exclue)
// export function getRandomArbitrary(min: number, max: number): number {
//   return Math.random() * (max - min) + min;
// }

export function entierAleatoire(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function estPair(n: number): boolean {
  return n & 1 ? false : true;
}

export function reorder(elements: any[]): any[] {
  const l = elements.length;
  const idx = range(l);
  // console.log(l, idx);
  const elements_reordered = idx.map((id) => {
    return elements[l - id];
  });
  return elements_reordered;
}

// export function removeDuplicates(array: string[]): any[] {
//   return Array.from(new Set(array));
// }

// export function removeDuplicatesItems(array: IAtom[]): IAtom[] {
//   const array_Map = new Map();
//   array.forEach((item) => {
//     array_Map.set(item.id, item);
//   });

//   return Array.from(array_Map.values());
// }

/************************** Chunk ************************ */
export function chunk(array: any[], size: number): any[][] {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

export function makeArrayFlat(array: any[]): any[] {
  return [].concat(...array);
}

/********************************************************** */

export function capitalizeFirstLetter(string: string): string {
  if (string === undefined || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
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
