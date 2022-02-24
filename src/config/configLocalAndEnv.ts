//Warning: different between back and front

import { Tlanguage, TPages } from "./globals";

export const languages_activated: Tlanguage[] = [
  Tlanguage.fr,
  Tlanguage.it,
  Tlanguage.en,
];

const e = "comvacv_msens";
export function getEmail(): string {
  const result: string =
    e.replace(/_/g, "@").replace(/m/g, "n").replace(/v/g, "t") + ".org";
  return result;
}

// const t = "nwenw";
// export function getTwitter(): string {
//   const result: string = "https://twitter.com/_" + t.replace(/w/g, "s");
//   return result;
// }

export const CONFIG_ENV = {
  BACK_URL: process.env.NEXT_PUBLIC_BACK_URL,
  FRONT_URL: process.env.NEXT_PUBLIC_FRONT_URL,
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
};

export const configGeneral = {
  demoModeForScreenshoots: false,
  max_width_mobile: 640,
  large_screen_breakpoint: 1400,
  extra_large_screen_breakpoint: 2500,
  // tiny_screen_breakpoint: 320,
  display: {
    // amount_mostview_for_each_related: 2,
    amount_related_for_each_mostview: 3,
    feed_time_increment_ms: 500,
  },
  colors: {
    //Theme: update below + style.css + manifest.json
    //https://www.rapidtables.com/web/color/RGB_Color.html
    top: "green",
    bottom_bar: "green",
    background: "white", //"white",
    knowbook_edge_color: "white", //"white", //"darkGray",
    root_edge_color: "gray", //"darkWash",
    svg_background: "#020723", //"white",
    svg_elements: "white",

    item_color: "lightGray",
    knowbook_color: "lightGray",
    menu: "white",
    item_compact_color: "white",
    dialog: "white",
    headers: "white",
    item_color_image: "rgb(220, 220, 220)",
    knowbook_color_image: "rgb(245, 245, 245)",
    iconColorDefaultNotSelected: "darkGray",
    iconColorDefaultSelected: "red",
  },
  staticKnowbooks: {
    name_allStaticKnowbooks: "AllStatic.txt",
    name_extractStaticKnowbooks: "_AllStaticExtract.txt",
    amount_extractStaticKnowbooks: 5,
    vitalKnowbooks_topLevelPattern:
      "Category:Wikipedia level-3 vital articles by topic",
  },
  relation_name_wikipedia: "wikipedia",
  successMessage: "you can now login...",
  loginDuration: 2000,
};

export const configFetching = {
  // userAgent: "n.Sens/1.0 (https://www.nsens.org; " + getEmail() + ")",
  amount_data_fetched_items_searched: 50,
  max_size_chunk_api: 49,
  amount_related_wikipedia: 10,
  amount_max_by_node_wikidata: 30,
  amount_data_fetched_related_for_images: 2,
  width_image_thumbnail: 300,
  cache_duration_in_sec: "2628000", //1 Mois pour le cache
  staticKnowbooks: {
    refreshAllStaticKnowbooks: false,
    sleep_in_ms: 2000,
    size_chunk: 5,
    amount_best: 100,
  },
};

export const configPaths = {
  rootPath: "/[lang]",
  screenshots: "/screenshots/",
  // item_empty_image: "/The_Scientific_Universe_small.webp",
  item_empty_image: "/", //Don't put "" used to identify that an image shall be fetched!
  knowbook_all_image: "/500px-Book_closed_template_small.svg.webp",
  knowbook_none_image: "/The_Scientific_Universe_small.webp",
  image_logo_B: "/logo2_B.webp",
  image_logo_W_small: "/logo2_W_small.webp",
  image_landing: "/landing.webp",
  image_install: "/install.webp",
  pages: {
    [TPages.Home]: "/",
    [TPages.Search]: "/Search",
    [TPages.About]: "/About",
    [TPages.User]: "/User",
    [TPages.ChangePassword]: "/ChangePassword",

    [TPages.Item]: "/Item",
    [TPages.ItemNetwork]: "/ItemNetwork",

    [TPages.StaticKnowbook]: "/Static_Notebooks/[nameOrPeriod]",

    [TPages.Knowbook]: "/Notebook",
    [TPages.KnowbookSpecial]: "/NotebookSpecial",

    empty: "",
  },
  static: {
    knowbooks_location: "public/staticKnowbooks/",
    base_cache: "cache/",
    cache_articles: "articles/",
    cache_nbviews: "nb_views/",
  },
};

export const ICONS = {
  KNOWBOOKS: "folder",

  LOGIN: "person",

  INFO: "question-mark",

  SAVE: "heart",

  EDIT: "download",

  ARTICLE: "menu",

  VIZS: "globe",

  SEPARATOR: "ellipsis",
};

//Shoud be svg one path (https://gestalt.netlify.app/iconography_and_svgs)
export const CUSTOM_ICONS = {
  HOME: "M3.012,10.981,3,11H5v9a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V11h2a1,1,0,0,0,.555-1.832l-9-6a1,1,0,0,0-1.11,0l-9,6a1,1,0,0,0-.277,1.387A.98.98,0,0,0,3.012,10.981ZM10,14a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H10Z",
};

export const configButtonsPath = {
  HOME: configPaths.pages.Home,
  LOGIN: configPaths.pages.User,
  INFO: configPaths.pages.About,
  SAVE: configPaths.pages.empty,
  EDIT: configPaths.pages.empty,
  VIZS: configPaths.pages.ItemNetwork,
  SEPARATOR: "",
};

export const group_name = "group";

export function EXCLUSION_PATTERNS(lang: Tlanguage): string[] {
  if (lang === Tlanguage.fr) {
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
  } else if (lang === Tlanguage.it) {
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
  } else if (lang === Tlanguage.en) {
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
