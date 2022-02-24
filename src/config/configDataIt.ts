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
  labels: {
    knowbookUser: "I Miei Documenti",
    knowbookFeatured: "Scopri",
  },
  SEO: {
    // canonical: "https://www.nsens.org/it/Mobile/About/",
    title_page_base: "n.Sens - Esplora la conoscenza libera in un modo nuovo",
    description_page_base:
      "n.Sens - Aggiungi una nuova dimenzione alla Wikipedia e esplora visualmente la Conoscenza",
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
      [TPages.ItemNetwork]: { title: "", description: "" },
      [TPages.StaticKnowbook]: { title: "", description: "" },
      [TPages.Knowbook]: { title: "", description: "" },

      [TPages.KnowbookSpecial]: {
        [TSpecialPages.Mostviewed]: { title: "Oggi", description: "" },
        [TSpecialPages.AllSaved]: {
          title: "Salvati (tutti)",
          description: "",
        },
        [TSpecialPages.NoKnowbook]: {
          title: "Senza Documento",
          description: "",
        },
      },
    },
  },
  about: {
    scenario_texts: {
      [TScenarioStepID.knowbook]:
        "Crea documenti personalizzati e accedi alle tue scoperte da tutti i tuoi schermi",
      [TScenarioStepID.mostviewed]: "Sfoglia gli elementi più popolari",
      [TScenarioStepID.search]: "Trova presto gli elementi cercati",
      [TScenarioStepID.item]: "Esplora le relazioni e fai nuove scoperte",
      [TScenarioStepID.itemArticle]:
        "Accedi al contenuto di ogni elemente della Wikipedia",
      [TScenarioStepID.language]: "Piu lingue sono disponibile",
      [TScenarioStepID.home]:
        "Buon viaggio nella nostra conoscenza infinita...",
    },
  },
  buttons: {
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
    social: "Condividi",
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
