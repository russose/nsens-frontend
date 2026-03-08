import { EXCLUSION_PATTERNS, IAtom } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_searchFromWebWithoutImage } from "./apiItems";

export async function searchAndStoreWikiAtoms(
  stores: IStores,
  search_string: string
): Promise<IAtom[]> {
  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  const atoms: IAtom[] = await api_searchFromWebWithoutImage(
    search_string,
    lang,
    exclusion_patterns_items
  );
  stores.baseStore.setHistory(atoms);

  return atoms;
}
