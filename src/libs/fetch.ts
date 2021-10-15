import { CONFIG_ENV } from "../config/globals";
import { URLs } from "../config/configURLs";
import { JSONDataT } from "../config/globals";

const wikidata_url = URLs.ROOT_URL_WIKIDATA;
// const userAgentString = configFetching.userAgent;

const axios = require("axios").default;

export function prepare_url(root_url: string, params: Object): string {
  let query: string = "";
  Object.entries(params).forEach(([key, value]) => {
    query += "&" + key + "=" + value;
  });
  return root_url + "?origin=*" + encodeURI(query);
}

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
    url: wikidata_url + "?query=" + encodeURIComponent(sparqlQuery),
  });

  const data = await res.data.results.bindings;

  return data;
}

export async function my_api(
  method: string,
  uri: string,
  data: object
): Promise<JSONDataT> {
  const res = await axios({
    withCredentials: true,
    method: method,
    // url: CONFIG_OPS.BACK_URL + uri,
    baseURL: CONFIG_ENV.BACK_URL,
    url: uri,
    data: data,
  });

  return res;
}

export async function fetchArticle(
  title: string,
  ROOT_URL: string
): Promise<string> {
  const title_ = title.replace(/\//g, "_");

  const data = await fetch_data_wiki_rest(
    title_ + "?redirect=true",
    ROOT_URL + "page/mobile-html/" //MOBILE,
    // ROOT_URL + "html/",  //DSKTOP
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
    // baseURL: ROOT_URL + "related/",
    baseURL: ROOT_URL,
    url: encodeURI(url),
  });

  const data = await res.data;

  return data;
}

export async function fetch_data_local(
  path: string
  // lang: ConfigLanguage
): Promise<object> {
  const res = await axios({
    method: "get",
    headers: {
      // "Api-User-Agent": userAgentString,
      Accept: "text/html",
    },
    // baseURL: ROOT_URL + "related/",
    baseURL: CONFIG_ENV.FRONT_URL,
    // url: "/staticKnowbooks" + "/" + lang + "/" + name + ".txt",
    url: path,
  });

  const data = await res.data;

  return data;
}

// export async function fetch_data_wikimedia_rest(
//   year: string,
//   month: string,
//   day: string,
//   ROOT_URL: string
// ): Promise<string> {
//   const res = await axios({
//     method: "get",
//     headers: {
//       // "Api-User-Agent": userAgentString,
//       Accept: "text/html",
//     },
//     baseURL: ROOT_URL,
//     url: encodeURI(year + "/" + month + "/" + day),
//   });

//   const data = await res.data;

//   return data;
// }

// https://wikimedia.org/api/rest_v1/metrics/pageviews/top/fr.wikipedia.org/all-access/2020/12/all-days
