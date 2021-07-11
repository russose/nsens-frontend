export const configDataFr = {
  searchBar: "Rechercher...",
  // exclusion_patterns_items: ["Acceuilxx:", "Portailxx:"],
  // WIKI_LAST_SECTION_HEADER: "Notes et références", //English: "References"
  // USER_WIKIDATA_LANG: "fr",
  SEO: {
    canonical: "https://www.nsens.org/fr/Mobile/About/",
    title_page_base: "n.Sens",
  },
  about: {
    slogan:
      "Explorer, comprendre, agir. Entretenir le goût du vrai et se laisser transporter...",
    // description:
    //   "Entretenir le goût du vrai pour rester libre: \
    //   organiser ses connaissances dans des carnets accessibles partout \
    //   et se laisser transporter vers de nouvelles découvertes.",
    features: [
      {
        title: "Trouver",
        description:
          "Trouver des articles Wikipedia de façon visuelle et ludique",
        icon: "search",
      },
      // {
      //   title: "Comprendre",
      //   description: "Comprendre grâce à l'information libre",
      //   icon: "text-align-left",
      // },
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
      icon: "workflow-status-all",
    },
    KNOWBOOKS: {
      label: "Carnets",
      icon: "folder",
    },
    LOGIN: {
      label: "User",
      icon: "person",
    },
    INFO: {
      label: "Info",
      icon: "question-mark",
    },
    SAVE: {
      label: "Sauver",
      icon: "heart",
    },
    EDIT: {
      label: "Modifier",
      icon: "download",
    },
    ARTICLE: {
      label: "Article",
      icon: "menu",
    },
    VIZS: {
      label: "Vizs",
      icon: "globe",
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
      login_error: "Nom d'utilisateur ou mot de passe incorect",
      signup_error: "Impossible de créer le compte",
      signup_error_duration:
        "Rafraîchir la page, remplir les champs et attendre quelques secondes avant de s'enregistrer",
    },
  },
};
