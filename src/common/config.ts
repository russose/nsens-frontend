export const LANGUAGE = "fr";

export const CONFIG_FETCHING = {
  URLs: {
    ROOT_URL_WIKIPEDIA: "https://" + LANGUAGE + ".wikipedia.org/w/api.php",
    ROOT_URL_WIKIPEDIA_REST:
      "https://" + LANGUAGE + ".wikipedia.org/api/rest_v1/page/html/",
    ROOT_URL_WIKIPEDIA_EN: "https://en.wikipedia.org/w/api.php",
    ROOT_URL_WIKICOMMON: "https://commons.wikimedia.org/w/api.php",
  },
  amount_data_fetched_items: 20,
  amount_data_fetched_images: 20,
  max_width_image: 2000,
  min_width_image: 120,
  // search_min_length_search: 4,
  max_size_api: 40,
};

const CONFIG_GUI = {
  fr: {
    buttons: {
      HOME: { label: "Accueil", icon: "workflow-status-all", path: "/" },
      KNOWBOOKS: { label: "Carnets", icon: "folder", path: "/Knowbooks" },
      LOGIN: { label: "User", icon: "person", path: "/User" },
      VIZS: { label: "Vizs", icon: "compass", path: "" },
      ARTICLE: {
        label: "Article",
        icon: "text-align-left",
        path: "",
      },
    },
    knowbooks: {
      knowbooks_title: "Carnets de connaissance (Knowbooks)",
      AllSaved_title: "Sauvés (tous)",
      None_Title: "Aucun Carnet",
    },
    editKnowbook: {
      title: "Mise à jour des carnets",
      input_placeholder: "Nouveau Carnet",
    },
    renameDeleteKnowbook: {
      title: "Renommer un knowbook",
      rename_label: "Renommer",
      cancel_label: "Annuler",
    },
    loginSignup: {
      title: "Connexion et enregistrement",
      desciption:
        "Créer un compte permet de sauvegarder et d'organiser les éléments dans des carnets, pour les visualiser en contexte.",
      username_placeholder: "Email",
      password_placeholder: "Mot de passe",
      login_label: "Connexion",
      signup_label: "Enregistrement",
    },
    searchBar: "Rechercher...",
    WIKI_LAST_SECTION_HEADER: "Notes et références", //English: "References"
    USER_WIKIDATA_LANG: "fr",
  },
  display: {
    //card_height: 250,
    size_icon: "xs",
    title_card_size: "sm",
    header_size: "sm",
    colors: {
      //https://www.rapidtables.com/web/color/RGB_Color.html
      menu: "white",
      headers: "white",
      item_color_image: "rgb(220, 220, 220)",
      knowbook_color_image: "rgb(245, 245, 245)",
    },
    atom_sizes: {
      height: 250,
      image_ratio: "75%",
      lgColumn: 2,
      mdColumn: 3,
      smColumn: 4,
      column: 6,
      lgPadding: 6,
      mdPadding: 6,
      smPadding: 4,
      padding: 2,
    },
    knowbook_sizes: {
      height: 200,
      image_ratio: "80%",
      lgColumn: 2,
      mdColumn: 3,
      smColumn: 4,
      column: 6,
      lgPadding: 6,
      mdPadding: 6,
      smPadding: 4,
      padding: 2,
    },
    network: {
      node_size: 100,
      image_size: 45,
      max_title_size: 33,
    },
    paths: {
      // item_empty_image: "/The_Scientific_Universe_small.png",
      // knowbook_image: "/500px-Book_closed_template_small.svg.png",
      item_empty_image: "",
      knowbook_image: "",
      user_image: "/icon_user.jpg",
    },
  },
};

export const USER_GUI_CONFIG = CONFIG_GUI[LANGUAGE];
export const USER_DISPLAY = CONFIG_GUI["display"];

// export const REFERENTIAL = {
//   categories: [
//     { id: "PLT" },
//     { id: "ECO" },
//     { id: "INO" },
//     { id: "POL" },
//     { id: "HUM" },
//   ],
//   languages: [
//     { id: "fr", label: "Français" },
//     { id: "en", label: "English" },
//   ],
// };
