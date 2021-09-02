import { configDataLanguage, ConfigLanguage, ICONS } from "./globals";

export const configDataEn: configDataLanguage = {
  searchBar: "Search...",
  source_wikipedia: "Source: Wikipedia",
  SEO: {
    // canonical: "https://www.nsens.org/en/Mobile/About/",
    title_page_base: "n.Sens",
  },
  about: {
    // slogan:
    //   "Explore, understand, perform. Maintain the taste of truth and be ready for a fantastic journey...",
    slogan: "A new way to explore knowledge",
    features: [
      {
        title: "Find",
        description: "Find Wikipedia articles visually",
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
    HOME: {
      label: "Home",
      icon: ICONS.HOME,
    },
    KNOWBOOKS: {
      label: "Notebooks",
      icon: ICONS.KNOWBOOKS,
    },
    LOGIN: {
      label: "User",
      icon: ICONS.LOGIN,
    },
    INFO: {
      label: "Info",
      icon: ICONS.INFO,
    },
    SAVE: {
      label: "Save",
      icon: ICONS.SAVE,
    },
    EDIT: {
      label: "Modify",
      icon: ICONS.EDIT,
    },
    ARTICLE: {
      label: "Article",
      icon: ICONS.ARTICLE,
    },
    VIZS: {
      label: "Vizs",
      icon: ICONS.VIZS,
    },
    SEPARATOR: {
      label: "",
      icon: ICONS.SEPARATOR,
    },
  },
  knowbooks: {
    knowbooks_title: "Notebooks",
    AllSaved_title: "Saved (all)",
    None_Title: "In no notebook",
    Related_title: "Explore :",
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
    title: "Update password",
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
      [ConfigLanguage.fr]: "French",
      [ConfigLanguage.it]: "Italian",
      [ConfigLanguage.en]: "English",
    },
  },
};
