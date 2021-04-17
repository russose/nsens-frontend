import { paths } from "./configPaths";

export const Lang_fr = {
  searchBar: "Rechercher...",
  // WIKI_LAST_SECTION_HEADER: "Notes et références", //English: "References"
  // USER_WIKIDATA_LANG: "fr",
  landing: {
    // slogan: "Transformer l'information en connaissance universelle",
    slogan: "Explorer, Comprendre, Agir",
    description:
      "Entretenir le goût du vrai pour rester libre: \
      organiser ses connaissances dans des carnets accessibles partout \
      et se laisser transporter vers de nouvelles découvertes.",
    // features_title: "Fonctionalités",
    loginSignup: {
      username_placeholder: "Email",
      password_placeholder: "Mot de passe",
      missing_password_text: "Mot de passe oublié ?",
      login_label: "Connexion",
      signup_label: "Enregistrement",
      login_error: "Nom d'utilisateur ou mot de passe incorect",
      signup_error: "Impossible de créer le compte",
      signup_error_duration:
        "Rafraîchir la page, remplir les champs et attendre quelques secondes avant de s'enregistrer",
    },
    features: [
      {
        title: "Trouver",
        description: "Trouver de la connaissance de façon visuelle et ludique",
        icon: "search",
      },
      {
        title: "Comprendre",
        description: "Comprendre grâce à l'information libre de la Wikipédia",
        icon: "text-align-left",
      },
      {
        title: "Rassembler",
        description:
          "Rassembler ses trouvailles dans des carnets personnalisés",
        icon: "folder",
      },
      {
        title: "Explorer",
        description:
          "Explorer de nouveaux horizons et faire des découvertes grâces aux nombreuses suggestions",
        icon: "compass",
      },
    ],
  },
  buttons: {
    HOME: {
      label: "Accueil",
      icon: "workflow-status-all",
      path: paths.pages.Home,
    },
    KNOWBOOKS: {
      label: "Carnets",
      icon: "folder",
      path: paths.pages.Knowbooks,
    },
    LOGIN: { label: "User", icon: "person", path: paths.pages.User },
    INFO: { label: "Info", icon: "question-mark", path: paths.pages.Landing },
    SAVE: { label: "Sauver", icon: "angled-pin", path: paths.pages.empty },
    EDIT: { label: "Modifier", icon: "edit", path: paths.pages.empty },
    ARTICLE: {
      label: "Article",
      icon: "text-align-left",
      path: paths.pages.ItemArticle,
    },
    VIZS: { label: "Vizs", icon: "compass", path: paths.pages.ItemNetwork },
  },
  knowbooks: {
    knowbooks_title: "Carnets de connaissance",
    AllSaved_title: "Sauvés (tous)",
    None_Title: "Aucun Carnet",
    Related_title: "Suggérés :",
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
  changePassword: {
    title: "Modifier votre mot de passe",
    password_placeholder: "Nouveau mot de passe",
    placeholder_validationCode: "Code de vérification reçu par email",
    label_sendValidationCode: "1-Recevoir code validation",
    label_changePassword: "2-Changer mot de passe",
    sendValidationCode_error: "Email incorrect",
    sendValidationCode_success:
      "Code de validation envoyé par mail (vérifier spams)",
    changePassword_error: "Code de validation incorrect ou mot de passe vide",
  },
  user: {
    contact: "Contacts",
    install_instructions:
      "Installer pour une meilleure expérience (Chrome/Safari)",
    deconnexion: "Se déconnecter",
    changePassword: "Modifier mot de passe",
  },
};
