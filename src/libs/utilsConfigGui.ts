import { GUI_CONFIG } from "../common/config";
import { displayDesktop } from "../common/configDesktop";
import { displayMobile } from "../common/configMobile";
import { Lang_fr } from "../common/configLangFr";
import { paths } from "../common/configPaths";
import { ConfigLanguage, ConfigDisplay, GUI_CONFIG_T } from "../common/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { configSpecialScreen } from "../common/configSpecialScreen";

export interface IPage {
  guiConfigData: GUI_CONFIG_T;
}

function getAllGuiConfig() {
  const guiConfigList = [
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.small } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.mobile } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.desktop } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.large } },
  ];

  return guiConfigList;
}

function getGuiConfigData(params: any): GUI_CONFIG_T {
  const lang = params.lang;
  const display = params.display;
  const GUI_CONFIG__: GUI_CONFIG_T = {
    id: lang + "_" + display,
    general: GUI_CONFIG.general,
    language: Lang_fr,
    display: displayMobile,
    paths: paths,
  };

  if (params === undefined) {
    //nothing to do
  } else if (display === ConfigDisplay.mobile) {
    //nothing to do
  } else if (display === ConfigDisplay.small) {
    // const dim = 100;
    const dim = configSpecialScreen.small.atom_compact_sizes_dim;
    GUI_CONFIG__.display.atom_compact_sizes.width = dim;
    GUI_CONFIG__.display.atom_compact_sizes.height = dim;
    GUI_CONFIG__.display.knowbook_compact_sizes.width = dim;
    GUI_CONFIG__.display.knowbook_compact_sizes.height = dim;
  } else if (display === ConfigDisplay.desktop) {
    GUI_CONFIG__.display = displayDesktop;
  } else if (display === ConfigDisplay.large) {
    GUI_CONFIG__.display = displayDesktop;
    GUI_CONFIG__.display.landing.sizes.lgColumn =
      configSpecialScreen.large.landing_sizes_column;
    GUI_CONFIG__.display.atom_sizes.lgColumn =
      configSpecialScreen.large.atom_sizes_column;
    GUI_CONFIG__.display.knowbook_sizes.lgColumn =
      configSpecialScreen.large.atom_sizes_column;
  }

  const guiConfigData = {
    ...GUI_CONFIG__,
  };

  return guiConfigData;
}

export const I_getStaticPaths: GetStaticPaths = async (constext) => {
  const paths = getAllGuiConfig();
  return {
    paths,
    fallback: false,
  };
};

export const I_getStaticProps: GetStaticProps = async (context) => {
  const guiConfigData = getGuiConfigData(context.params);
  if (!guiConfigData) {
    return {
      notFound: true,
    };
  }
  return {
    props: { guiConfigData },
  };
};
