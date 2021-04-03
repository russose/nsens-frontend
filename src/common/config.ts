import { getEmail } from "../libs/utils";

export const successMessage = "you can now login...";
export const loginDuration = 4000;

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
  userAgent: "n.Sens/1.0 (https://www.nsens.org; " + getEmail() + ")",
  amount_data_fetched_items: 30,
  max_size_chunk_api: 40,
  amount_related: 10,
  amount_data_fetched_images: 10,
  max_width_image: 1300,
  min_width_image: 400,
};
