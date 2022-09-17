import {
  TconfigDataLanguage,
  Tlanguage,
  ICONS,
  TButtonID,
  TPages,
  TSpecialPages,
  CUSTOM_ICONS,
  TScenarioStepID,
} from "./globals";

export const configDataIt: TconfigDataLanguage = {
  searchBar: "Cerca...",
  source_wikipedia: "Sorgente: Wikipedia",
  legend: "Leggenda:",
  tryButton: "Prova n.Sens",
  labels: {
    knowbookUser: "Le mie collezioni",
    knowbookFeatured: "Scopri",
  },
  SEO: {
    // canonical: "https://www.nsens.org/it/Mobile/About/",
    title_page_base:
      "n.Sens - n.Sens aggiunge una nuova dimensione alla Wikipedia, esplorando visualmente la Conoscenza attraverso delle schede di Wikipedia. Un viaggio illimitato, di scoperta in scoperta.",
    description_page_base:
      "n.Sens - n.Sens aggiunge una nuova dimensione alla Wikipedia, esplorando visualmente la Conoscenza attraverso delle schede di Wikipedia. Un viaggio illimitato, di scoperta in scoperta.",
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
      [TPages.ItemCircle]: { title: "", description: "" },
      [TPages.ItemNetwork]: { title: "", description: "" },
      [TPages.Knowbooks]: { title: "", description: "" },
      [TPages.StaticKnowbook]: { title: "", description: "" },
      [TPages.Knowbook]: { title: "", description: "" },
      [TPages.Random]: { title: "", description: "" },
      [TPages.KnowbookSpecial]: {
        [TSpecialPages.Mostviewed]: { title: "Oggi", description: "" },
        [TSpecialPages.AllSaved]: {
          title: "Salvati (tutti)",
          description: "",
        },
        [TSpecialPages.NoKnowbook]: {
          title: "Senza collezione",
          description: "",
        },
      },
    },
  },
  about: {
    // scenario_texts: {
    //   [TScenarioStepID.Home]: "Gira la pallina blu per scorrere gli elementi",
    //   [TScenarioStepID.knowbook]:
    //     "Crea collezioni personalizzate con le tue scoperte usando: ",
    //   [TScenarioStepID.mostviewed]:
    //     "Sfoglia gli elementi più popolari nella collezione quotidiana",
    //   [TScenarioStepID.search]: "Trova velocemente ogni elementi",
    //   [TScenarioStepID.itemCircle]:
    //     "Scorre e esplora le relazioni e fai nuove scoperte",
    //   [TScenarioStepID.itemArticle]:
    //     "Accedi al contenuti Wikipedia di ogni elemento con: ",
    //   [TScenarioStepID.language]: "Più lingue disponibili",
    //   [TScenarioStepID.home]:
    //     "Buon viaggio nella nostra conoscenza infinita...",
    // },
  },
  buttons: {
    [TButtonID.BACK]: {
      label: "Indietro",
      icon: CUSTOM_ICONS.BACK,
    },
    [TButtonID.HOME]: {
      label: "Home",
      icon: CUSTOM_ICONS.HOME,
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
    // [TButtonID.CIRCLE]: {
    //   label: "Orbita",
    //   icon: CUSTOM_ICONS.CIRCLE,
    // },
    [TButtonID.NETWORK]: {
      label: "Rete",
      icon: CUSTOM_ICONS.NETWORK,
    },
    [TButtonID.NETWORKFLAT]: {
      label: "Elenco",
      icon: CUSTOM_ICONS.NETWORKFLAT,
    },
    [TButtonID.KNOWBOOKS]: {
      label: "collezioni",
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
  },
  knowbooks_User: {
    Related_title: "Da scoprire :",
  },
  knowbooks_Featured: {
    knowbooks_title: "Selezione",
  },
  editKnowbook: {
    title: "Aggiorna collezione",
    input_placeholder: "Nuova collezione",
  },
  renameDeleteKnowbook: {
    title: "Rinomina una collezione",
    rename_label: "Rinomina",
    cancel_label: "Annulla",
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
  user: {
    guest: "Registrazione - Login",
    contact: "Contatto",
    social: "Condividi",
    install_instructions: "Installa per un'esperienza ottimale (Chrome/Safari)",
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
