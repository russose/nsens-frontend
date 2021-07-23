import { ConfigLanguage, ICONS } from "./globals";

export const configDataFr = {
  searchBar: "Rechercher...",
  source_wikipedia: "Source: Wikipedia",
  SEO: {
    canonical: "https://www.nsens.org/fr/Mobile/About/",
    title_page_base: "n.Sens",
  },
  about: {
    slogan:
      "Explorer, comprendre, agir. Entretenir le goût du vrai et se laisser transporter...",
    features: [
      {
        title: "Trouver",
        description:
          "Trouver des articles Wikipedia de façon visuelle et ludique",
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
    HOME: {
      label: "Accueil",
      icon: ICONS.HOME,
    },
    KNOWBOOKS: {
      label: "Carnets",
      icon: ICONS.KNOWBOOKS,
    },
    LOGIN: {
      label: "User",
      icon: ICONS.LOGIN,
    },
    INFO: {
      label: "Info",
      icon: ICONS.INFO,
    },
    SAVE: {
      label: "Sauver",
      icon: ICONS.SAVE,
    },
    EDIT: {
      label: "Modifier",
      icon: ICONS.EDIT,
    },
    ARTICLE: {
      label: "Article",
      icon: ICONS.ARTICLE,
    },
    VIZS: {
      label: "Vizs",
      icon: ICONS.VIZS,
    },
  },
  knowbooks: {
    knowbooks_title: "Carnets",
    AllSaved_title: "Sauvés (tous)",
    None_Title: "Aucun Carnet",
    Related_title: "A découvrir :",
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
    guest: "Enregistrement - Connexion",
    contact: "Contact",
    install_instructions:
      "Installer pour une meilleure expérience (Chrome/Safari)",
    deconnexion: "Se déconnecter",
    changePassword: "Modifier mot de passe",
    catchup_message:
      "Enregistrez-vous pour sauvegardez votre contenu et personnaliser votre expérience",
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
      [ConfigLanguage.fr]: "Francais",
      [ConfigLanguage.it]: "Italien",
      [ConfigLanguage.en]: "Anglais",
    },
  },
};
