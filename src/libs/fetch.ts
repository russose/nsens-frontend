import { CONFIG_FETCHING } from "../common/config";
import { CONFIG_OPS } from "../common/config_env";
import { JSONDataT } from "../common/types";

const wikidata_url = CONFIG_FETCHING.URLs.ROOT_URL_WIKIDATA;
const userAgentString = CONFIG_FETCHING.userAgent;

const axios = require("axios").default;

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
    headers: { "User-Agent": userAgentString },
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
    headers: {
      Accept: "application/sparql-results+json",
    },
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
    withCredentials: true,
    method: method,
    // url: CONFIG_OPS.BACK_URL + uri,
    baseURL: CONFIG_OPS.BACK_URL,
    url: uri,
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
    headers: { Accept: "text/html" },
    // baseURL: ROOT_URL + "html/",  //DSKTOP
    baseURL: ROOT_URL + "mobile-html/", //MOBILE
    url: title + "?redirect=true",
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
    headers: { Accept: "text/html" },
    baseURL: ROOT_URL + "related/",
    url: encodeURI(title),
  });

  const data = await res.data;

  return data;
}
