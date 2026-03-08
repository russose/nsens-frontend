import {
  TButtonID,
  TconfigDataLanguage,
  Tlanguage,
  TPages,
  TKnowbooksPages,
} from "./globals";

export const configDataIt: TconfigDataLanguage = {
  historyNavigation: "Cronologia",
  source_wikipedia: "Sorgente: Wikipedia",
  source_arxiv: "Sorgente: Arxiv",
  legend: "Leggenda:",
  moreBestKnowbooksLabel: "Più",
  // sharingURL_Base: "Link incollato nel clipboard: ",
  search: {
    searchBar: "Cerca...",
    control_wiki: "Wiki",
    control_books: "Libri",
    control_arxiv: "Arxiv",
    control_knowbooks: "Raccolte",
  },
  network: {
    nodeNameWikidata: "Wikidata",
    nodeNameWikipedia: "Wikipedia",
    nodeNameForPublicKnowbooks: "Raccolte suggerite",
    nodeNameForArxivItems: "Articoli scientifici",
    nodeNameForBooksItems: "Libri",
    nodeNameForContentKnowbooks: "Contiene",
  },
  knowbooks: {
    // knowbookFeatured: "Top",
    // knowbookFollowedPublic: "Salvati",
    privateLabel: " (privato)",
  },
  SEO: {
    // canonical: "https://www.nsens.org/it/Mobile/About/",
    title_page_base:
      "nSens: Potenzia la condivisione delle conoscenze con grafici interattivi e quaderni.",
    description_page_base:
      "Scopri la potenza di nSens, la piattaforma innovativa che ti permette di costruire e condividere facilmente quaderni di conoscenza e grafici interattivi. Organizza le tue risorse in modo fluido all'interno di quaderni personalizzabili. Mantieni riservati i tuoi contenuti o coinvolgi la tua comunità condividendoli. Sblocca il potenziale dell'apprendimento collaborativo e dello scambio di conoscenze con nSens.",
    title_description: {
      [TPages.Home]: { title: "Migliori Raccolte", description: "" },
      [TPages.KnowbooksSaved]: { title: "Raccolte Seguite", description: "" },
      [TPages.KnowbooksMine]: { title: "Le Miei Raccolte", description: "" },
      // [TPages.About]: {
      //   title: "Informazione",
      //   description: "",
      // },
      [TPages.User]: { title: "", description: "" },
      [TPages.ChangePassword]: {
        title: "Modifica la password",
        description: "",
      },
      [TPages.ItemNetwork]: { title: "", description: "" },
      [TPages.Knowbooks]: { title: "", description: "" },
      // [TPages.StaticKnowbook]: { title: "", description: "" },
      [TPages.Knowbook]: { title: "", description: "" },
      // [TPages.Random]: { title: "", description: "" },
      [TPages.KnowbookSpecial]: {
        [TKnowbooksPages.Mostviewed]: { title: "Oggi", description: "" },
        [TKnowbooksPages.AllSaved]: {
          title: "Salvati (tutti)",
          description: "",
        },
        // [TKnowbooksPages.NoKnowbook]: {
        //   title: "Senza carnetto",
        //   description: "",
        // },
      },
    },
  },
  buttons_all_label: {
    [TButtonID.HOME]: {
      label: "Home",
    },
    [TButtonID.KNOWBOOKS_BEST]: {
      label: "Top",
    },
    [TButtonID.KNOWBOOK_FOLLOWED]: {
      label: "Seguiti",
    },
    [TButtonID.KNOWBOOK_MINE]: {
      label: "Personali",
    },
    [TButtonID.SEARCH]: {
      label: "Ricerca",
    },
    [TButtonID.LOGIN]: {
      label: "Utente",
    },
    [TButtonID.INFO]: {
      label: "Info",
    },
    [TButtonID.BACK]: {
      label: "Indietro",
    },
    [TButtonID.FOLLOW_PUBLIC]: {
      label: "Salva",
    },
    [TButtonID.EDIT_CONTENT]: {
      label: "Modifica",
    },
    [TButtonID.ARTICLE]: {
      label: "Wikipedia",
    },
    [TButtonID.NETWORK]: {
      label: "Rete",
    },
    // [TButtonID.NETWORKFLAT]: {
    //   label: "Elenco",
    // },
    [TButtonID.HISTORY]: {
      label: "Cronologia",
    },
    [TButtonID.EDIT_USER]: {
      label: "Aggiornare",
    },
    [TButtonID.LOGOUT]: {
      label: "Disconnetti",
    },
  },
  arxiv_Details: {
    header: "Dettagli dell'articolo di ricerca",
    title: "Titolo:",
    Author: "Autori:",
    summary: "Riassunto:",
    more_info: "Ulteriori informazioni",
    download: "Scarica il pdf",
  },
  books_Details: {
    header: "Dettagli del libro",
    title: "Titolo:",
    Author: "Autori:",
    summary: "Riassunto:",
    more_info: "Informazione (Amazon)",
    // download: "Scarica il pdf",
  },
  knowbooks_User: {
    Related_title: "Da scoprire :",
  },
  knowbooks_Featured: {
    knowbooks_title: "Selezione",
  },
  editKnowbook: {
    title: "Conserva in raccolte: ",
    input_placeholder: "Nuova raccolta",
  },
  editKnowbookProps: {
    heading: "Proprietà della raccolta",
    nameLabel: "Nome",
    descriptionLabel: "Descrizione",
    nameSource: "Per saperne di più",
    imageLabel: "Immagine",
    shareLabelTitle: "Visibilità",
    shareLabelPublic: "Raccolta Pubblica",
    shareLabelPrivate: "Raccolta Privata",
    deletionLabel: "Rimuovere ",
    deletionLabelConfirmation: "Rimuovere con tutti gli elementi?",
  },
  renameDeleteKnowbook: {
    title: "Rinomina una raccolta",
    rename_label: "Rinomina",
    cancel_label: "Annulla",
  },
  editUserProps: {
    username: "Nome utente",
    email: "Email",
  },
  changePassword: {
    password_placeholder: "Nuova password",
    placeholder_validationCode: "Codice di convalida ricevuto per email",
    label_sendValidationCode: "1-Recevi il codice di convalida",
    label_changePassword: "2-Cambia la password",
    sendValidationCode_error: "Email non corretta",
    sendValidationCode_success:
      "Codice di convalida inviato all'indirizzo mail (controllare spam)",
    changePassword_error: "Codice di convalida incorretto o password vuota",
  },
  social: {
    title: "Link da condividere",
    description_base: "nSens - Elemento condiviso con te: ",
  },
  user: {
    guest: "Registrazione - Login",
    contact: "Contatto",
    // install_instructions: "Installa per un'esperienza ottimale (Chrome/Safari)",
    // deconnexion: "Disconnetti - Logout",
    modification: "Aggiornare",
    changePassword: "Modifica la password",
    catchup_message:
      "Registrati per poter personalizzare e salvare la tua esperienza",
    loginSignup: {
      username_placeholder: "Email",
      password_placeholder: "Password",
      missing_password_text: "Password dimenticata?",
      login_label: "Accedi",
      signup_label: "Registrati",
      login_error: "Nome utente o password errata",
      signup_error: "Impossibile effettuare la registrazione",
      signup_error_duration:
        "Riscarigare la paggina, riempire i campi et aspettare qualque secondi prima di registrarsi",
    },
    languages: {
      [Tlanguage.fr]: "Francese",
      [Tlanguage.it]: "Italiano",
      [Tlanguage.en]: "Inglese",
    },
  },
};
