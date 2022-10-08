import { CUSTOM_ICONS } from "./configLocalAndEnv";
import { Tlanguage, ICONS, TButtonID, TPages, TSpecialPages } from "./globals";

export const configDataFr = {
  searchBar: "Rechercher...",
  historyNavigation: "Fil d'Ariane",
  source_wikipedia: "Source: Wikipedia",
  legend: "Légende:",
  // tryButton: "Essayer nSens",
  labels: {
    knowbookUser: "Mes collections",
    knowbookFeatured: "Explorer",
  },
  SEO: {
    // canonical: "https://www.nsens.org/fr/Mobile/About/",
    // title_page_base: "nSens - Explorer la Connaissance libre autrement",
    title_page_base:
      "nSens - nSens permet d'ajouter une nouvelle dimension à la Wikipedia en naviguant visuellement dans les cartes de Connaissance de la Wikipedia. Un voyage sans limite, de découvertes en découvertes.",
    description_page_base:
      "nSens - nSens permet d'ajouter une nouvelle dimension à la Wikipedia en naviguant visuellement dans les cartes de Connaissance de la Wikipedia. Un voyage sans limite, de découvertes en découvertes.",
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
      [TPages.ItemCircle]: { title: "", description: "" },
      [TPages.ItemNetwork]: { title: "", description: "" },
      [TPages.StaticKnowbook]: { title: "", description: "" },
      [TPages.Knowbooks]: { title: "", description: "" },
      [TPages.Knowbook]: { title: "", description: "" },
      [TPages.Random]: { title: "", description: "" },
      [TPages.KnowbookSpecial]: {
        [TSpecialPages.Mostviewed]: { title: "Aujourd'hui", description: "" },
        [TSpecialPages.AllSaved]: {
          title: "Sauvegardés (tous)",
          description: "",
        },
        [TSpecialPages.NoKnowbook]: {
          title: "Sans collection",
          description: "",
        },
      },
    },
  },
  about: {
    // scenario_texts: {
    //   [TScenarioStepID.Home]:
    //     "Tourner la balle bleu pour faire défiler les élements",
    //   [TScenarioStepID.knowbook]:
    //     "Créer des collections personnalisées grâce à tes découvertes avec: ",
    //   [TScenarioStepID.mostviewed]:
    //     "Voir les élements les plus populaires avec la collection du jour",
    //   [TScenarioStepID.search]: "Rechercher rapidement des éléments",
    //   [TScenarioStepID.itemCircle]:
    //     "Naviguer et explorer les relations pour faire de nouvelles découvertes",
    //   [TScenarioStepID.itemArticle]:
    //     "Accéder au contenu de chaque élément de la Wikipedia avec: ",
    //   [TScenarioStepID.language]: "Plusieurs langues sont supportées",
    //   [TScenarioStepID.home]:
    //     "Bon voyage dans notre connaissance sans limite...",
    // },
  },
  buttons: {
    [TButtonID.BACK]: {
      label: "Retour",
      icon: CUSTOM_ICONS.BACK,
    },
    [TButtonID.HOME]: {
      label: "Accueil",
      icon: CUSTOM_ICONS.HOME,
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
    // [TButtonID.CIRCLE]: {
    //   label: "Orbite",
    //   icon: CUSTOM_ICONS.CIRCLE,
    // },
    [TButtonID.NETWORK]: {
      label: "Réseau",
      icon: CUSTOM_ICONS.NETWORK,
    },
    [TButtonID.NETWORKFLAT]: {
      label: "Liste",
      icon: CUSTOM_ICONS.NETWORKFLAT,
    },
    [TButtonID.KNOWBOOKS]: {
      label: "Collections",
      icon: ICONS.KNOWBOOKS,
    },
    [TButtonID.KNOWBOOK]: {
      label: "Overview",
      icon: ICONS.KNOWBOOK,
    },
    [TButtonID.SEPARATOR]: {
      label: "",
      icon: ICONS.SEPARATOR,
    },
    [TButtonID.ARTICLE_BACK]: {
      label: "",
      icon: ICONS.ARTICLE_BACK,
    },
    [TButtonID.ARTICLE_NEXT]: {
      label: "",
      icon: ICONS.ARTICLE_NEXT,
    },
    [TButtonID.HISTORY]: {
      label: "Fil d'Ariane",
      icon: CUSTOM_ICONS.HISTORY,
    },
  },
  knowbooks_User: {
    Related_title: "A découvrir :",
  },
  knowbooks_Featured: {
    // knowbooks_title: "Sélection",
  },
  editKnowbook: {
    title: "Mise à jour des collections",
    input_placeholder: "Nouvelle collection",
  },
  renameDeleteKnowbook: {
    title: "Renommer une collection",
    rename_label: "Renommer",
    cancel_label: "Annuler",
  },
  changePassword: {
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
    social: "Partager",
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
