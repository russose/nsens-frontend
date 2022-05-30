//Warning: different between back and front

import { TButtonID, Tlanguage, TPages } from "./globals";

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
  LANDING_URL_EN: process.env.NEXT_PUBLIC_LANDING_EN,
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
  // maxArticlesSlide: 20,
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

    [TPages.ItemCircle]: "/ItemCircle",
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
  // NETWORK: "ads-overview",
  // CIRCLE: "ads-overview",
  KNOWBOOK: "workflow-status-all",
  SEPARATOR: "ellipsis",
  WIKIPEDIA: "view-type-list",
  BACK: "arrow-back",
  ARTICLE_BACK: "arrow-start",
  ARTICLE_NEXT: "arrow-end",
};

//Shoud be svg one path (https://gestalt.netlify.app/iconography_and_svgs)
export const CUSTOM_ICONS = {
  HOME: "M3.012,10.981,3,11H5v9a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V11h2a1,1,0,0,0,.555-1.832l-9-6a1,1,0,0,0-1.11,0l-9,6a1,1,0,0,0-.277,1.387A.98.98,0,0,0,3.012,10.981ZM10,14a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H10Z",
  NETWORK:
    "m 12.837211,6.8694133 h 4.336314 c 0.214669,1.6744182 1.674419,3.005366 3.391771,3.005366 C 22.454383,9.8747793 24,8.3291625 24,6.4400753 24,4.550988 22.454383,3.0053712 20.565296,3.0053712 c -1.588551,0 -2.919499,1.1162788 -3.305903,2.5760281 H 12.837211 C 12.407873,2.4472318 9.7030443,5.1076128e-6 6.4400753,5.1076128e-6 A 6.4319695,6.4319695 0 0 0 5.1076128e-6,6.4400753 c 0,3.39177 2.6618956923872,6.1824667 6.0107321923872,6.3971357 v 4.422182 C 4.550988,17.645797 3.4347092,18.976745 3.4347092,20.565296 3.4347092,22.454383 4.980326,24 6.8694133,24 c 1.8890873,0 3.4347037,-1.545617 3.4347037,-3.434704 0,-1.760286 -1.3309477,-3.177102 -3.0053657,-3.391771 v -4.336314 c 1.2021464,-0.171735 2.318425,-0.644007 3.2200347,-1.416815 l 5.109122,5.109122 a 3.3269646,3.3269646 0 0 0 -0.601073,1.932021 c 0,1.889088 1.545617,3.434704 3.434704,3.434704 1.889088,0 3.434704,-1.545616 3.434704,-3.434704 0,-1.889087 -1.545616,-3.434704 -3.434704,-3.434704 -0.729874,0 -1.373881,0.214669 -1.932021,0.601073 L 11.420396,10.518786 C 12.236138,9.5313093 12.751344,8.2432949 12.837211,6.8694133 Z M 1.2880191,6.4400753 c 0,-2.8336309 2.3184253,-5.1520562 5.1520562,-5.1520562 2.833631,0 5.1520557,2.3184253 5.1520557,5.1520562 0,2.833631 -2.3184247,5.1520557 -5.1520557,5.1520557 -2.8336309,0 -5.1520562,-2.3184247 -5.1520562,-5.1520557 z",
  CIRCLE:
    "m 11.999527,7.4867058 c -2.4852135,0 -4.4576351,2.0112119 -4.4576351,4.4501212 0,2.438911 1.9311732,4.534352 4.4576351,4.534352 2.526462,0 4.457635,-2.011212 4.457635,-4.450122 0,-2.4389099 -1.973359,-4.5343512 -4.457635,-4.5343512 z M 23.872493,16.279323 20.910111,11.978942 23.870149,7.7202085 C 24.16695,7.2932121 23.921899,6.7029041 23.409574,6.6102517 L 18.300401,5.6884072 17.377001,0.58784661 C 17.284427,0.07638673 16.693122,-0.16834661 16.26517,0.12814104 L 11.999527,3.1250246 7.6918859,0.16978782 C 7.2641685,-0.12651261 6.6728638,0.11798671 6.5800551,0.62949339 L 5.6997775,5.7319258 0.58873052,6.6537702 C 0.07654774,6.7426791 -0.16855189,7.3369646 0.12824881,7.7206765 L 3.088475,12.021057 0.12843631,16.279791 c -0.29680072,0.426996 -0.05179482,1.017304 0.4604817,1.109957 l 5.10917209,0.921844 0.9234008,5.100561 c 0.092574,0.51146 0.6838791,0.756193 1.1118308,0.459705 l 4.2662053,-2.955236 4.265924,2.955049 c 0.427811,0.296394 1.019491,0.0518 1.111831,-0.459612 l 0.923401,-5.10056 5.109172,-0.921845 c 0.514198,-0.09022 0.757939,-0.684504 0.462638,-1.110331 z m -11.872966,1.689268 c -3.3134618,0 -5.9575756,-2.681772 -5.9575756,-5.947534 0,-3.307877 2.6862996,-5.9475341 5.9575756,-5.9475341 3.271276,0 5.957575,2.6813039 5.957575,5.9475341 0,3.308345 -2.643644,5.947534 -5.957575,5.947534 z",
};

export const configButtonsPath = {
  [TButtonID.HOME]: configPaths.pages.Home,
  [TButtonID.LOGIN]: configPaths.pages.User,
  // [TButtonID.INFO]: configPaths.pages.About,
  [TButtonID.INFO]: "",
  [TButtonID.SAVE]: configPaths.pages.empty,
  [TButtonID.EDIT]: configPaths.pages.empty,
  [TButtonID.CIRCLE]: configPaths.pages.ItemCircle,
  [TButtonID.NETWORK]: configPaths.pages.ItemNetwork,
  [TButtonID.KNOWBOOK]: configPaths.pages.Knowbook,
  [TButtonID.SEPARATOR]: "",
  [TButtonID.BACK]: "",
  [TButtonID.ARTICLE_BACK]: "",
  [TButtonID.ARTICLE_NEXT]: "",
};

export const group_name = "group";
// export const ArticlesSlideSeparator = "***-***";

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
