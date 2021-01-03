import Router from "next/router";
import { GUI_CONFIG } from "../common/config";
import { paths } from "../common/configPaths";
import { IAtom } from "../common/types";
import { IStores } from "../stores/_RootStore";

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
  // console.log("hasTouchScreen:", hasTouchScreen);
  return hasTouchScreen;
  // return true;
}

export function displayCompactedGridCondition(stores: IStores): boolean {
  const amount_card_compact_width =
    GUI_CONFIG.display.amount_card_compact_width;

  // return true;

  // if (width < amount_card_compact_width * card_compact_width * 1.3) {
  //   return true;
  // } else {
  //   return false;
  // }

  if (
    stores.uiStore.screen.isMobile === undefined ||
    stores.uiStore.screen.isMobile === true
  ) {
    return true;
  } else {
    return false;
  }
}

export function goHome() {
  Router.push({
    pathname: paths.pages.Home,
  });
}

export function goLanding() {
  Router.push({
    pathname: paths.pages.Landing,
  });
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

//nombre aléatoire entre min (inclus) et max (exclue)
export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function entierAleatoire(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function removeDuplicates(array: string[]): any[] {
  return Array.from(new Set(array));
}

export function removeDuplicatesItems(array: IAtom[]): IAtom[] {
  // const list_id: AtomID[] = array.map((item) => {
  //   return item.id;
  // });
  // const list_id_unique = removeDuplicates(list_id);
  // const array_unique =
  const array_Map = new Map();
  array.forEach((item) => {
    array_Map.set(item.id, item);
  });

  return Array.from(array_Map.values());
}

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
