import { Tlanguage, ICONS, TButtonID, TPages } from "./globals";

export const configDataFr = {
  searchBar: "Rechercher...",
  source_wikipedia: "Source: Wikipedia",
  SEO: {
    // canonical: "https://www.nsens.org/fr/Mobile/About/",
    title_page_base: "n.Sens - Explorer la Connaissance libre autrement",
    descirption_page_base:
      "n.Sens est une plateforme autour de la connaissance libre",
    title_description: {
      [TPages.Home]: { title: "Accueil", description: "" },
      [TPages.About]: {
        title: "Information",
        description: "",
      },
      [TPages.User]: { title: "", description: "" },
      [TPages.ChangePassword]: {
        title: "Modifier votre mot de passe",
        description: "",
      },
      [TPages.ItemArticle]: { title: "", description: "" },
      [TPages.ItemNetwork]: { title: "", description: "" },
      [TPages.StaticArticle]: { title: "", description: "" },
      [TPages.Knowbooks_Featured]: {
        title: "Carnets indispensables",
        description: "",
      },
      [TPages.StaticKnowbook]: { title: "", description: "" },
      [TPages.Knowbooks_User]: { title: "Mes Carnets", description: "" },
      [TPages.Knowbook]: { title: "", description: "" },
      [TPages.KnowbookSaved]: {
        title: "Sauvegardés (tous)",
        description: "",
      },
      [TPages.KnowbookNone]: { title: "Sans carnet", description: "" },
      [TPages.KnowbookMostviewed]: {
        title: "Aujourd'hui",
        description: "",
      },
    },
  },
  about: {
    // slogan:
    //   "Explorer, comprendre, agir. Entretenir le goût du vrai et se laisser transporter...",
    // slogan: "Explorer la Connaissance Libre autrement",
    features: [
      {
        title: "Trouver",
        description:
          "Trouver des articles Wikipedia avec des cartes et des graphes, de façon visuelle et ludique",
        icon: "search",
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
          "Explorer de nouveaux horizons et faire des découvertes grâces aux suggestions de la plateforme",
        icon: "compass",
      },
    ],
  },
  buttons: {
    [TButtonID.HOME]: {
      label: "Accueil",
      icon: ICONS.HOME,
    },
    [TButtonID.KNOWBOOKS_USER]: {
      label: "Carnets",
      icon: ICONS.KNOWBOOKS,
    },
    [TButtonID.KNOWBOOKS_FEATURED]: {
      label: "Sélection",
      icon: ICONS.FEATURED,
    },
    [TButtonID.LOGIN]: {
      label: "User",
      icon: ICONS.LOGIN,
    },
    [TButtonID.INFO]: {
      label: "Info",
      icon: ICONS.INFO,
    },
    [TButtonID.SAVE]: {
      label: "Sauver",
      icon: ICONS.SAVE,
    },
    [TButtonID.EDIT]: {
      label: "Modifier",
      icon: ICONS.EDIT,
    },
    [TButtonID.ARTICLE]: {
      label: "Wikipedia",
      icon: ICONS.ARTICLE,
    },
    [TButtonID.VIZS]: {
      label: "Vizs",
      icon: ICONS.VIZS,
    },
    [TButtonID.SEPARATOR]: {
      label: "",
      icon: ICONS.SEPARATOR,
    },
  },
  knowbooks_User: {
    // knowbooks_title: "Mes Carnets",
    // AllSaved_title: "Sauvés (tous)",
    // None_Title: "Aucun Carnet",
    Related_title: "A découvrir :",
  },
  knowbooks_Featured: {
    // knowbooks_title: "Sélection",
  },
  editKnowbook: {
    title: "Mise à jour des carnets",
    input_placeholder: "Nouveau Carnet",
  },
  renameDeleteKnowbook: {
    title: "Renommer un carnet",
    rename_label: "Renommer",
    cancel_label: "Annuler",
  },
  changePassword: {
    // title: "Modifier votre mot de passe",
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
    guest: "Enregistrement - Connexion",
    contact: "Contact",
    install_instructions:
      "Installer pour une meilleure expérience (Chrome/Safari)",
    deconnexion: "Se déconnecter",
    changePassword: "Modifier mot de passe",
    catchup_message:
      "Créer un compte pour sauvegardez votre contenu et personnaliser votre expérience",
    loginSignup: {
      username_placeholder: "Email",
      password_placeholder: "Mot de passe",
      missing_password_text: "Mot de passe oublié ?",
      login_label: "Connexion",
      signup_label: "Enregistrement",
      login_error: "Nom d'utilisateur ou mot de passe incorrect",
      signup_error: "Impossible de créer le compte",
      signup_error_duration:
        "Rafraîchir la page, remplir les champs et attendre quelques secondes avant de s'enregistrer",
    },
    languages: {
      [Tlanguage.fr]: "Francais",
      [Tlanguage.it]: "Italien",
      [Tlanguage.en]: "Anglais",
    },
  },
};
