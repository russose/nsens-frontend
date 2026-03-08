import { AtomID, IAtom } from "../config/globals";
import { IStores } from "../stores/RootStore";
import {
  getArxivEntriesFromIds,
  getArxivEntriesFromSearch,
} from "./fetchArxiv";
import { relatedFromSemanticScholar } from "./fetchSemanticScholar";

export async function searchAndStoreArxivAtoms(
  stores: IStores,
  search_string: string,
  amount: number
): Promise<IAtom[]> {
  const lang = stores.baseStore.paramsPage.lang;

  const atoms: IAtom[] = await getArxivEntriesFromSearch(
    search_string,
    amount,
    lang
  );
  stores.baseStore.setHistory(atoms);

  return atoms;
}

export async function getAndStoreArxivAtoms(
  stores: IStores,
  id: string
): Promise<IAtom> {
  const lang = stores.baseStore.paramsPage.lang;

  const atoms: IAtom[] = await getArxivEntriesFromIds([id], lang);

  stores.baseStore.setHistory(atoms);

  return atoms[0];
}

export async function getAndStoreSemanticScholarAtoms(
  stores: IStores,
  id: AtomID,
  amount: number
): Promise<IAtom[]> {
  const lang = stores.baseStore.paramsPage.lang;

  const atoms_semanticScholar: IAtom[] = await relatedFromSemanticScholar(
    id,
    lang
  );
  const ids_semanticScholar: AtomID[] = atoms_semanticScholar.map((atom) => {
    return atom.id;
  });

  const atoms: IAtom[] = await getArxivEntriesFromIds(
    ids_semanticScholar,
    lang
  );

  if (atoms === undefined) {
    return [];
  }

  const atoms_limited = atoms.slice(0, amount);

  stores.baseStore.setHistory(atoms_limited);

  return atoms_limited;
}
