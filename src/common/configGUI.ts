import { LANGUAGE } from "./config";
import { Lang_fr } from "./configLangFr";
import { displayMobile } from "./configMobile";
import { paths } from "./configPaths";

export type GUI_CONFIG_T = typeof GUI_CONFIG;
// export type GUI_CONFIG_T = any;

export const GUI_CONFIG = {
  id: "",
  general: {
    language: LANGUAGE,
    max_width_mobile: 640,
    large_screen_breakpoint: 2000,
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
    },
  },
  language: Lang_fr,
  display: displayMobile,
  paths: paths,
};
