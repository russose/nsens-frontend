import { Lang_fr } from "./configLangFr";
import { displayMobile } from "./configMobile";
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
  amount_data_fetched_items: 50,
  max_size_chunk_api: 40,
  amount_related: 10,
  amount_data_fetched_images: 10,
  max_width_image: 1300,
  min_width_image: 400,
  // search_min_length_search: 4,
};

export const GUI_CONFIG = {
  id: "",
  general: {
    language: LANGUAGE,
    max_width_mobile: 640,
    large_screen_breakpoint: 2000,
    tiny_screen_breakpoint: 320,
    colors: {
      //https://www.rapidtables.com/web/color/RGB_Color.html
      top: "green",
      background: "navy",
      item_color: "olive",
      knowbook_color: "olive",
      menu: "white",

      // features: "green",
      item_compact_color: "white",
      dialog: "white",
      headers: "white",
      item_color_image: "rgb(220, 220, 220)",
      knowbook_color_image: "rgb(245, 245, 245)",
    },
  },
  language: Lang_fr,
  display: displayMobile,
  paths: paths,
};

// --g-green: var(--color1);
// --g-navy: var(--color2);
// --g-olive: var(--color3);
// --g-pine: var(--color4);
