import { IAtom, KnowbookID } from "../config/globals";
import { IStores } from "../stores/RootStore";

// export function getKnowbookStaticAtomsList(
//   knowbookID: KnowbookID,
//   stores: IStores
// ): IAtom[] {
//   if (!stores.knowbookStore.staticKnowbooks.has(knowbookID)) {
//     // console.log("impossible to provide Atoms List from knowbook");
//     return [];
//   } else {
//     const my_knowbook = stores.knowbookStore.staticKnowbooks.get(knowbookID);
//     if (my_knowbook !== undefined) {
//       return my_knowbook.items;
//     } else {
//       // console.log("impossible to provide Atoms List from knowbook 2");
//       return [];
//     }
//   }
// }

// export function IsItemInAnyStaticKnowbook(
//   atomId: AtomID,
//   stores: IStores
// ): boolean {
//   if (atomId === undefined) {
//     return false;
//   }
//   const result: boolean =
//     stores.knowbookStore.allItemsInStaticKnowbooks.has(atomId);
//   return result;
// }

// export function goRandomStaticKnowbook(stores: IStores) {
//   const staticKnowbooksName: string[] = [
//     ...Array.from(stores.knowbookStore.staticKnowbooks.keys()),
//   ];
//   const name =
//     staticKnowbooksName[entierAleatoire(0, staticKnowbooksName.length - 1)];

//   goPage(
//     stores,
//     stores.baseStore.paramsPage,
//     configPaths.pages.StaticKnowbook,
//     { nameOrPeriod: name },
//     false
//   );
// }

// export function goRandomStaticKnowbookWhenHome(
//   stores: IStores,
//   isHome: boolean
// ) {
//   if (!isHome || configGeneral.demoModeForScreenshoots) {
//     return;
//   }

//   const staticKnowbooksName: string[] = [
//     ...Array.from(stores.knowbookStore.staticKnowbooks.keys()),
//   ];
//   const name =
//     staticKnowbooksName[entierAleatoire(0, staticKnowbooksName.length - 1)];

//   goPage(
//     stores,
//     stores.baseStore.paramsPage,
//     configPaths.pages.StaticKnowbook,
//     { nameOrPeriod: name },
//     false
//   );
// }
