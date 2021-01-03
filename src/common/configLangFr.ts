import { paths } from "./configPaths";

export const Lang_fr = {
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
    knowbooks_title: "Carnets de connaissance (Knowbooks)",
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
  loginSignup: {
    // title: "Connexion et enregistrement",
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
};
