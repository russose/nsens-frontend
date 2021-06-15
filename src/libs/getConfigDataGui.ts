import { configDataFr } from "../config/configDataFr";
import { ConfigLanguage, ConfigDisplay, IGUICONFIG } from "../config/globals";
import { GetStaticPaths, GetStaticProps } from "next";

export interface IPage {
  guiConfigData: IGUICONFIG;
}

export function getAllConfigGui() {
  const guiConfigList = [
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.mobile } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.desktop } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.large } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.extra } },
    // { params: { lang: ConfigLanguage.en, display: ConfigDisplay.desktop } },
  ];

  return guiConfigList;
}

export async function getConfigDataGui(params: any): Promise<IPage> {
  const lang = params.lang;
  const display = params.display;
  const id = lang + "_" + display;

  let GUI_CONFIG__: IGUICONFIG;
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
    const configGUIMobile = await import("../config/configDataMobile");
    GUI_CONFIG__ = {
      id: id,
      language: configDataFr,
      display: configGUIMobile.configDataMobile,
    };
  } else if (display === ConfigDisplay.mobile) {
    const configGUIMobile = await import("../config/configDataMobile");
    GUI_CONFIG__ = {
      id: id,
      language: configDataFr,
      display: configGUIMobile.configDataMobile,
    };
  } else if (display === ConfigDisplay.desktop) {
    const configGUIDesktop = await import("../config/configDataDesktop");
    GUI_CONFIG__ = {
      id: id,
      language: configDataFr,
      display: configGUIDesktop.configDataDesktop,
    };
  } else if (display === ConfigDisplay.large) {
    const configGUIDesktop = await import("../config/configDataDesktop");
    const configGUISpecialScreen = await import(
      "../config/configDataSpecialScreen"
    );
    GUI_CONFIG__ = {
      id: id,
      language: configDataFr,
      display: configGUIDesktop.configDataDesktop,
    };
    // GUI_CONFIG__.display.About.features.lgColumn =
    //   configGUISpecialScreen.configDataSpecialScreen.large.landing_features_column;
    GUI_CONFIG__.display.atom_sizes.lgColumn =
      configGUISpecialScreen.configDataSpecialScreen.large.atom_sizes_column;
    GUI_CONFIG__.display.knowbook_sizes.lgColumn =
      configGUISpecialScreen.configDataSpecialScreen.large.knowbook_sizes_column;
  } else if (display === ConfigDisplay.extra) {
    const configGUIDesktop = await import("../config/configDataDesktop");
    const configGUISpecialScreen = await import(
      "../config/configDataSpecialScreen"
    );
    GUI_CONFIG__ = {
      id: id,
      language: configDataFr,
      display: configGUIDesktop.configDataDesktop,
    };
    // GUI_CONFIG__.display.About.features.lgColumn =
    //   configGUISpecialScreen.configDataSpecialScreen.large.landing_features_column;
    GUI_CONFIG__.display.atom_sizes.lgColumn =
      configGUISpecialScreen.configDataSpecialScreen.extra_large.atom_sizes_column;
    GUI_CONFIG__.display.knowbook_sizes.lgColumn =
      configGUISpecialScreen.configDataSpecialScreen.extra_large.knowbook_sizes_column;
  }

  const guiConfigData = {
    guiConfigData: GUI_CONFIG__,
  };

  return guiConfigData;
}

export const I_getStaticPaths: GetStaticPaths = async (context) => {
  const paths = getAllConfigGui();
  return {
    paths,
    fallback: false,
  };
};

export const I_getStaticProps: GetStaticProps = async (context) => {
  const data = await getConfigDataGui(context.params);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: data,
  };
};
