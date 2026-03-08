import { TButtonID, Tlanguage, TPages, TKnowbooksPages } from "./globals";

export const configDataFr = {
  historyNavigation: "Historique",
  // historyNavigation: "Fil d'Ariane",
  source_wikipedia: "Source: Wikipedia",
  source_arxiv: "Source: Arxiv",
  legend: "Légende:",
  moreBestKnowbooksLabel: "Plus",
  // sharingURL_Base: "URL copiée dans le presse papier: ",
  search: {
    searchBar: "Rechercher...",
    control_wiki: "Wiki",
    control_books: "Livres",
    control_arxiv: "Arxiv",
    control_knowbooks: "Carnets",
  },
  network: {
    nodeNameWikidata: "Wikidata",
    nodeNameWikipedia: "Wikipedia",
    nodeNameForPublicKnowbooks: "Carnets suggérés",
    nodeNameForArxivItems: "Papiers de recherche",
    nodeNameForBooksItems: "Livres",
    nodeNameForContentKnowbooks: "Contient",
  },
  // tryButton: "Essayer nSens",
  knowbooks: {
    // knowbookFeatured: "Top",
    // knowbookFollowedPublic: "Sauvées",
    // knowbookUser: "Mes carnets",
    privateLabel: " (privé)",
  },
  SEO: {
    // canonical: "https://www.nsens.org/fr/Mobile/About/",
    // title_page_base: "nSens - Explorer la Connaissance libre autrement",
    title_page_base:
      "nSens : Dynamisez le partage de connaissances avec des graphiques interactifs et des carnets de notes.",
    description_page_base:
      "Découvrez la puissance de nSens, la plateforme novatrice qui vous permet de créer et de partager facilement des carnets de notes interactifs et des graphiques interactifs. Organisez vos idées, vos données et vos ressources de manière fluide dans des carnets de connaissance personnalisables. Gardez votre contenu privé ou partagez les avec votre communauté. Libérez le potentiel de l'apprentissage collaboratif et de l'échange de connaissances grâce à nSens.",
    title_description: {
      [TPages.Home]: { title: "Meilleurs Carnets", description: "" },
      [TPages.KnowbooksSaved]: { title: "Carnets Suivis", description: "" },
      [TPages.KnowbooksMine]: { title: "Mes Carnets", description: "" },
      // [TPages.About]: {
      //   title: "Information",
      //   description: "",
      // },
      [TPages.User]: { title: "", description: "" },
      [TPages.ChangePassword]: {
        title: "Modifier votre mot de passe",
        description: "",
      },
      [TPages.ItemNetwork]: { title: "", description: "" },
      // [TPages.StaticKnowbook]: { title: "", description: "" },
      [TPages.Knowbooks]: { title: "", description: "" },
      [TPages.Knowbook]: { title: "", description: "" },
      // [TPages.Random]: { title: "", description: "" },
      [TPages.KnowbookSpecial]: {
        [TKnowbooksPages.Mostviewed]: { title: "Aujourd'hui", description: "" },
        [TKnowbooksPages.AllSaved]: {
          title: "Sauvegardés (tous)",
          description: "",
        },
        // [TKnowbooksPages.NoKnowbook]: {
        //   title: "Sans carnet",
        //   description: "",
        // },
      },
    },
  },
  buttons_all_label: {
    [TButtonID.HOME]: {
      label: "Accueil",
    },
    [TButtonID.KNOWBOOKS_BEST]: {
      label: "Top",
    },
    [TButtonID.KNOWBOOK_FOLLOWED]: {
      label: "Suivis",
    },
    [TButtonID.KNOWBOOK_MINE]: {
      label: "Personnels",
    },
    [TButtonID.SEARCH]: {
      label: "Recherche",
    },
    [TButtonID.LOGIN]: {
      label: "User",
    },
    [TButtonID.INFO]: {
      label: "Info",
    },
    [TButtonID.BACK]: {
      label: "Retour",
    },
    [TButtonID.FOLLOW_PUBLIC]: {
      label: "Sauver",
    },
    [TButtonID.EDIT_CONTENT]: {
      label: "Modifier",
    },
    [TButtonID.ARTICLE]: {
      label: "Wikipedia",
    },
    [TButtonID.NETWORK]: {
      label: "Réseau",
    },
    [TButtonID.HISTORY]: {
      // label: "Fil d'Ariane",
      label: "Historique",
    },
    [TButtonID.EDIT_USER]: {
      label: "Modifier",
    },
    [TButtonID.LOGOUT]: {
      label: "Se déconnecter",
    },
  },
  arxiv_Details: {
    header: "Détail de l'article de recherche",
    title: "Titre:",
    Author: "Auteurs:",
    summary: "Résumé:",
    more_info: "Plus de détails",
    download: "Télécharger le pdf",
  },
  books_Details: {
    header: "Détail du livre",
    title: "Titre:",
    Author: "Auteurs:",
    summary: "Résumé:",
    more_info: "Détails (Amazon)",
    // download: "Télécharger le pdf",
  },
  knowbooks_User: {
    Related_title: "A découvrir :",
  },
  knowbooks_Featured: {
    // knowbooks_title: "Sélection",
  },
  editKnowbook: {
    title: "Ranger dans des carnets: ",
    input_placeholder: "Nouveau carnet",
  },
  editKnowbookProps: {
    heading: "Propriétés du carnet",
    nameLabel: "Nom",
    descriptionLabel: "Description",
    nameSource: "En savoir plus",
    imageLabel: "Image",
    shareLabelTitle: "Visibilité",
    shareLabelPublic: "Carnet Publique",
    shareLabelPrivate: "Carnet Privé",
    deletionLabel: "Supprimer",
    deletionLabelConfirmation: "Supprimer avec tous les éléments?",
  },
  renameDeleteKnowbook: {
    title: "Renommer le carnet",
    rename_label: "Renommer",
    cancel_label: "Annuler",
  },
  editUserProps: {
    username: "Nom utilisateur",
    email: "Email",
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
  social: {
    title: "Lien à partager",
    description_base: "nSens - Element partagé avec vous: ",
  },
  user: {
    guest: "Enregistrement - Connexion",
    contact: "Contact",
    // install_instructions:
    //   "Installer pour une meilleure expérience (Chrome/Safari)",
    // deconnexion: "Se déconnecter",
    modification: "Mettre à jour",
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
