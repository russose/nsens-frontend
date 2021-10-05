import {
  TconfigDataLanguage,
  Tlanguage,
  ICONS,
  TButtonID,
  TPages,
} from "./globals";

export const configDataIt: TconfigDataLanguage = {
  searchBar: "Cerca...",
  source_wikipedia: "Sorgente: Wikipedia",
  SEO: {
    // canonical: "https://www.nsens.org/it/Mobile/About/",
    title_page_base: "n.Sens - Esplora la conoscenza libera in un modo nuovo",
    descirption_page_base: "???",
    title_description: {
      [TPages.Home]: { title: "Home", description: "" },
      [TPages.About]: {
        title: "Informazione",
        description: "",
      },
      [TPages.User]: { title: "", description: "" },
      [TPages.ChangePassword]: {
        title: "Modifica la password",
        description: "",
      },
      [TPages.ItemArticle]: { title: "", description: "" },
      [TPages.ItemNetwork]: { title: "", description: "" },
      [TPages.StaticArticle]: { title: "", description: "" },
      [TPages.Knowbooks_Featured]: {
        title: "Documenti essenziali",
        description: "",
      },
      [TPages.StaticKnowbook]: { title: "", description: "" },
      [TPages.Knowbooks_User]: {
        title: "I Miei Documenti",
        description: "",
      },
      [TPages.Knowbook]: { title: "", description: "" },
      [TPages.KnowbookSaved]: { title: "Salvati (tutti)", description: "" },
      [TPages.KnowbookNone]: { title: "Senza Documento", description: "" },
    },
  },
  about: {
    // slogan:
    //   "Esplorare, capire, agire. Lasciarsi trasportare gustandosi la ricerca...",
    // slogan: "Esplora la conoscenza libera in un modo nuovo",
    features: [
      {
        title: "Trova",
        description:
          "Trova e vizualizza articoli Wikipedia in modo divertente, con grafici e schede",
        icon: "search",
      },
      {
        title: "Raccolta",
        description: "Raccogli in documenti personalizzati le tue ricerche",
        icon: "folder",
      },
      {
        title: "Esplora",
        description:
          "Esplora nuovi orizzonti e fai nuove scoperte grazie alla suggestiva piattaforma",
        icon: "compass",
      },
    ],
  },
  buttons: {
    [TButtonID.HOME]: {
      label: "Home",
      icon: ICONS.HOME,
    },
    [TButtonID.KNOWBOOKS_USER]: {
      label: "Documenti",
      icon: ICONS.KNOWBOOKS,
    },
    [TButtonID.KNOWBOOKS_FEATURED]: {
      label: "Speciale",
      icon: ICONS.FEATURED,
    },
    [TButtonID.LOGIN]: {
      label: "Utente",
      icon: ICONS.LOGIN,
    },
    [TButtonID.INFO]: {
      label: "Info",
      icon: ICONS.INFO,
    },
    [TButtonID.SAVE]: {
      label: "Salva",
      icon: ICONS.SAVE,
    },
    [TButtonID.EDIT]: {
      label: "Modifica",
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
    // knowbooks_title: "I Miei Documenti",
    // AllSaved_title: "Salvati (tutti)",
    // None_Title: "Nessun Documento",
    Related_title: "Da scoprire :",
  },
  knowbooks_Featured: {
    knowbooks_title: "Selezione",
  },
  editKnowbook: {
    title: "Aggiorna documenti",
    input_placeholder: "Nuovo Documento",
  },
  renameDeleteKnowbook: {
    title: "Rinomina un Documento",
    rename_label: "Rinomina",
    cancel_label: "Annulla",
  },
  changePassword: {
    // title: "Modifica la password",
    password_placeholder: "Nuova password",
    placeholder_validationCode: "Codice di convalida ricevuto per email",
    label_sendValidationCode: "1-Recevi il codice di convalida",
    label_changePassword: "2-Cambia la password",
    sendValidationCode_error: "Email incorrectto",
    sendValidationCode_success:
      "Codice di convalida inviato all'indirizzo mail (controllare spam)",
    changePassword_error: "Codice di convalida incorretto o password vuota",
  },
  user: {
    guest: "Registrazione - Login",
    contact: "Contatto",
    install_instructions: "Installa per un ottima esperienza (Chrome/Safari)",
    deconnexion: "Disconnetti - Logout",
    changePassword: "Modifica la password",
    catchup_message:
      "Registrati per poter personalizzare e salvare la tua esperienza",
    loginSignup: {
      username_placeholder: "Email",
      password_placeholder: "Password",
      missing_password_text: "Password dimenticata?",
      login_label: "Accedi",
      signup_label: "Registrati",
      login_error: "Nome uttento o password incoretta",
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
