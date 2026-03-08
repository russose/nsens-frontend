import { CONFIG_ENV } from "../config/globals";
import { URLs } from "../config/configURLs";
import { JSONDataT } from "../config/globals";

const WIKIDATA_URL = URLs.ROOT_URL_WIKIDATA;
const ARXIV_URL = URLs.ROOT_URL_ARXIV;
const SEMANTICSCHOLAR_URL = URLs.SEMANTICSCHOLAR_URL;
const OPEN_LIBRARY_URL = URLs.ROOT_URL_OPEN_LIBRARY;
const GOOGLE_BOOKS_URL = URLs.GOOGLE_BOOKS_URL;

// const userAgentString = configFetching.userAgent;

const axios = require("axios").default;
const { parseStringPromise } = require("xml2js");

function prepare_url(
  root_url: string,
  params: Object,
  withOrigin = true
): string {
  let query: string = "";
  Object.entries(params).forEach(([key, value]) => {
    query += "&" + key + "=" + value;
  });
  if (withOrigin) {
    return root_url + "?origin=*" + encodeURI(query);
  } else {
    return root_url + encodeURI(query);
  }
}

export async function my_api(
  method: string,
  uri: string,
  data: object
): Promise<JSONDataT> {
  const res = await axios({
    withCredentials: true,
    method: method,
    baseURL: CONFIG_ENV.BACK_URL,
    url: uri,
    data: data,
  });

  return res;
}

/* Books */
export async function fetch_data_googlebooks(
  PARAMS: Object
): Promise<JSONDataT> {
  const res = await axios({
    method: "get",
    url: prepare_url(GOOGLE_BOOKS_URL, PARAMS, true),
  }).catch((error: any) => {
    // console.log(error);
  });

  const jsonData = res.data.items;
  return jsonData;
}

export async function fetch_data_openLibrary(
  PARAMS: Object
): Promise<JSONDataT> {
  const res = await axios({
    method: "get",
    url: prepare_url(OPEN_LIBRARY_URL + "search.json?", PARAMS, false),
  }).catch((error: any) => {
    // console.log("fetching error, amount: ", amount_error++);
  });

  const jsonData = res.data;
  return jsonData;
}

/* Arxiv */

export async function fetch_data_arxiv(PARAMS: Object): Promise<JSONDataT> {
  const res = await axios({
    method: "get",
    url: prepare_url(ARXIV_URL + "query?", PARAMS, false),
  }).catch((error: any) => {
    // console.log("fetching error, amount: ", amount_error++);
  });

  const jsonData = await parseStringPromise(res.data);
  return jsonData;
}

/* Semantic Scholar */

// export async function getHTMLFromUrl(pageUrl: string): Promise<string> {
//   // const response = await axios.get(pageUrl);
//   // const html = response.data;
//   // return html;

//   const res = await axios({
//     method: "get",
//     url: prepare_url(pageUrl, {}, false),
//   }).catch((error: any) => {
//     console.log(error);
//     return "";
//     // console.log("fetching error, amount: ", amount_error++);
//   });

//   // const jsonData = await parseStringPromise(res.data);
//   const html = res.data;
//   return html;
// }

export async function fetch_data_semanticscholar(
  url_postfix: string,
  PARAMS: Object,
  body: Object
): Promise<JSONDataT> {
  const data = JSON.stringify(body);

  const res = await axios({
    method: "get",
    url: prepare_url(SEMANTICSCHOLAR_URL + url_postfix, PARAMS),
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  }).catch((error: any) => {
    // console.log("fetching error, amount: ", amount_error++);
  });

  if (res === undefined) {
    return undefined;
  }

  const jsonData = res.data;
  return jsonData;
}

/* Wiki */

// let amount_error = 0;
export async function fetch_data_wiki_action(
  ROOT_URL: string,
  PARAMS: Object,
  output_URL: boolean
): Promise<JSONDataT> {
  const res = await axios({
    // headers: { "User-Agent": userAgentString },
    method: "get",
    url: prepare_url(ROOT_URL, PARAMS),
  }).catch((error: any) => {
    // console.log("fetching error, amount: ", amount_error++);
  });

  const data = await res.data;

  if (output_URL) {
    console.log(prepare_url(ROOT_URL, PARAMS));
  }

  return data;
}

export async function fetch_data_wikidata(
  sparqlQuery: string
): Promise<JSONDataT> {
  const res = await axios({
    method: "get",
    headers: {
      // "Api-User-Agent": userAgentString,
      Accept: "application/sparql-results+json",
    },
    url: WIKIDATA_URL + "?query=" + encodeURIComponent(sparqlQuery),
  });

  const data = await res.data.results.bindings;

  return data;
}

export async function fetchArticle(
  title: string,
  ROOT_URL: string
): Promise<string> {
  const title_ = title.replace(/\//g, "_");

  const data = await fetch_data_wiki_rest(
    title_ + "?redirect=true",
    ROOT_URL + "page/mobile-html/" //MOBILE,
    // ROOT_URL + "html/",  //DESKTOP
  );

  return data;
}

export async function fetch_data_wiki_rest(
  url: string,
  ROOT_URL: string
): Promise<string> {
  const res = await axios({
    method: "get",
    headers: {
      // "Api-User-Agent": userAgentString,
      Accept: "text/html",
    },
    baseURL: ROOT_URL,
    url: encodeURI(url),
  });

  const data = await res.data;

  return data;
}

// export async function fetch_data_local(path: string): Promise<object> {
//   const res = await axios({
//     method: "get",
//     headers: {
//       // "Api-User-Agent": userAgentString,
//       Accept: "text/html",
//     },
//     baseURL: CONFIG_ENV.FRONT_URL,
//     url: path,
//   });

//   const data = await res.data;

//   return data;
// }
