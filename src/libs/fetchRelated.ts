import {
  ConfigLanguage,
  IAtom,
  JSONDataT,
  AtomID,
  configFetching,
  IRelatedAtomFull,
} from "../config/globals";
import { fetch_data_wikidata } from "./fetch";
import {
  buildListStringSeparated,
  filterItems,
  improveImageFromWikipediaParallel_blocking,
  ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage,
  ItemsRelatedFromWikipediaRaw,
  removeBigImages,
} from "./fetchBase";

const max_size_api = configFetching.max_size_chunk_api;

/**
 * Interface
 */

export async function fetchRelatedCleanImage_blocking(
  itemId: AtomID,
  title: string,
  amount: number,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IRelatedAtomFull[]> {
  if (itemId === undefined || title === undefined) {
    return;
  }

  const relatedWithoutImage_filtered: IRelatedAtomFull[] =
    await fetchRelatedWithoutImage(
      itemId,
      title,
      amount,
      ROOT_URL_REST_API,
      ROOT_URL_ACTION_API,
      lang,
      exclusion_patterns
    );

  const ItemsWithoutImageMap = new Map<AtomID, IAtom>();
  relatedWithoutImage_filtered.forEach(
    (related_itemWithoutImage: IRelatedAtomFull) => {
      const item: IAtom = related_itemWithoutImage.item;
      ItemsWithoutImageMap.set(item.id, item);
    }
  );

  const atomsList_filtered: IAtom[] = Array.from(ItemsWithoutImageMap.values());

  const atomsListWithImages = await improveImageFromWikipediaParallel_blocking(
    atomsList_filtered,
    ROOT_URL_ACTION_API,
    ROOT_URL_REST_API,
    lang
  );

  const ItemsCleanImageMap = new Map<AtomID, IAtom>();
  atomsListWithImages.forEach((itemCleanImage) => {
    // const item: IAtom = related_itemWithoutImage.item;
    ItemsCleanImageMap.set(itemCleanImage.id, itemCleanImage);
  });

  const relatedCleanImage_filtered: IRelatedAtomFull[] =
    relatedWithoutImage_filtered.map(
      (related_itemWithoutImage: IRelatedAtomFull) => {
        const related_itemCleanImage = related_itemWithoutImage;
        related_itemCleanImage.item = ItemsCleanImageMap.get(
          related_itemWithoutImage.item.id
        );
        return related_itemCleanImage;
      }
    );

  return relatedCleanImage_filtered;
}

export async function fetchRelatedWithoutImage(
  itemId: AtomID,
  title: string,
  amount: number,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IRelatedAtomFull[]> {
  if (itemId === undefined || title === undefined) {
    return;
  }

  const relatedItems_wikipedia: IRelatedAtomFull[] =
    await ItemsRelatedFromWikipediaWithoutImage(
      title,
      // itemId,
      amount,
      ROOT_URL_REST_API,
      ROOT_URL_ACTION_API,
      lang,
      exclusion_patterns
    );

  const relatedItems_wikidata: IRelatedAtomFull[] =
    await ItemsFromWikidataWithoutImage(
      itemId,
      // ROOT_URL_REST_API,
      ROOT_URL_ACTION_API,
      lang,
      exclusion_patterns
    );

  const relatedItems = relatedItems_wikidata.concat(relatedItems_wikipedia);

  //Remove duplicated items
  const relatedItems_no_doubles = new Map();
  relatedItems.forEach((related) => {
    relatedItems_no_doubles.set(related.item.id, related);
  });

  const relatedItems_no_doubles_array: IRelatedAtomFull[] = Array.from(
    relatedItems_no_doubles.values()
  );

  return relatedItems_no_doubles_array;
}

/*****
 *
 */

async function ItemsRelatedFromWikipediaWithoutImage(
  title: string,
  amount: number,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IRelatedAtomFull[]> {
  const atomsList = await ItemsRelatedFromWikipediaRaw(
    title,
    amount,
    ROOT_URL_REST_API,
    ROOT_URL_ACTION_API,
    lang
  );

  const atomsList_filtered = filterItems(atomsList, exclusion_patterns);
  // const atomsListWithImages = await improveImageFromWikipediaParallel_blocking(
  //   atomsList_filtered,
  //   ROOT_URL_ACTION_API,
  //   ROOT_URL_REST_API,
  //   lang
  // );

  const atomsList_filtered_without_images: IAtom[] =
    removeBigImages(atomsList_filtered);

  const related: IRelatedAtomFull[] = atomsList_filtered_without_images.map(
    (item: IAtom) => {
      return { relation: "wikipedia", item: item };
    }
  );

  return related;
}

async function ItemsFromWikidataWithoutImage(
  itemId: string,
  // ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IRelatedAtomFull[]> {
  //
  async function ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImageParallel(
    list_of_PageTitle_string: string[]
  ): Promise<IAtom[][]> {
    const myBigPromise = await Promise.all(
      list_of_PageTitle_string.map((PageTitle_string: string) => {
        return ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage(
          PageTitle_string,
          // ROOT_URL_REST_API,
          ROOT_URL_ACTION_API,
          -1,
          "titles",
          lang,
          exclusion_patterns
        );
      })
    );
    return myBigPromise;
  }

  if (itemId === undefined) {
    return [];
  }

  try {
    const sparqlQuery: string = my_sparqlQuery_related(itemId, lang);

    const result = await fetch_data_wikidata(sparqlQuery);

    if (result === undefined) {
      return [];
    }

    const mapping_label = new Map<string, string>();
    const mapping_prop = new Map<string, string>();
    const mapping_label_prop = new Map<string, string>();

    Object.values(result).forEach((item: JSONDataT) => {
      if (
        item["Entity"] !== undefined &&
        item["EntityLabel"] !== undefined &&
        item["propLabel"] !== undefined
      ) {
        const key_list = item["Entity"]["value"].split("/");
        const key = key_list[key_list.length - 1];
        const label = item["EntityLabel"]["value"];
        const prop = item["propLabel"]["value"];
        mapping_label.set(key, label);
        mapping_prop.set(key, prop);
        mapping_label_prop.set(label, prop);
      }
    });

    const mapping_label_chunked = chunk(
      Array.from(mapping_label.values()),
      max_size_api
    );
    const list_of_PageTitle_string = mapping_label_chunked.map(
      (PageTitle_string: string[]) => {
        return buildListStringSeparated(PageTitle_string);
      }
    );

    const items_chunked: IAtom[][] =
      await ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImageParallel(
        list_of_PageTitle_string
      );
    // const items_flat: IAtom[] = makeArrayFlat(items_chunked)
    const items_flat: IAtom[] = [].concat(...items_chunked);

    let related_items: IRelatedAtomFull[] = items_flat.map((item: IAtom) => {
      if (item === undefined) {
        return undefined;
      }

      const prop_from_id = mapping_prop.get(item["id"]);
      const prop_from_label = mapping_label_prop.get(item["title"]);

      let prop: string;
      if (prop_from_id !== undefined) {
        prop = prop_from_id;
      } else if (prop_from_label !== undefined) {
        prop = prop_from_label;
      } else {
        return undefined;
      }

      // item["related"] = itemId + "|" + prop;
      const related: IRelatedAtomFull = { relation: prop, item: item };
      return related;
    });

    related_items = related_items.filter((item_related) => {
      return item_related !== undefined;
    });

    return related_items;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

/**
 * Library
 */

function my_sparqlQuery_related(
  itemId: string,
  wikidata_language: string
): string {
  const sparqlQuery: string = `SELECT ?var ?propLabel ?Entity ?EntityLabel (count (*) as ?EntityClasseLabel) WHERE {
  
    BIND(wd:${itemId} AS ?var).
    
    #?var wdt:P31 ?Classe.
    ?var ?p ?Entity.
    ?Entity wdt:P31 ?EntityClasse.
    
    #To get Label of the prop
    ?prop wikibase:directClaim ?p.

    MINUS {?Entity wdt:P31 wd:Q4167836.}
    
    ?Entity rdfs:label ?EntityLabel
    FILTER (LANG(?EntityLabel) = "${wikidata_language}" && ?prop not in (wd:P31,wd:P910,wd:P5008,wd:P735,wd:P5125,wd:P485,wd:P1343,wd:P1424,wd:P21,wd:P530) )
            
    SERVICE wikibase:label { bd:serviceParam wikibase:language "${wikidata_language}". }
  }
  group by ?var ?propLabel ?Entity ?EntityLabel order by desc(?propLabel)`;

  return sparqlQuery;
}

function chunk(array: any[], size: number) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}
