import { ConfigLanguage } from "./globals";

// export const LANGUAGE: ConfigLanguage = ConfigLanguage.fr;

export const URLs = {
  // ROOT_URL_WIKIPEDIA_ACTION: "https://" + LANGUAGE + ".wikipedia.org/w/api.php",
  // ROOT_URL_WIKIPEDIA_REST:
  //   "https://" + LANGUAGE + ".wikipedia.org/api/rest_v1/page/",
  ROOT_URL_WIKIPEDIA_EN: "https://en.wikipedia.org/w/api.php",
  ROOT_URL_WIKIDATA: "https://query.wikidata.org/sparql",
  ROOT_URL_WIKICOMMON: "https://commons.wikimedia.org/w/api.php",
};

export function ROOT_URL_WIKIPEDIA_ACTION(lang: ConfigLanguage): string {
  return "https://" + lang + ".wikipedia.org/w/api.php";
}

export function ROOT_URL_WIKIPEDIA_REST(lang: ConfigLanguage): string {
  return "https://" + lang + ".wikipedia.org/api/rest_v1/page/";
}
