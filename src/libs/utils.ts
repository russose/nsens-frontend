import Router from "next/router";

export function findUndefined(list: Object[]) {
  list.forEach((item) => {
    Object.values(item).forEach((value) => {
      if (value === undefined) {
        console.log(item);
      }
    });
  });
}

export function goHome() {
  Router.push({
    pathname: "/",
  });
}

export function goLogin() {
  Router.push({
    pathname: "/User",
  });
}

//nombre aléatoire entre min (inclus) et max (exclue)
export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function entierAleatoire(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
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
