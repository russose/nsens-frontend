import { CONFIG_FETCHING, LANGUAGE } from "../common/config";
import { IAtom, IRelatedAtom, JSONDataT } from "../common/types";
import { fetch_data_wikidata } from "./fetch";
import {
  buildListStringSeparated,
  chunk,
  enrichImagesBatchFromWikipediaEN,
  enrichOneImageFromRelatedWikipediaParallel,
  getAtomsFromWikipedia,
  idsFromSearchOrRandomOrTitlesFromWikipedia,
  ItemsRelatedFromWikipediaRaw,
  my_sparqlQuery_related,
  removeBadImages,
} from "./fetchLib";

const wikidata_language = LANGUAGE;
const max_size_api = CONFIG_FETCHING.max_size_chunk_api;

export async function ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
  pattern_or_titles: string,
  ROOT_URL: string,
  nb_items: number, //can be any value for "titles" since not used
  mode: "search" | "random" | "titles"
): Promise<IAtom[]> {
  const list_of_PageIds = await idsFromSearchOrRandomOrTitlesFromWikipedia(
    pattern_or_titles,
    ROOT_URL,
    nb_items,
    mode
  );
  const list_of_Pages_string = buildListStringSeparated(list_of_PageIds);
  const atomsList = await getAtomsFromWikipedia(list_of_Pages_string, ROOT_URL);
  let atomsListWithImages = await enrichImagesBatchFromWikipediaEN(atomsList);
  atomsListWithImages = removeBadImages(atomsListWithImages);

  atomsListWithImages = await enrichOneImageFromRelatedWikipediaParallel(
    atomsListWithImages,
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_REST,
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_ACTION
  );

  // atomsListWithImages = await enrichImagesOneByOneFromWikiCommonPediaParallel(
  //   atomsListWithImages,
  //   CONFIG_FETCHING.URLs.ROOT_URL_WIKICOMMON
  // );

  return atomsListWithImages;
}

export async function ItemsRelatedFromWikipedia(
  title: string,
  amount: number,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string
): Promise<IRelatedAtom[]> {
  const atomsList = await ItemsRelatedFromWikipediaRaw(
    title,
    amount,
    ROOT_URL_REST_API,
    ROOT_URL_ACTION_API
  );

  let atomsListWithImages = await enrichImagesBatchFromWikipediaEN(atomsList);
  atomsListWithImages = removeBadImages(atomsListWithImages);

  atomsListWithImages = await enrichOneImageFromRelatedWikipediaParallel(
    atomsListWithImages,
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_REST,
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_ACTION
  );

  const related: IRelatedAtom[] = atomsListWithImages.map((item: IAtom) => {
    return { relation: "wikipedia", item: item };
  });

  // atomsListWithImages = await enrichImagesOneByOneFromWikiCommonPediaParallel(
  //   atomsListWithImages,
  //   CONFIG_FETCHING.URLs.ROOT_URL_WIKICOMMON
  // );

  return related;
}

export async function ItemsFromWikidata(
  itemId: string,
  ROOT_URL_WIKIPEDIA: string
): Promise<IRelatedAtom[]> {
  //
  async function ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipediaParallel(
    list_of_PageTitle_string: string[]
  ): Promise<IAtom[][]> {
    const myBigPromise = await Promise.all(
      list_of_PageTitle_string.map((PageTitle_string: string) => {
        return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
          PageTitle_string,
          ROOT_URL_WIKIPEDIA,
          -1,
          "titles"
        );
      })
    );
    return myBigPromise;
  }

  if (itemId === undefined) {
    return [];
  }

  try {
    const sparqlQuery: string = my_sparqlQuery_related(
      itemId,
      wikidata_language
    );

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

    const items_chunked: IAtom[][] = await ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipediaParallel(
      list_of_PageTitle_string
    );
    // const items_flat: IAtom[] = makeArrayFlat(items_chunked)
    const items_flat: IAtom[] = [].concat(...items_chunked);

    let related_items: IRelatedAtom[] = items_flat.map((item: IAtom) => {
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
      const related: IRelatedAtom = { relation: prop, item: item };
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
