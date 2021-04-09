import { ConfigDisplay } from "../common/types";

const e = "comvacv_msens";
export function getEmail(): string {
  const result: string =
    e.replace(/_/g, "@").replace(/m/g, "n").replace(/v/g, "t") + ".org";
  return result;
}

const t = "nwenw";
export function getTwitter(): string {
  const result: string = "https://twitter.com/_" + t.replace(/w/g, "s");
  return result;
}

const display_username = "none";
export function getUserNameDisplay(): string {
  return display_username;
}

export function isMobile(GUI_CONFIG_id: string): boolean {
  const result: boolean =
    // GUI_CONFIG_id.includes(ConfigDisplay.small) ||
    GUI_CONFIG_id.includes(ConfigDisplay.mobile);

  return result;
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

export function displayCompactedGridCondition(GUI_CONFIG_id: string): boolean {
  // if (isMobile(GUI_CONFIG_id)) {
  //   return true;
  // } else {
  //   return false;
  // }
  return false;
}

export function findUndefined(list: Object[]) {
  list.forEach((item) => {
    Object.values(item).forEach((value) => {
      if (value === undefined) {
        // console.log(item);
      }
    });
  });
}

//nombre aléatoire entre min (inclus) et max (exclue)
export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function entierAleatoire(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
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

export function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function makeArrayFlat(array: any[]): any[] {
  return [].concat(...array);
}

export function capitalizeFirstLetter(string: string): string {
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
