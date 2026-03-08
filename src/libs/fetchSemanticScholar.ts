// https://api.semanticscholar.org/api-docs/graph

import {
  AtomID,
  IAtom,
  JSONDataT,
  TPrefixSource,
  TSource,
  Tlanguage,
  placeholder_image_not_refreshed,
} from "../config/globals";
import { fetch_data_semanticscholar } from "./fetch";

export async function relatedFromSemanticScholar(
  atomId: AtomID,
  lang: Tlanguage
): Promise<IAtom[]> {
  if (
    atomId === undefined ||
    atomId.split(TPrefixSource.arxiv)[1] === undefined
  ) {
    return [];
  }

  let id = atomId.split(TPrefixSource.arxiv)[1];

  // console.log("atomID", atomId, id);

  if (id.split("v")[1] !== undefined) {
    id = id.split("v")[0];
    // console.log("new:", id);
  }

  const PARAMS = {
    // fields:
    //   "title,externalIds,citationCount,influentialCitationCount,publicationTypes,tldr",
    fields: "title,publicationTypes,references.externalIds,references.title",
  };

  const result = await fetch_data_semanticscholar(
    // "ARXIV:" + "2004.06916",
    // "ARXIV:" + "hep-ph/9407376v1",
    "ARXIV:" + id,
    PARAMS,
    {}
  );

  if (result === undefined) {
    // console.log("result undefined");
    return [];
  }

  const data = result["references"];

  if (data === undefined) {
    // console.log("data undefined");
    return [];
  }

  //   console.log(data);

  const atomRelated_list: IAtom[] = data.map((entry: JSONDataT) => {
    return atomFromEntry(entry, lang);
  });

  return atomRelated_list.filter((item: IAtom) => {
    return item !== undefined;
  });
}

function atomFromEntry(entry: JSONDataT, lang: Tlanguage): IAtom {
  if (
    entry["externalIds"] === undefined ||
    entry["externalIds"] === null ||
    entry["externalIds"]["ArXiv"] === undefined
  ) {
    return undefined;
  }
  const id = entry["externalIds"]["ArXiv"];

  const atomArxiv: IAtom = {
    id: TPrefixSource.arxiv + id,
    title: entry.title,
    image_url: placeholder_image_not_refreshed, //Don't put "" since it will fetch image from wikipedia
    source: TSource.arxiv,

    wikibase_item: "",
    pageid_wp: -1,
    title_en: entry.title,
    language: lang,
    image_width: -1,
    image_height: -1,
    related: "",

    url: "",
    author: "",
    summary: "",
    attachment: "",
  };
  // console.log(entry);
  return atomArxiv;
}

// export async function improveArxivImageFromSemanticScholar(
//   atoms: IAtom[]
// ): Promise<IAtom[]> {
//   if (atoms === undefined || atoms.length === 0) {
//     return [];
//   }

//   console.log("fetching from semantic scholar...");

//   const body = {
//     ids: ["649def34f8be52c8b66281af98ae884c09aef38b", "ARXIV:2106.15928"],
//   };

//   const PARAMS = {
//     // fields:
//     //   "title,externalIds,citationCount,influentialCitationCount,publicationTypes,tldr",
//     fields: "title,externalIds",
//   };

//   const result = await fetch_data_semanticscholar("batch", PARAMS, body);

//   // const images = result.map((item: any) => {
//   //   const image_url =
//   //     "https://www.semanticscholar.org/paper/" +
//   //     encodeURI(item.title) +
//   //     "/" +
//   //     item.paperId +
//   //     "/figure/0";
//   //   return image_url;
//   // });

//   // const pageUrl =
//   //   "https://www.semanticscholar.org/paper/" +
//   //   encodeURI(itemFromAPI.title) +
//   //   "/" +
//   //   itemFromAPI.paperId +
//   //   "/figure/0";

//   const image_test = await getImageFromApiItem(result[0]);
//   console.log(image_test);

//   const atoms_with_new_image = atoms.map((atom) => {
//     atom.image_url = image_test;

//     return atom;
//   });

//   return atoms_with_new_image;
// }

// async function getImageFromApiItem(apiItem: any): Promise<string> {
//   if (apiItem === undefined) {
//     return "";
//   }

//   const pageUrl =
//     "https://www.semanticscholar.org/paper/" +
//     encodeURI(apiItem.title) +
//     "/" +
//     apiItem.paperId +
//     "/figure/0";

//   const image = await getImageFromPageUrl(pageUrl, "my_div");

//   console.log(image);

//   return image;
// }

// async function getImageFromPageUrl(
//   pageUrl: string,
//   divId: string
// ): Promise<string> {
//   if (pageUrl === undefined || pageUrl.length === 0) {
//     return "";
//   }

//   try {
//     const html = await getHTMLFromUrl(pageUrl);
//     const $ = cheerio.load(html);
//     const img = $(`#${divId} img`);
//     return img.attr("src");
//   } catch (error) {
//     // console.log(error);
//     return "";
//   }
// }
