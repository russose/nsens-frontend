import { displayDesktop } from "./configDesktop";
import { Lang_fr } from "./configLangFr";
import { paths } from "./configPaths";

export const LANGUAGE = "fr";

export const CONFIG_FETCHING = {
  URLs: {
    ROOT_URL_WIKIPEDIA_ACTION:
      "https://" + LANGUAGE + ".wikipedia.org/w/api.php",
    ROOT_URL_WIKIPEDIA_REST:
      "https://" + LANGUAGE + ".wikipedia.org/api/rest_v1/page/",
    ROOT_URL_WIKIPEDIA_EN: "https://en.wikipedia.org/w/api.php",
    ROOT_URL_WIKIDATA: "https://query.wikidata.org/sparql",
    ROOT_URL_WIKICOMMON: "https://commons.wikimedia.org/w/api.php",
  },
  amount_data_fetched_items: 40,
  max_size_chunk_api: 40,
  amount_related: 10,
  amount_data_fetched_images: 10,
  max_width_image: 1400,
  min_width_image: 400,
  // search_min_length_search: 4,
};

export const GUI_CONFIG = {
  general: {
    max_width_mobile: 600,
  },
  language: Lang_fr,
  display: displayDesktop,
  paths: paths,
};
