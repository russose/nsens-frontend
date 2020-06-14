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
