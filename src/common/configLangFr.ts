import { paths } from "./configPaths";

export const Lang_fr = {
  landing: {
    slogan: "Transformer l'information libre en connaissances",
    features_title: "Fonctionalités",
    loginSignup: {
      username_placeholder: "Email",
      password_placeholder: "Mot de passe",
      login_label: "Connexion",
      signup_label: "Enregistrement",
    },
    features: [
      {
        title: "Explorer visuellement l'information librement disponible",
        icon: "search",
      },
      { title: "Enregistrer et retrouver ses élements", icon: "angled-pin" },
      { title: "Organiser dans des carnets", icon: "folder" },
      {
        title: "Découvrir les éléments associés et leur contexte",
        icon: "compass",
      },
    ],
  },
  buttons: {
    HOME: {
      label: "Accueil",
      icon: "search",
      path: paths.pages.Home,
    },
    KNOWBOOKS: {
      label: "Carnets",
      icon: "folder",
      path: paths.pages.Knowbooks,
    },
    LOGIN: { label: "User", icon: "person", path: paths.pages.User },
    SAVE: { label: "Sauver", icon: "angled-pin", path: paths.pages.empty },
    EDIT: { label: "Modifier", icon: "edit", path: paths.pages.empty },
    VIZS: { label: "Vizs", icon: "compass", path: paths.pages.empty },
    ARTICLE: {
      label: "Article",
      icon: "text-align-left",
      path: paths.pages.empty,
    },
  },
  knowbooks: {
    knowbooks_title: "Carnets de connaissance",
    AllSaved_title: "Sauvés (tous)",
    None_Title: "Aucun Carnet",
    Related_title: "Related :",
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

  searchBar: "Rechercher...",
  WIKI_LAST_SECTION_HEADER: "Notes et références", //English: "References"
  USER_WIKIDATA_LANG: "fr",
};
