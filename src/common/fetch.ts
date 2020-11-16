import { CONFIG_OPS } from "./config_env";
const ROOT_URL_WIKIDATA = "https://query.wikidata.org/sparql";

/************************************** */
//Temporary when using self signed certificate
// To be remove when in production
// import * as https from "https";
// import { CONFIG_OPS } from "./config_env";

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });
/************************************** */

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
): Promise<any> {
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

export async function fetch_data_wikidata(sparqlQuery: string): Promise<any> {
  const res = await axios({
    method: "get",
    headers: { Accept: "application/sparql-results+json" },
    url: ROOT_URL_WIKIDATA + "?query=" + encodeURIComponent(sparqlQuery),
  });

  const data = await res.data.results.bindings;

  return data;
}

export async function _api(
  method: string,
  uri: string,
  data: object
): Promise<any> {
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

// export async function fetchArticle_old(
//   pattern: string,
//   ROOT_URL: string
// ): Promise<string> {
//   const PARAMS = {
//     action: "query",
//     format: "json",
//     utf8: 1,
//     titles: pattern,
//     prop: "extracts",
//   };
//   const data = await fetch_data(ROOT_URL, PARAMS, false);

//   if (data["query"] === undefined || data["query"]["pages"] === undefined) {
//     return "No article";
//   }

//   let article: string = "";
//   Object.values(data["query"]["pages"]).forEach((item: any) => {
//     article = item["extract"];
//   });

//   if (article === undefined) {
//     return "Article not found";
//   } else {
//     return article;
//   }
// }

// export async function fetch_data_old(
//   ROOT_URL: string,
//   PARAMS: Object,
//   output_URL: boolean
// ): Promise<any> {
//   const header = {
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
//     },
//   };
//   // Fetch data from external API
//   let res = await fetch(prepare_url(ROOT_URL, PARAMS), header);
//   const data = await res.json();

//   if (output_URL) {
//     console.log(prepare_url(ROOT_URL, PARAMS));
//   }

//   return data;
// }
