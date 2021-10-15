import {
  TconfigDataLanguage,
  Tlanguage,
  ICONS,
  TPages,
  TButtonID,
} from "./globals";

export const configDataEn: TconfigDataLanguage = {
  searchBar: "Search...",
  source_wikipedia: "Source: Wikipedia",
  SEO: {
    // canonical: "https://www.nsens.org/en/Mobile/About/",
    title_page_base: "n.Sens - A new way to explore Open Knowledge",
    descirption_page_base: "n.sens is a platform around free knowledge",
    title_description: {
      [TPages.Home]: { title: "Home", description: "" },
      [TPages.About]: {
        title: "About",
        description: "",
      },
      [TPages.User]: { title: "", description: "" },
      [TPages.ChangePassword]: { title: "Update password", description: "" },
      [TPages.ItemArticle]: { title: "", description: "" },
      [TPages.ItemNetwork]: { title: "", description: "" },
      [TPages.StaticArticle]: { title: "", description: "" },
      [TPages.Knowbooks_Featured]: {
        title: "Featured Notebooks",
        description: "",
      },
      [TPages.StaticKnowbook]: { title: "", description: "" },
      [TPages.Knowbooks_User]: { title: "My Notebooks", description: "" },
      [TPages.Knowbook]: { title: "", description: "" },
      [TPages.KnowbookSaved]: { title: "Saved (all)", description: "" },
      [TPages.KnowbookNone]: { title: "Without Notebook", description: "" },
      [TPages.KnowbookMostviewed]: {
        title: "Today",
        description: "",
      },
    },
  },
  about: {
    // slogan:
    //   "Explore, understand, perform. Maintain the taste of truth and be ready for a fantastic journey...",
    // slogan: "A new way to explore Open Knowledge",
    features: [
      {
        title: "Find",
        description: "Find Wikipedia articles visually, with graphs and cards",
        icon: "search",
      },
      {
        title: "Collect",
        description: "Collect your findings in notebooks",
        icon: "folder",
      },
      {
        title: "Explore",
        description:
          "Open up new horizons and access new discoveries thanks to the platform suggestions",
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
      label: "Notebooks",
      icon: ICONS.KNOWBOOKS,
    },
    [TButtonID.KNOWBOOKS_FEATURED]: {
      label: "Featured",
      icon: ICONS.FEATURED,
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
      label: "Save",
      icon: ICONS.SAVE,
    },
    [TButtonID.EDIT]: {
      label: "Modify",
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
    // knowbooks_title: "My Notebooks",
    // AllSaved_title: "Saved (all)",
    // None_Title: "In no notebook",
    Related_title: "Explore :",
  },
  knowbooks_Featured: {
    knowbooks_title: "Featured",
  },
  editKnowbook: {
    title: "Update Notebooks",
    input_placeholder: "New notebook",
  },
  renameDeleteKnowbook: {
    title: "Rename notebook",
    rename_label: "Rename",
    cancel_label: "Cancel",
  },
  changePassword: {
    // title: "Update password",
    password_placeholder: "New password",
    placeholder_validationCode: "Verification code received by email",
    label_sendValidationCode: "1-Receive validation code",
    label_changePassword: "2-Update password",
    sendValidationCode_error: "Wrong Email",
    sendValidationCode_success: "Validation code sent by email (check spams)",
    changePassword_error: "Wrong validation code or empty password",
  },
  user: {
    guest: "Create account - Login",
    contact: "Contact",
    install_instructions:
      "Install for a better user experience (Chrome/Safari)",
    deconnexion: "Logout",
    changePassword: "Update password",
    catchup_message:
      "Create an account to save your content and personalize your user experience",
    loginSignup: {
      username_placeholder: "Email",
      password_placeholder: "Password",
      missing_password_text: "Password forgotten?",
      login_label: "Connection",
      signup_label: "Create account",
      login_error: "Wrong Email or password",
      signup_error: "Impossible to create user account",
      signup_error_duration:
        "Refresh page, fill user fields and wait few seconds before registering",
    },
    languages: {
      [Tlanguage.fr]: "French",
      [Tlanguage.it]: "Italian",
      [Tlanguage.en]: "English",
    },
  },
};
