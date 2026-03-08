import {
  TButtonID,
  TconfigDataLanguage,
  Tlanguage,
  TPages,
  TKnowbooksPages,
} from "./globals";

export const configDataEn: TconfigDataLanguage = {
  historyNavigation: "History",
  source_wikipedia: "Source: Wikipedia",
  source_arxiv: "Source: Arxiv",
  legend: "Legend:",
  moreBestKnowbooksLabel: "More",
  // sharingURL_Base: "URL copied in the clipboard: ",
  search: {
    searchBar: "Search...",
    control_wiki: "Wiki",
    control_books: "Books",
    control_arxiv: "Arxiv",
    control_knowbooks: "Notebooks",
  },
  network: {
    nodeNameWikidata: "Wikidata",
    nodeNameWikipedia: "Wikipedia",
    nodeNameForPublicKnowbooks: "Suggested notebooks",
    nodeNameForArxivItems: "Scientific papers",
    nodeNameForBooksItems: "Books",
    nodeNameForContentKnowbooks: "Contains",
  },
  knowbooks: {
    // knowbookFeatured: "Top",
    // knowbookFollowedPublic: "Saved",
    // knowbookUser: "My notebooks",
    privateLabel: " (private)",
  },
  SEO: {
    // canonical: "https://www.nsens.org/en/Mobile/About/",
    title_page_base:
      "nSens: Empower Your Knowledge Sharing with Interactive Graphs and Notebooks.",
    description_page_base:
      "Discover the power of nSens, the innovative platform that allows you to effortlessly build and share knowledge notebooks and interactive graphs. Organize your ideas, data, and resources seamlessly in customizable notebooks. Keep your valuable content private or engage with your community by sharing it. Unlock the potential of collaborative learning and knowledge exchange with nSens.",
    title_description: {
      [TPages.Home]: { title: "Top Notebooks", description: "" },
      [TPages.KnowbooksSaved]: { title: "Followed Notebooks", description: "" },
      [TPages.KnowbooksMine]: { title: "My Notebooks", description: "" },
      // [TPages.About]: {
      //   title: "About",
      //   description: "",
      // },
      [TPages.User]: { title: "", description: "" },
      [TPages.ChangePassword]: { title: "Update password", description: "" },
      [TPages.ItemNetwork]: { title: "", description: "" },
      [TPages.Knowbooks]: { title: "", description: "" },
      [TPages.Knowbook]: { title: "", description: "" },
      [TPages.KnowbookSpecial]: {
        [TKnowbooksPages.Mostviewed]: { title: "Today", description: "" },
        [TKnowbooksPages.AllSaved]: {
          title: "Saved (all)",
          description: "",
        },
        // [TKnowbooksPages.NoKnowbook]: {
        //   title: "Without notebook",
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
      label: "Followed",
    },
    [TButtonID.KNOWBOOK_MINE]: {
      label: "Personal",
    },
    [TButtonID.SEARCH]: {
      label: "Search",
    },
    [TButtonID.LOGIN]: {
      label: "User",
    },
    [TButtonID.INFO]: {
      label: "Info",
    },
    [TButtonID.BACK]: {
      label: "Back",
    },
    [TButtonID.FOLLOW_PUBLIC]: {
      label: "Save",
    },
    [TButtonID.EDIT_CONTENT]: {
      label: "Modify",
    },
    [TButtonID.ARTICLE]: {
      label: "Wikipedia",
    },
    [TButtonID.NETWORK]: {
      label: "Network",
    },
    [TButtonID.HISTORY]: {
      label: "History",
    },
    [TButtonID.EDIT_USER]: {
      label: "Update",
    },
    [TButtonID.LOGOUT]: {
      label: "Logout",
    },
  },
  arxiv_Details: {
    header: "Scholar paper details",
    title: "Title:",
    Author: "Authors:",
    summary: "Summary:",
    more_info: "More détails",
    download: "Download pdf",
  },
  books_Details: {
    header: "Book details",
    title: "Title:",
    Author: "Authors:",
    summary: "Summary:",
    more_info: "Détails (Amazon)",
  },
  knowbooks_User: {
    Related_title: "Explore :",
  },
  knowbooks_Featured: {
    knowbooks_title: "Featured",
  },
  editKnowbook: {
    title: "Store in notebooks: ",
    input_placeholder: "New notebook",
  },
  editKnowbookProps: {
    heading: "Notebook properties",
    nameLabel: "Name",
    descriptionLabel: "Description",
    nameSource: "Learn more",
    imageLabel: "Image",
    shareLabelTitle: "Visibility",
    shareLabelPublic: "Public notebook",
    shareLabelPrivate: "Private notebook",
    deletionLabel: "Delete",
    deletionLabelConfirmation: "Delete with all included items?",
  },
  renameDeleteKnowbook: {
    title: "Rename notebook",
    rename_label: "Rename",
    cancel_label: "Cancel",
  },
  editUserProps: {
    username: "Username",
    email: "Email",
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
  social: {
    title: "Link to Share",
    description_base: "nSens - Item shared with you : ",
  },
  user: {
    guest: "Create account - Login",
    contact: "Contact",
    // install_instructions:
    //   "Install for a better user experience (Chrome/Safari)",
    // deconnexion: "Logout",
    modification: "Update user properties",
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
