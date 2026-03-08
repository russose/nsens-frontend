import { IAtom } from "../config/globals";
import { IStores } from "../stores/RootStore";
import {
  getBooksEntriesFromId,
  getBooksEntriesFromSearch,
} from "./fetchBooksGooglebooks";
// import { getBooksEntriesFromSearch_ } from "./fetchBooksOpenlibrary";

export async function searchAndStoreGooglebooksAtoms(
  stores: IStores,
  search_string: string,
  sizeSingleBatch: number,
  amountBatch: number
): Promise<IAtom[]> {
  const lang = stores.baseStore.paramsPage.lang;
  const langReal = stores.baseStore.screen.realLocation;

  const atoms: IAtom[] = await getBooksEntriesFromSearch(
    search_string,
    lang,
    langReal,
    sizeSingleBatch,
    amountBatch
  );
  // const atoms_: IAtom[] = await getBooksEntriesFromSearch_(
  //   search_string,
  //   lang,
  //   20
  // );
  stores.baseStore.setHistory(atoms);

  return atoms;
}

export async function getAndStoreGooglebooksAtoms(
  stores: IStores,
  id: string
): Promise<IAtom> {
  const lang = stores.baseStore.paramsPage.lang;
  const langReal = stores.baseStore.screen.realLocation;

  const atom: IAtom = await getBooksEntriesFromId(id, lang, langReal);

  stores.baseStore.setHistory([atom]);

  return atom;
}
