import {
  AtomID,
  configFetching,
  EXCLUSION_PATTERNS,
  IAtom,
  IKnowbook,
  initStateCat,
  IRelatedAtom,
  IRelatedAtomFull,
  KnowbookID,
  NodeID,
  Tlanguage,
  TRelationName,
  TSource,
  TUiBooleanStorage,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getItemsFromTitlesFromWebCleanImage_blocking } from "./apiItems";
import {
  api_getPublicKnowbooksSharingItems,
  api_getPublicKnowbooksWithTheseItems,
  api_getWikidataRelatedFromWebWithoutImage,
  api_getWikipediaRelatedFromWebWithoutImage,
} from "./apiRelated";
import {
  getAndStoreArxivAtoms,
  getAndStoreSemanticScholarAtoms,
} from "./helpersBaseArxivScholar";
import {
  getAndStoreGooglebooksAtoms,
  searchAndStoreGooglebooksAtoms,
} from "./helpersBaseBooks";
import { searchAndStoreWikiAtoms } from "./helpersBaseWiki";
import { getAndStoreOneKnowbookFull } from "./helpersSavedKnowbooks";
import { getSourceFromId, IRelatedAtomFull2IRelatedAtom } from "./utils";

export function updateNetworkMap(root_itemId: NodeID, stores: IStores): void {
  if (root_itemId === undefined) {
    return;
  }

  stores.graphStore.clearNetworkMap();

  // Related Atoms
  const relatedAtoms: IRelatedAtom[] =
    stores.graphStore.relatedAtoms.get(root_itemId);
  if (relatedAtoms !== undefined && relatedAtoms.length !== 0) {
    const relatedMap_local = new Map<string, AtomID[]>();

    relatedAtoms.forEach((el) => {
      const key = el.relation;
      if (!relatedMap_local.has(key)) {
        relatedMap_local.set(key, [el.item]);
      } else {
        const item_list: AtomID[] = relatedMap_local.get(key);
        item_list.push(el.item);
        relatedMap_local.set(key, item_list);
      }
    });

    // stores.graphStore.clearNetworkMap();
    //Sort Map by lengh
    const keys_values_sorted = Array.from(relatedMap_local.entries()).sort(
      (a, b) => {
        if (a[1].length > b[1].length) {
          //a est avant à b
          return -1;
        } else if (a[1].length < b[1].length) {
          //a est après à b
          return 1;
        } else {
          return 0;
        }
      }
    );

    keys_values_sorted.forEach((key_value) => {
      stores.graphStore.setNetworkMap(key_value[0], key_value[1]);
    });
  }

  //Add the related PublicKnowbooks
  if (stores.graphStore.relatedPublicKnowbooks.get(root_itemId) !== undefined) {
    stores.graphStore.setNetworkMap(
      stores.baseStore.GUI_CONFIG.language.network.nodeNameForPublicKnowbooks,
      stores.graphStore.relatedPublicKnowbooks.get(root_itemId)
    );
  }

  // When Root of network is a Knowbook, add content of knowbook
  const root_Id_Knowbook = root_itemId as KnowbookID;
  if (
    stores.graphStore.isRootNetworkItem === false &&
    stores.knowbookStore.getKnowbookFromId(root_Id_Knowbook) !== undefined
  ) {
    if (
      stores.graphStore.relatedPublicKnowbooks.get(root_itemId) === undefined
    ) {
      // No related knowbooks => no node to group containing items
      const knowbookItems: AtomID[] =
        stores.knowbookStore.getKnowbookFromId(root_Id_Knowbook).items;

      knowbookItems.forEach((atomId) => {
        stores.graphStore.setNetworkMap(TRelationName.hide_relation + atomId, [
          atomId,
        ]);
      });
    } else {
      // A node to group containing items

      stores.graphStore.setNetworkMap(
        stores.baseStore.GUI_CONFIG.language.network
          .nodeNameForContentKnowbooks,
        stores.knowbookStore.getKnowbookFromId(root_Id_Knowbook).items
      );
    }
  }

  // VERIFIER QU'ON PEUT SUPPRIMER CE setRootNetworkId QUI NE SERT A RIEN
  // stores.graphStore.setRootNetworkId(root_itemId);
}

async function fetchWikipediaRelatedItems(
  root_atom: IAtom,
  lang: Tlanguage,
  stores: IStores
): Promise<IRelatedAtom[]> {
  const source = getSourceFromId(root_atom.id);

  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  const relation_name =
    stores.baseStore.GUI_CONFIG.language.network.nodeNameWikipedia;

  let related_items: IAtom[];
  // let relatedListFull: IRelatedAtomFull[];

  if (source === TSource.wiki) {
    const relatedListFull: IRelatedAtomFull[] =
      await api_getWikipediaRelatedFromWebWithoutImage(
        root_atom.id,
        root_atom.title,
        lang,
        exclusion_patterns_items,
        relation_name,
        configFetching.amount_related_wikipedia
      );

    related_items = relatedListFull.map((relatedItem) => {
      return relatedItem.item;
    });

    stores.baseStore.setHistory(related_items);

    return IRelatedAtomFull2IRelatedAtom(relatedListFull);
  } else if (source === TSource.books) {
    // else if (source === TSource.arxiv || source === TSource.books) {
    //arxiv only supported in English
    // if (source === TSource.arxiv && lang !== Tlanguage.en) {
    //   return [];
    // }

    const related_items_ = await searchAndStoreWikiAtoms(
      stores,
      root_atom.title
    );

    related_items = related_items_.slice(
      0,
      configFetching.amount_related_wikipedia
    );

    // stores.baseStore.setHistory(related_items);

    const relatedList: IRelatedAtom[] = related_items.map((item) => {
      return {
        relation: relation_name,
        item: item.id,
      };
    });

    return relatedList;
  } else {
    return [];
  }
}

async function fetchWikidataRelatedItems(
  root_atom: IAtom,
  lang: Tlanguage,
  stores: IStores
): Promise<IRelatedAtom[]> {
  // Only for Wikipedia items

  const source = getSourceFromId(root_atom.id);
  if (source !== TSource.wiki) {
    return [];
  }

  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);
  const relation_name =
    stores.baseStore.GUI_CONFIG.language.network.nodeNameWikidata;

  const relatedListFull = await api_getWikidataRelatedFromWebWithoutImage(
    root_atom.id,
    root_atom.title,
    lang,
    exclusion_patterns_items,
    relation_name
  );

  const related_atoms: IAtom[] = relatedListFull.map((relatedItem) => {
    return relatedItem.item;
  });
  stores.baseStore.setHistory(related_atoms);

  return IRelatedAtomFull2IRelatedAtom(relatedListFull);
}

async function fetchPublicKnowbooksRelatedForAtoms(
  root_atom: IAtom,
  lang: Tlanguage,
  stores: IStores
): Promise<IKnowbook[]> {
  const related_publicKnowbooks = await api_getPublicKnowbooksWithTheseItems(
    [root_atom.id],
    lang,
    configFetching.amount_publicKnowbook_network
  );

  stores.knowbookStore.setPublicKnowbooks(related_publicKnowbooks);

  return related_publicKnowbooks;
}

async function fetchArxivRelatedItems(
  root_atom: IAtom,
  lang: Tlanguage,
  stores: IStores
): Promise<IRelatedAtom[]> {
  const amount_arxiv_network = configFetching.amount_arxiv_network;

  const relation_name =
    stores.baseStore.GUI_CONFIG.language.network.nodeNameForArxivItems;

  // const items: IAtom[] = await searchAndStoreArxivAtoms(
  //   stores,
  //   root_atom.title,
  //   amount_arxiv_network
  // );

  const items: IAtom[] = await getAndStoreSemanticScholarAtoms(
    stores,
    root_atom.id,
    amount_arxiv_network
  );

  if (items.length === 0) {
    return [];
  }

  const items_without_rootAtom = items.filter((item: IAtom) => {
    return item.id !== root_atom.id;
  });

  const relatedItems_arxiv: IRelatedAtom[] = items_without_rootAtom.map(
    (item: IAtom) => {
      return { relation: relation_name, item: item.id };
    }
  );

  return relatedItems_arxiv;
}

async function fetchGooglebooksRelatedItems(
  root_atom: IAtom,
  lang: Tlanguage,
  stores: IStores
): Promise<IRelatedAtom[]> {
  const amount_books_network = configFetching.amount_books_network; //should be less than 40
  const amount_searchBooks_amountBatch = 1;

  const relation_name =
    stores.baseStore.GUI_CONFIG.language.network.nodeNameForBooksItems;

  const items: IAtom[] = await searchAndStoreGooglebooksAtoms(
    stores,
    root_atom.title,
    amount_books_network,
    amount_searchBooks_amountBatch
  );

  if (items.length === 0) {
    return [];
  }

  const items_without_rootAtom = items.filter((item: IAtom) => {
    return item.id !== root_atom.id;
  });

  const relatedItems_books: IRelatedAtom[] = items_without_rootAtom.map(
    (item: IAtom) => {
      return { relation: relation_name, item: item.id };
    }
  );

  return relatedItems_books;
}

async function fetchPublicKnowbooksRelatedForKnowbooks(
  knowbookId: KnowbookID,
  lang: Tlanguage,
  stores: IStores
): Promise<IKnowbook[]> {
  const related_publicKnowbooks = await api_getPublicKnowbooksSharingItems(
    knowbookId,
    lang,
    configFetching.amount_publicKnowbook_network
  );

  stores.knowbookStore.setPublicKnowbooks(related_publicKnowbooks);

  return related_publicKnowbooks;
}

export async function fetchRelatedForAtom(
  root_Id: AtomID,
  root_itemTitle: string,
  stores: IStores
): Promise<void> {
  if (root_Id === undefined || root_itemTitle === undefined) {
    return;
  }

  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  let root_item: IAtom = stores.baseStore.getHistoryItem(root_Id);

  const source = getSourceFromId(root_Id);

  if (root_item === undefined) {
    if (source === TSource.wiki) {
      const items = await api_getItemsFromTitlesFromWebCleanImage_blocking(
        root_itemTitle,
        lang,
        exclusion_patterns_items
      );
      stores.baseStore.setHistory(items);

      root_item = items[0];
    } else if (source === TSource.arxiv) {
      root_item = await getAndStoreArxivAtoms(stores, root_Id);
    } else if (source === TSource.books) {
      root_item = await getAndStoreGooglebooksAtoms(stores, root_Id);
    }
  }

  if (root_item === undefined) {
    return;
  }

  if (!stores.graphStore.relatedAtoms.has(root_item.id)) {
    let related_wikipedia: IRelatedAtom[] = [];
    let related_wikidata: IRelatedAtom[] = [];
    let related_books: IRelatedAtom[] = [];
    let related_arxiv: IRelatedAtom[] = [];

    if (source === TSource.wiki) {
      related_wikipedia = await fetchWikipediaRelatedItems(
        root_item,
        lang,
        stores
      );
      related_wikidata = await fetchWikidataRelatedItems(
        root_item,
        lang,
        stores
      );

      related_books = await fetchGooglebooksRelatedItems(
        root_item,
        lang,
        stores
      );
    } else if (source === TSource.books) {
      related_wikipedia = await fetchWikipediaRelatedItems(
        root_item,
        lang,
        stores
      );

      related_books = await fetchGooglebooksRelatedItems(
        root_item,
        lang,
        stores
      );
    } else if (source === TSource.arxiv) {
      related_arxiv = await fetchArxivRelatedItems(root_item, lang, stores);
    } else {
      return;
    }

    const related_wikidata_items: AtomID[] = related_wikidata.map((related) => {
      return related.item;
    });

    const related_wikidata_without_root: IRelatedAtom[] =
      related_wikidata.filter((related) => {
        return related.item !== root_Id;
      });

    const related_wikipedia_without_wikidataItems: IRelatedAtom[] =
      related_wikipedia.filter((related) => {
        return !related_wikidata_items.includes(related.item);
      });

    const related_all = [
      ...related_wikipedia_without_wikidataItems,
      ...related_wikidata_without_root,
      ...related_arxiv,
      ...related_books,
    ];

    //With no duplicates by construction
    stores.graphStore.setRelatedAtoms(root_item.id, related_all);
  }

  if (!stores.graphStore.relatedPublicKnowbooks.has(root_item.id)) {
    const related_publicKnowbooks = await fetchPublicKnowbooksRelatedForAtoms(
      root_item,
      lang,
      stores
    );

    stores.graphStore.setRelatedPublicKnowbooks(
      root_item.id,
      related_publicKnowbooks.map((item) => {
        return item.id;
      })
    );
  }

  updateNetworkMap(root_item.id, stores);
}

export async function fetchRelatedForKnowbook(
  root_Id: KnowbookID,
  stores: IStores
): Promise<void> {
  const lang = stores.baseStore.paramsPage.lang;
  let root_knowbook: IKnowbook = await stores.knowbookStore.getKnowbookFromId(
    root_Id
  );

  if (
    root_knowbook === undefined ||
    root_knowbook.items.length === 0 ||
    stores.baseStore.getHistoryItems(root_knowbook.items).length !==
      root_knowbook.items.length
  ) {
    const knowbookFull = await getAndStoreOneKnowbookFull(stores, root_Id);
  }

  if (!stores.graphStore.relatedPublicKnowbooks.has(root_Id)) {
    const related_publicKnowbooks =
      await fetchPublicKnowbooksRelatedForKnowbooks(root_Id, lang, stores);

    stores.graphStore.setRelatedPublicKnowbooks(
      root_Id,
      related_publicKnowbooks.map((item) => {
        return item.id;
      })
    );
  }

  updateNetworkMap(root_Id, stores);
}

export async function fetchRelated(
  root_Id: NodeID,
  root_itemTitle: string,
  stores: IStores
): Promise<void> {
  stores.uiStore.setInitCompleted(initStateCat.itemRelated, false);

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, true);

  if (stores.graphStore.isRootNetworkItem === true) {
    const root_Id_Atom = root_Id as AtomID;
    await fetchRelatedForAtom(root_Id_Atom, root_itemTitle, stores);
  } else {
    // it is a public knowbook (not working for private ones)
    const root_Id_Knowbook = Number(root_Id) as KnowbookID;
    await fetchRelatedForKnowbook(root_Id_Knowbook, stores);
  }

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, false);

  stores.uiStore.setUiBooleanStorage(
    TUiBooleanStorage.renderGraphNetwork,
    true
  );

  stores.uiStore.setInitCompleted(initStateCat.itemRelated, true);
}
