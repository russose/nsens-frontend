import { ParentSize } from "@visx/responsive";
import { observer } from "mobx-react-lite";
import Router from "next/router";
import { paths } from "../common/configPaths";

export const ParentSize_ = observer(ParentSize);

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

export function removeDuplicates(array: any[]): any[] {
  return Array.from(new Set(array));
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
