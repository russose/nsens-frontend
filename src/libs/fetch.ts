import { CONFIG_FETCHING } from "../common/config";
import { CONFIG_OPS } from "../common/config_env";
import { JSONDataT } from "../common/types";

/************************************** */
//Temporary when using self signed certificate
// To be remove when in production
// import * as https from "https";
// import { CONFIG_OPS } from "./config_env";

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });
/************************************** */

const wikidata_url = CONFIG_FETCHING.URLs.ROOT_URL_WIKIDATA;

const axios = require("axios");

export function prepare_url(root_url: string, params: Object): string {
  let query: string = "";
  Object.entries(params).forEach(([key, value]) => {
    query += "&" + key + "=" + value;
  });
  return root_url + "?origin=*" + encodeURI(query);
}

export async function fetch_data(
  ROOT_URL: string,
  PARAMS: Object,
  output_URL: boolean
): Promise<JSONDataT> {
  const res = await axios({
    method: "get",
    url: prepare_url(ROOT_URL, PARAMS),
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
    headers: { Accept: "application/sparql-results+json" },
    url: wikidata_url + "?query=" + encodeURIComponent(sparqlQuery),
  });

  const data = await res.data.results.bindings;

  return data;
}

export async function _api(
  method: string,
  uri: string,
  data: object
): Promise<JSONDataT> {
  const res = await axios({
    // httpsAgent: agent,
    withCredentials: true,
    method: method,
    url: CONFIG_OPS.BACK_URL + uri,
    data: data,
  });

  return res;
}

export async function fetchArticle(
  title: string,
  ROOT_URL: string
): Promise<string> {
  const res = await axios({
    method: "get",
    headers: {
      Accept: "text/html",
    },
    baseURL: ROOT_URL + "html/",
    url:
      // "https://en.wikipedia.org/api/rest_v1/page/mobile-html/Albert_Einstein", //Mobile
      title + "?redirect=true", //Desktop
  });

  const data = await res.data;

  return data;
}

export async function fetchRelatedWikipedia(
  title: string,
  ROOT_URL: string
): Promise<string> {
  const res = await axios({
    method: "get",
    headers: {
      Accept: "text/html",
    },
    baseURL: ROOT_URL + "related/",
    url: encodeURI(title),
  });

  const data = await res.data;

  return data;
}
