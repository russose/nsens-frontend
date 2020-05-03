export const CONFIG_FETCHING = {
  URLs: {
    ROOT_URL_WIKIPEDIA: "https://fr.wikipedia.org/w/api.php",
  },
  amount_data_fetched: 20,
};

export const CONFIG_GUI = {
  fr: {
    searchBar: {
      placeholder: "rechercher dans les atomes de connaissance",
    },
    menuBar: [
      { label: "Acceuil", icon: "workflow-status-all" },
      { label: "Knowbooks", icon: "folder" },
      { label: "Se connecter", icon: "person" },
      { label: "More", icon: "ellipsis" },
    ],
    categories: {
      PLT: { label: "Planète", color: "green" },
      ECO: { label: "Économie", color: "blue" },
      INO: { label: "Innovation", color: "orchid" },
      POL: { label: "Politique", color: "darkGray" },
      HUM: { label: "Humain", color: "orange" },
      TBD: { label: "To be defined", color: "black" },
    },
  },
  all: { SEARCH_MIN_LENGTH_SEARCH: 4 },
};

export const USER_GUI_CONFIG = CONFIG_GUI["fr"];

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
