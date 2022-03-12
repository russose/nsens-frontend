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
  tryButton: "Prova n.Sens e condividi",
  labels: {
    knowbookUser: "I Miei Documenti",
    knowbookFeatured: "Scopri",
  },
  SEO: {
    // canonical: "https://www.nsens.org/it/Mobile/About/",
    title_page_base: "n.Sens - Esplora la conoscenza libera in un modo nuovo",
    description_page_base:
      "n.Sens - Aggiungi una nuova dimenSione a Wikipedia ed esplora visualmente la Conoscenza",
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
      [TScenarioStepID.navigationBall]:
        "Gira la pallina blu per scorrere gli elementi",
      [TScenarioStepID.knowbook]:
        "Crea documenti personalizzati con le tue scoperte usando: ",
      [TScenarioStepID.mostviewed]:
        "Sfoglia gli elementi più popolari nel documento quotidiano",
      [TScenarioStepID.search]: "Trova velocemente ogni elementi",
      [TScenarioStepID.item]:
        "Scorre e esplora le relazioni e fai nuove scoperte",
      [TScenarioStepID.itemArticle]:
        "Accedi al contenuti Wikipedia di ogni elemento con: ",
      [TScenarioStepID.language]: "Più lingue disponibili",
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
