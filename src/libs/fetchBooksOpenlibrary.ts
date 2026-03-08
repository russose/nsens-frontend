//https://openlibrary.org/developers/api#api-partners

import {
  IAtom,
  JSONDataT,
  Tlanguage,
  TPrefixSource,
  TSource,
} from "../config/globals";
import { fetch_data_openLibrary } from "./fetch";

function removeDuplicatedAtom(array: IAtom[]): IAtom[] {
  const array_set = new Map(
    array.map((atom: IAtom) => {
      return [atom.id, atom];
    })
  );
  const array_without_duplicate = Array.from(array_set.values());

  return array_without_duplicate;
}

function convertLang(lang: Tlanguage): string {
  const mapping = {
    [Tlanguage.en]: "eng",
    [Tlanguage.fr]: "fre",
    [Tlanguage.it]: "ita",
  };
  return mapping[lang];
}

export async function getBooksEntriesFromSearch_(
  search_string: string,
  lang: Tlanguage,
  amount: number
): Promise<IAtom[]> {
  if (search_string === undefined) {
    return [];
  }

  const PARAMS = {
    q: search_string,
    language: convertLang(lang),
    limit: amount,
    type: "edition",
  };

  let data = await getOpenLibraryRaw(PARAMS);

  // console.log("***OpenLibrary***", data.slice(0, 2));
  // console.log(
  //   "***OpenLibrary***",
  //   data.map((i) => {
  //     return [i.ratings_average, i.ratings_count, i.readinglog_count];
  //   })
  // );

  if (data.length === 0) {
    //Reduce the size of the query search too big!
    PARAMS.q = PARAMS.q.slice(0, PARAMS.q.length / 2);
    data = await getOpenLibraryRaw(PARAMS);
  }

  const atomBooks_list: IAtom[] = data.map((entry: JSONDataT) => {
    return atomFromEntry(entry, lang);
  });

  const result = atomBooks_list.filter((item) => {
    return item.id !== "";
  });

  // console.log(result);

  // return result;
  return removeDuplicatedAtom(result);
}

function atomFromEntry(entry: JSONDataT, lang: Tlanguage): IAtom {
  const ISBN = entry.isbn === undefined ? "" : entry.isbn[0];
  const image_url = "https://covers.openlibrary.org/b/isbn/" + ISBN + "-M.jpg";

  // const author_ = stringList2String(entry.author_name, "; ");
  const author_ = "TO BE DONE";

  const atomBook: IAtom = {
    id: TPrefixSource.books + ISBN,
    title: entry.title,
    image_url: image_url,
    source: TSource.books,

    wikibase_item: "",
    pageid_wp: -1,
    title_en: entry.title,
    language: lang,
    image_width: -1,
    image_height: -1,
    related: "",
    attachment: "",

    url: "TO BE DONE TO AMAZON STORE",
    author: author_,
    summary: "",
  };
  return atomBook;
}

async function getOpenLibraryRaw(PARAMS: object): Promise<JSONDataT[]> {
  if (PARAMS === undefined) {
    return [];
  }

  const result = await fetch_data_openLibrary(PARAMS);

  if (result.docs === undefined) {
    return [];
  }

  return result.docs;
}
