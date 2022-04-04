import {
  TconfigDataLanguage,
  Tlanguage,
  ICONS,
  TPages,
  TButtonID,
  TSpecialPages,
  CUSTOM_ICONS,
  TScenarioStepID,
} from "./globals";

export const configDataEn: TconfigDataLanguage = {
  searchBar: "Search...",
  source_wikipedia: "Source: Wikipedia",
  legend: "Legend:",
  tryButton: "Try n.Sens and share",
  labels: {
    knowbookUser: "My collections",
    knowbookFeatured: "Explore",
  },
  SEO: {
    // canonical: "https://www.nsens.org/en/Mobile/About/",
    title_page_base: "n.Sens",
    description_page_base:
      "n.Sens - Add a new dimension to the Wikipedia and browse Knowledge visually",
    title_description: {
      [TPages.Home]: { title: "Home", description: "" },
      [TPages.About]: {
        title: "About",
        description: "",
      },
      [TPages.User]: { title: "", description: "" },
      [TPages.ChangePassword]: { title: "Update password", description: "" },
      [TPages.ItemNetwork]: { title: "", description: "" },
      [TPages.StaticKnowbook]: { title: "", description: "" },
      [TPages.Knowbook]: { title: "", description: "" },
      [TPages.KnowbookSpecial]: {
        [TSpecialPages.Mostviewed]: { title: "Today", description: "" },
        [TSpecialPages.AllSaved]: {
          title: "Saved (all)",
          description: "",
        },
        [TSpecialPages.NoKnowbook]: {
          title: "Without collection",
          description: "",
        },
      },
    },
  },
  about: {
    scenario_texts: {
      [TScenarioStepID.navigationBall]:
        "Turn around the blue ball to scroll elements",
      [TScenarioStepID.knowbook]:
        "Create personalized collections with your findings using: ",
      [TScenarioStepID.mostviewed]:
        "Access most popular elements with the daily collection",
      [TScenarioStepID.search]: "Find quickly any items",
      [TScenarioStepID.item]:
        "Browse and explore relations making new findings",
      [TScenarioStepID.itemArticle]:
        "Access Wikipedia content of any items with: ",
      [TScenarioStepID.language]: "Many languages are supported",
      [TScenarioStepID.home]:
        "Have a nice journey in our infinite knowledge...",
    },
  },
  buttons: {
    [TButtonID.BACK]: {
      label: "Back",
      icon: ICONS.BACK,
    },
    [TButtonID.HOME]: {
      label: "Home",
      icon: CUSTOM_ICONS.HOME,
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
    [TButtonID.SLIDE]: {
      label: "Slides",
      icon: ICONS.SLIDE,
    },
    [TButtonID.KNOWBOOK]: {
      label: "Overview",
      icon: ICONS.KNOWBOOK,
    },
    [TButtonID.SEPARATOR]: {
      label: "",
      icon: ICONS.SEPARATOR,
    },
  },
  knowbooks_User: {
    Related_title: "Explore :",
  },
  knowbooks_Featured: {
    knowbooks_title: "Featured",
  },
  editKnowbook: {
    title: "Update collections",
    input_placeholder: "New collection",
  },
  renameDeleteKnowbook: {
    title: "Rename collection",
    rename_label: "Rename",
    cancel_label: "Cancel",
  },
  changePassword: {
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
    social: "Share",
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
