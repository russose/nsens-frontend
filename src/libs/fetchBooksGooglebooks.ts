//https://developers.google.com/books/docs/v1/getting_started?hl=fr

import {
  IAtom,
  JSONDataT,
  placeholder_image_not_refreshed,
  Tlanguage,
  TPrefixSource,
  TSource,
} from "../config/globals";
import { fetch_data_googlebooks } from "./fetch";
import { makeArrayFlat, range, stringList2String } from "./utils";

function removeDuplicatedAtom(array: IAtom[]): IAtom[] {
  const array_set1 = new Map(
    array.map((atom: IAtom) => {
      return [atom.id, atom];
    })
  );
  const array_without_duplicate_id = Array.from(array_set1.values());

  const array_set2 = new Map(
    array_without_duplicate_id.map((atom: IAtom) => {
      return [atom.title, atom];
    })
  );

  const array_without_duplicate_id_title = Array.from(array_set2.values());

  return array_without_duplicate_id_title;
}

function buildAffiliateLink_old(id: string, lang: Tlanguage): string {
  const personal_id = "nsens-21";
  const lang_ext = lang === Tlanguage.en ? "co.uk" : lang;
  const url =
    "https://www.amazon." + lang_ext + "/dp/" + id + "/?tag=" + personal_id;

  return url;
}

function buildAffiliateLink(search_string: string, lang: Tlanguage): string {
  const personal_id = "nsens-21";
  const lang_ext = lang === Tlanguage.en ? "co.uk" : lang;
  const url = `https://www.amazon.${lang_ext}/gp/search?ie=UTF8&tag=${personal_id}&linkCode=ur2&linkId=ed37b6be0d469540f341caf61065b7ba&camp=1642&creative=6746&index=books&keywords=${search_string}`;

  return url;
}

export async function getBooksEntriesFromSearch(
  search_string: string,
  lang: Tlanguage,
  langReal: Tlanguage,
  sizeSingleBatch: number,
  amountBatch: number
): Promise<IAtom[]> {
  if (
    search_string === undefined ||
    search_string.length === 0 ||
    sizeSingleBatch < 1 ||
    amountBatch < 1
  ) {
    return [];
  }

  const startIndex_list: number[] = range(amountBatch).map((i) => {
    return i * sizeSingleBatch;
  });

  const myBigPromise_batch_list: IAtom[][] = await Promise.all(
    startIndex_list.map((startIndex: number) => {
      return getBooksEntriesFromSearch_single(
        search_string,
        lang,
        langReal,
        sizeSingleBatch,
        startIndex
      );
    })
  );

  const result: IAtom[] = makeArrayFlat(myBigPromise_batch_list);

  return removeDuplicatedAtom(result);
}

async function getBooksEntriesFromSearch_single(
  search_string: string,
  lang: Tlanguage,
  langReal: Tlanguage,
  sizeSingleBatch: number,
  startIndex: number
): Promise<IAtom[]> {
  if (search_string === undefined) {
    return [];
  }

  // const search_string_title_words = search_string.split(" ").slice(0, 5);

  const PARAMS = {
    q: search_string,
    // intitle: search_string_title_words,
    langRestrict: lang,
    maxResults: sizeSingleBatch,
    startIndex: startIndex,
    printType: "books",
    // orderBy: "newest",
    // fields: "kind,items(title,characteristics)",
  };

  let data = await getGooglebooksRaw(PARAMS);

  if (data.length === 0) {
    //Reduce the size of the query search too big!
    PARAMS.q = PARAMS.q.slice(0, PARAMS.q.length / 2);
    data = await getGooglebooksRaw(PARAMS);
  }

  const atomBooks_list: IAtom[] = data.map((entry: JSONDataT) => {
    return atomFromEntry(entry, lang, langReal);
  });

  const result = atomBooks_list.filter((item) => {
    return (
      item.id !== TPrefixSource.books &&
      item.image_url !== placeholder_image_not_refreshed
    );
  });

  return result;
}

export async function getBooksEntriesFromId(
  id: string,
  lang: Tlanguage,
  langReal: Tlanguage
): Promise<IAtom> {
  if (id === undefined) {
    return undefined;
  }

  const id_without_prefix = id.slice(TPrefixSource.books.length);

  const PARAMS = {
    q: id_without_prefix,
    isbn: id_without_prefix,
    langRestrict: lang,
    maxResults: 1,
    printType: "books",
  };

  const data = await getGooglebooksRaw(PARAMS);

  const atomBooks_list: IAtom[] = data.map((entry: JSONDataT) => {
    return atomFromEntry(entry, lang, langReal);
  });

  if (atomBooks_list.length === 0) {
    return undefined;
  } else {
    return atomBooks_list[0];
  }
}

function atomFromEntry(
  entry: JSONDataT,
  lang: Tlanguage,
  langReal: Tlanguage
): IAtom {
  const info = entry.volumeInfo;

  // let ISBN = "";
  // if (info.industryIdentifiers !== undefined) {
  //   const id_object_list = info.industryIdentifiers.filter((item: any) => {
  //     return item.type === "ISBN_10";
  //   });
  //   ISBN = id_object_list.length === 0 ? "" : id_object_list[0].identifier;

  //   if (ISBN === "") {
  //     const id_object_list = info.industryIdentifiers.filter((item: any) => {
  //       return item.type === "ISBN_13";
  //     });
  //     ISBN = id_object_list.length === 0 ? "" : id_object_list[0].identifier;
  //   }
  // } else {
  //   // console.log("undefined");
  // }

  const image_url =
    info.imageLinks === undefined
      ? placeholder_image_not_refreshed
      : info.imageLinks.thumbnail;
  const author_ =
    info.authors === undefined
      ? ""
      : // : stringList2String(info.authors, "; ").slice(0, -1);
        stringList2String(info.authors, "; ");

  const atomBook: IAtom = {
    id: TPrefixSource.books + entry.id,
    // id: TPrefixSource.books + ISBN,
    title: info.title,
    image_url: image_url,
    source: TSource.books,

    wikibase_item: "",
    pageid_wp: -1,
    title_en: "",
    language: lang,
    image_width: -1,
    image_height: -1,
    related: "",
    attachment: "",

    url: buildAffiliateLink(info.title, langReal),
    author: author_,
    summary: info.description,
  };
  return atomBook;
}

async function getGooglebooksRaw(PARAMS: object): Promise<JSONDataT[]> {
  if (PARAMS === undefined) {
    return [];
  }

  const result = await fetch_data_googlebooks(PARAMS);

  if (result === undefined) {
    return [];
  }

  return result;
}
