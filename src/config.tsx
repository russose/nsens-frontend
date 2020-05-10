export const CONFIG_FETCHING = {
  URLs: {
    ROOT_URL_WIKIPEDIA: "https://fr.wikipedia.org/w/api.php",
    ROOT_URL_WIKIPEDIA_EN: "https://en.wikipedia.org/w/api.php",
    ROOT_URL_WIKICOMMON: "https://commons.wikimedia.org/w/api.php",
  },
  amount_data_fetched: 20,
  max_width_image: 2000,
  min_width_image: 120,
  path_empty_image: "The_Scientific_Universe_small.png",
  search_min_length_search: 4,
};

const CONFIG_GUI = {
  fr: {
    searchBar: "Recherche de connaissance",
    knowbooks_title: "Knowledge Books",
    empty_tag: "Vide",
    all_tags: "Tous",

    menuBar: [
      { label: "Acceuil", icon: "workflow-status-all" },
      { label: "Knowbooks", icon: "folder" },
      { label: "Se connecter", icon: "person" },
      { label: "More", icon: "ellipsis" },
    ],
    categories: {
      //Plus utilisés, à voir plus tard
      PLT: { label: "Planète", color: "green" },
      ECO: { label: "Économie", color: "blue" },
      INO: { label: "Innovation", color: "orchid" },
      POL: { label: "Politique", color: "darkGray" },
      HUM: { label: "Humain", color: "orange" },
      TBD: { label: "To be defined", color: "black" },
    },
  },
};

export const USER_GUI_CONFIG = CONFIG_GUI["fr"];

// A ajouter dans la config quand stabilisé
export const card_dim = 170;
export const size_icon = "xs";
export const padding_grid = 2;
export const title_card_size = "sm";
export const header_size = "md";

export const REFERENTIAL = {
  categories: [
    { id: "PLT" },
    { id: "ECO" },
    { id: "INO" },
    { id: "POL" },
    { id: "HUM" },
  ],
  languages: [
    { id: "fr", label: "Français" },
    { id: "en", label: "English" },
  ],
};
