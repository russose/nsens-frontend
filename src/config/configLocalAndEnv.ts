//Warning: different between back and front

import { ConfigLanguage } from "./globals";

export const is_testing_mode = true;
export const languages_activated: ConfigLanguage[] = [
  ConfigLanguage.fr,
  ConfigLanguage.it,
  ConfigLanguage.en,
];

export const CONFIG_ENV = {
  BACK_URL: process.env.NEXT_PUBLIC_BACK_URL,
  FRONT_URL: process.env.NEXT_PUBLIC_FRONT_URL,
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
};

export const configGeneral = {
  max_width_mobile: 640,
  large_screen_breakpoint: 1400,
  extra_large_screen_breakpoint: 2500,
  // tiny_screen_breakpoint: 320,
  colors: {
    //https://www.rapidtables.com/web/color/RGB_Color.html
    top: "green",
    features: "green",
    background: "white",
    // background_landing: "navy",
    item_color: "lightGray",
    knowbook_color: "lightGray",
    menu: "white",
    item_compact_color: "white",
    dialog: "white",
    headers: "white",
    item_color_image: "rgb(220, 220, 220)",
    knowbook_color_image: "rgb(245, 245, 245)",
    iconColorDefault: "darkGray",
  },
  successMessage: "you can now login...",
  loginDuration: 2000,
  feed: {
    ratio_related: 0.6,
    ratio_mostviewed_over_randow: 1, //when 0.5, as many mostviewed as random
  },
};

export function EXCLUSION_PATTERNS(lang: ConfigLanguage): string[] {
  if (lang === ConfigLanguage.fr) {
    return [
      "Accueil",
      "Main_Page",
      "Catégorie:",
      "Portail:",
      "Projet:",
      "Wikipédia:",
      "Spécial:",
      "Special:",
      "Sp?cial",
      "HTTP_404",
      "Fichier:",
      "Aide:",
    ];
  } else if (lang === ConfigLanguage.it) {
    return [
      "_Accueil",
      "Pagina_principale",
      "Categoria:",
      "Portale:",
      "Progetto:",
      "Wikipedia:",
      "Speciale:",
      "Special:",
      "HTTP_404",
      "File:",
      "Aiuto:",
    ];
  } else if (lang === ConfigLanguage.en) {
    return [
      "_Accueil",
      "Main_Page",
      "Category:",
      "Portal:",
      "_Projet:",
      "Wikipedia:",
      "Special:",
      "HTTP_404",
      "File:",
      "Help:",
    ];
  } else {
    return [];
  }
}

const e = "comvacv_msens";
export function getEmail(): string {
  const result: string =
    e.replace(/_/g, "@").replace(/m/g, "n").replace(/v/g, "t") + ".org";
  return result;
}

const t = "nwenw";
export function getTwitter(): string {
  const result: string = "https://twitter.com/_" + t.replace(/w/g, "s");
  return result;
}

export const configFetching = {
  userAgent: "n.Sens/1.0 (https://www.nsens.org; " + getEmail() + ")",
  amount_data_fetched_items: 50,
  max_size_chunk_api: 40,
  amount_related: 10,
  amount_data_fetched_related_for_images: 2,
  width_image_thumbnail: 300,
  cache_duration_in_sec: "2628000", //1 Mois pour le cache
};

export const configPaths = {
  rootPath: "/[lang]",
  item_empty_image: "/The_Scientific_Universe_small.webp",
  knowbook_all_image: "/500px-Book_closed_template_small.svg.webp",
  knowbook_none_image: "/The_Scientific_Universe_small.webp",
  // knowbook_image: "",
  // user_image: "/icon_user.jpg",
  // image_logo_W: "/logo2_W.webp",
  image_logo_B: "/logo2_B.webp",
  image_logo_W_small: "/logo2_W_small.webp",
  // image_logo_B_small: "/logo2_B_small.webp",
  image_landing: "/landing_graph.webp",
  image_install: "/install.webp",
  pages: {
    About: "/About",
    Home: "/",
    Knowbooks: "/Knowbooks",
    Knowbook: "/Knowbook",
    KnowbookSaved: "/KnowbookSpecialSaved",
    KnowbookNone: "/KnowbookSpecialNone",
    ItemArticle: "/ItemArticle",
    ItemNetwork: "/ItemNetwork",
    User: "/User",
    ChangePassword: "/ChangePassword",
    StaticKnowbooks: "/StaticKnowbooks/[nameOrPeriod]",
    StaticArticles: "/StaticArticles/[title]",
    empty: "",
  },
  static: {
    knowbooks: "public/staticKnowbooks/",
    base_cache: "cache/",
    cache_articles: "articles/",
    cache_nbviews: "nb_views/",
  },
};

export const ICONS = {
  HOME: "workflow-status-all",

  KNOWBOOKS: "folder",

  LOGIN: "person",

  INFO: "question-mark",

  // SAVE: "heart",
  SAVE: "download",

  // EDIT: "download",
  EDIT: "edit",

  ARTICLE: "menu",

  VIZS: "globe",
};

export const configButtonsPath = {
  HOME: configPaths.pages.Home,
  KNOWBOOKS: configPaths.pages.Knowbooks,
  LOGIN: configPaths.pages.User,
  INFO: configPaths.pages.About,
  SAVE: configPaths.pages.empty,
  EDIT: configPaths.pages.empty,
  ARTICLE: configPaths.pages.ItemArticle,
  VIZS: configPaths.pages.ItemNetwork,
};

export const api_issue_text: string = "issue in loging or network";

export const group_name = "group";
