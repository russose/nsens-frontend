import { configGUIGeneral } from "./configGUIGeneral";
import { Lang_fr } from "./configGUILangFr";
import { configGUIMobile } from "./configGUIMobile";
import { paths } from "./configPaths";

export type GUI_CONFIG_T = typeof GUI_CONFIG;
// export type GUI_CONFIG_T = any;

export const GUI_CONFIG = {
  id: "",
  general: configGUIGeneral,
  language: Lang_fr,
  display: configGUIMobile,
  paths: paths,
};
