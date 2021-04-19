//Warning: different between back and front

export const CONFIG_ENV = {
  BACK_URL: process.env.NEXT_PUBLIC_BACK_URL,
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
};

export const configGeneral = {
  max_width_mobile: 640,
  large_screen_breakpoint: 1400,
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
  loginDuration: 500,
};

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
  amount_data_fetched_items: 30,
  max_size_chunk_api: 40,
  amount_related: 10,
  amount_data_fetched_images: 10,
  // max_width_image: 1300,
  max_width_image: 2600,
  min_width_image: 50,
};

export const configPaths = {
  item_empty_image: "/The_Scientific_Universe_small.webp",
  knowbook_all_image: "/500px-Book_closed_template_small.svg.webp",
  knowbook_none_image: "/The_Scientific_Universe_small.webp",
  // knowbook_image: "",
  // user_image: "/icon_user.jpg",
  // image_logo_W: "/logo2_W.webp",
  image_logo_B: "/logo2_B.webp",
  image_logo_W_small: "/logo2_W_small.webp",
  // image_logo_B_small: "/logo2_B_small.webp",
  image_landing: "/landing.webp",
  image_install: "/install.webp",
  pages: {
    Landing: "/Landing",
    Home: "/Home",
    Knowbooks: "/Knowbooks",
    Knowbook: "/Knowbook",
    KnowbookSaved: "/KnowbookSpecialSaved",
    KnowbookNone: "/KnowbookSpecialNone",
    ItemArticle: "/ItemArticle",
    ItemNetwork: "/ItemNetwork",
    User: "/User",
    ChangePassword: "/ChangePassword",
    empty: "",
  },
};

export const configButtonsPath = {
  HOME: configPaths.pages.Home,
  KNOWBOOKS: configPaths.pages.Knowbooks,
  LOGIN: configPaths.pages.User,
  INFO: configPaths.pages.Landing,
  SAVE: configPaths.pages.empty,
  EDIT: configPaths.pages.empty,
  ARTICLE: configPaths.pages.ItemArticle,
  VIZS: configPaths.pages.ItemNetwork,
};
