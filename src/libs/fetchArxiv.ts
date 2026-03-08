// https://info.arxiv.org/help/api/user-manual.html#_calling_the_api
// https://info.arxiv.org/help/api/index.html

import {
  AtomID,
  IAtom,
  JSONDataT,
  placeholder_image_not_refreshed,
  Tlanguage,
  TPrefixSource,
  TSource,
} from "../config/globals";
import { fetch_data_arxiv } from "./fetch";
import { stringList2String } from "./utils";

export async function getArxivEntriesFromSearch(
  search_string: string,
  amount: number,
  lang: Tlanguage
): Promise<IAtom[]> {
  if (search_string === undefined) {
    return [];
  }

  let PARAMS = {
    search_query: "all:" + search_string,
    sortBy: "relevance", //"submittedDate",
    sortOrder: "descending", //"ascending",
    max_results: amount,
  };

  let data = await getArxivRaw(PARAMS);
  if (data.length === 0) {
    //Reduce the size of the query search too big!
    PARAMS.search_query = PARAMS.search_query.slice(
      0,
      PARAMS.search_query.length / 2
    );
    data = await getArxivRaw(PARAMS);
  }

  const atomArxiv_list: IAtom[] = data.map((entry: JSONDataT) => {
    return atomFromEntry(entry, lang);
  });

  return atomArxiv_list;
}

export async function getArxivEntriesFromIds(
  IDs: AtomID[],
  lang: Tlanguage
): Promise<IAtom[]> {
  //arxiv only supported in English
  // if (id === undefined || lang !== Tlanguage.en) {
  //   return undefined;
  // }

  if (IDs === undefined || IDs.length === 0) {
    return undefined;
  }

  // const id_without_prefix = IDs.slice(TPrefixSource.arxiv.length);

  const id_without_prefix = IDs.map((id) => {
    return id.slice(TPrefixSource.arxiv.length);
  });

  const PARAMS = {
    id_list: id_without_prefix,
    sortBy: "relevance",
    // sortOrder: "descending",
    // max_results: 1,
  };

  const data = await getArxivRaw(PARAMS);

  const atomArxiv_list: IAtom[] = data.map((entry: JSONDataT) => {
    return atomFromEntry(entry, lang);
  });

  if (atomArxiv_list.length === 0) {
    return undefined;
  } else {
    // return atomArxiv_list[0];
    return atomArxiv_list;
  }
}

function atomFromEntry(entry: JSONDataT, lang: Tlanguage): IAtom {
  const id = entry.id[0].split("/").slice(-1)[0];

  const author_ = stringList2String(
    entry.author.map((el: any) => {
      return el.name[0];
    }),
    "; "
  );

  const atomArxiv: IAtom = {
    id: TPrefixSource.arxiv + id,
    title: entry.title[0],
    image_url: placeholder_image_not_refreshed, //Don't put "" since it will fetch image from wikipedia
    source: TSource.arxiv,

    wikibase_item: "",
    pageid_wp: -1,
    title_en: entry.title[0],
    language: lang,
    image_width: -1,
    image_height: -1,
    related: "",

    url: entry.id[0],
    author: author_,
    summary: entry.summary[0],
    attachment: entry.link[1].$.href,
  };
  // console.log(entry);
  return atomArxiv;
}

async function getArxivRaw(PARAMS: object): Promise<JSONDataT[]> {
  if (PARAMS === undefined) {
    return [];
  }

  const result = await fetch_data_arxiv(PARAMS);

  if (result.feed.entry === undefined) {
    return [];
  }

  return result.feed.entry;
}
