import { GUI_CONFIG_T } from "../common/configGUI";
import { Lang_fr } from "../common/configGUILangFr";
import { paths } from "../common/configPaths";
import { ConfigLanguage, ConfigDisplay } from "../common/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { configGUIGeneral } from "../common/configGUIGeneral";

export interface IPage {
  guiConfigData: GUI_CONFIG_T;
}

function getAllGuiConfig() {
  const guiConfigList = [
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.mobile } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.desktop } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.large } },
  ];

  return guiConfigList;
}

async function getGuiConfigData(params: any): Promise<GUI_CONFIG_T> {
  const lang = params.lang;
  const display = params.display;
  const id = lang + "_" + display;

  let GUI_CONFIG__: GUI_CONFIG_T;
  // GUI_CONFIG__ = {
  //   id: id,
  //   general: displayGeneral,
  //   language: Lang_fr,
  //   display: displayMobile,
  //   paths: paths,
  // };

  // const GUI_CONFIG__: GUI_CONFIG_T = {
  //   id: id,
  //   general: GUI_CONFIG.general,
  //   language: Lang_fr,
  //   display: displayMobile,
  //   paths: paths,
  // };

  if (params === undefined) {
    const configGUIMobile = await import("../common/configGUIMobile");
    GUI_CONFIG__ = {
      id: id,
      general: configGUIGeneral,
      language: Lang_fr,
      display: configGUIMobile.configGUIMobile,
      paths: paths,
    };
  } else if (display === ConfigDisplay.mobile) {
    const configGUIMobile = await import("../common/configGUIMobile");
    GUI_CONFIG__ = {
      id: id,
      general: configGUIGeneral,
      language: Lang_fr,
      display: configGUIMobile.configGUIMobile,
      paths: paths,
    };
  } else if (display === ConfigDisplay.desktop) {
    const configGUIDesktop = await import("../common/configGUIDesktop");
    GUI_CONFIG__ = {
      id: id,
      general: configGUIGeneral,
      language: Lang_fr,
      display: configGUIDesktop.configGUIDesktop,
      paths: paths,
    };
    // GUI_CONFIG__.display = displayDesktop;
  } else if (display === ConfigDisplay.large) {
    const configGUIDesktop = await import("../common/configGUIDesktop");
    const configGUISpecialScreen = await import(
      "../common/configGUISpecialScreen"
    );
    GUI_CONFIG__ = {
      id: id,
      general: configGUIGeneral,
      language: Lang_fr,
      display: configGUIDesktop.configGUIDesktop,
      paths: paths,
    };
    // GUI_CONFIG__.display = displayDesktop;
    GUI_CONFIG__.display.landing.features.lgColumn =
      configGUISpecialScreen.configGUISpecialScreen.large.landing_features_column;
    GUI_CONFIG__.display.atom_sizes.lgColumn =
      configGUISpecialScreen.configGUISpecialScreen.large.atom_sizes_column;
    GUI_CONFIG__.display.knowbook_sizes.lgColumn =
      configGUISpecialScreen.configGUISpecialScreen.large.atom_sizes_column;
  }

  const guiConfigData = {
    ...GUI_CONFIG__,
  };

  return guiConfigData;
}

export const I_getStaticPaths: GetStaticPaths = async (context) => {
  const paths = getAllGuiConfig();
  return {
    paths,
    fallback: false,
  };
};

export const I_getStaticProps: GetStaticProps = async (context) => {
  const guiConfigData = await getGuiConfigData(context.params);
  if (!guiConfigData) {
    return {
      notFound: true,
    };
  }
  return {
    props: { guiConfigData },
  };
};
