import { Tlanguage } from "./globals";

export const URLs = {
  ROOT_URL_WIKIDATA: "https://query.wikidata.org/sparql",
  ROOT_URL_WIKIDATA_ACTION: "https://www.wikidata.org/w/api.php",
  ROOT_URL_WIKICOMMON: "https://commons.wikimedia.org/w/api.php",
};

export function ROOT_URL_WIKIPEDIA_ACTION(lang: Tlanguage): string {
  return "https://" + lang + ".wikipedia.org/w/api.php";
}

export function ROOT_URL_WIKIPEDIA_REST(lang: Tlanguage): string {
  return "https://" + lang + ".wikipedia.org/api/rest_v1/";
}

// ATTENTION, CETTE URL NE FONCTIONNE PAS AVEC LES ADBLOCKERS, à n'utiliser qu'en BACK pour les TOPS
export function ROOT_URL_WIKIMEDIA_TOP_REST(lang: Tlanguage): string {
  return (
    "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/" +
    lang +
    ".wikipedia.org/all-access/"
  );
}

export function ROOT_URL_WIKIPEDIA(lang: Tlanguage): string {
  return "https://" + lang + ".wikipedia.org/wiki/";
}
