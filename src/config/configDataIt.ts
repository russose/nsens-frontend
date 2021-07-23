import { configDataLanguage, ConfigLanguage, ICONS } from "./globals";

export const configDataIt: configDataLanguage = {
  searchBar: "Cerca...",
  source_wikipedia: "Sorgente: Wikipedia",
  SEO: {
    canonical: "https://www.nsens.org/it/Mobile/About/",
    title_page_base: "n.Sens",
  },
  about: {
    slogan:
      "Esplorare, capire, agire. Lasciarsi trasportare gustandosi la ricerca...",
    features: [
      {
        title: "Trova",
        description: "Trova e vizualizza ciò che desideri in modo divertente",
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
    HOME: {
      label: "Home",
      icon: ICONS.HOME,
    },
    KNOWBOOKS: {
      label: "Documenti",
      icon: ICONS.KNOWBOOKS,
    },
    LOGIN: {
      label: "Utente",
      icon: ICONS.LOGIN,
    },
    INFO: {
      label: "Info",
      icon: ICONS.INFO,
    },
    SAVE: {
      label: "Salva",
      icon: ICONS.SAVE,
    },
    EDIT: {
      label: "Modifica",
      icon: ICONS.EDIT,
    },
    ARTICLE: {
      label: "Articolo",
      icon: ICONS.ARTICLE,
    },
    VIZS: {
      label: "Vizs",
      icon: ICONS.VIZS,
    },
  },
  knowbooks: {
    knowbooks_title: "Documenti",
    AllSaved_title: "Salvati (tutti)",
    None_Title: "Nessun Documento",
    Related_title: "Da scoprire :",
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
    title: "Modifica la password",
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
      signup_error: "Impossibile creare il conto",
      signup_error_duration:
        "Riscarigare la paggina, riempire i campi et aspettare qualque secondi prima di registrarsi",
    },
    languages: {
      [ConfigLanguage.fr]: "Francese",
      [ConfigLanguage.it]: "Italiano",
      [ConfigLanguage.en]: "Inglese",
    },
  },
};
