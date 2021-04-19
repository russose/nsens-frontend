import { configDataFr } from "../common/configDataFr";
import { ConfigLanguage, ConfigDisplay, GUI_CONFIG_T } from "../common/globals";
import { GetStaticPaths, GetStaticProps } from "next";

export interface IPage {
  guiConfigData: GUI_CONFIG_T;
}

function getAllConfig() {
  const guiConfigList = [
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.mobile } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.desktop } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.large } },
  ];

  return guiConfigList;
}

async function getConfigData(params: any): Promise<GUI_CONFIG_T> {
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
    const configGUIMobile = await import("../common/configDataMobile");
    GUI_CONFIG__ = {
      id: id,
      language: configDataFr,
      display: configGUIMobile.configDataMobile,
    };
  } else if (display === ConfigDisplay.mobile) {
    const configGUIMobile = await import("../common/configDataMobile");
    GUI_CONFIG__ = {
      id: id,
      language: configDataFr,
      display: configGUIMobile.configDataMobile,
    };
  } else if (display === ConfigDisplay.desktop) {
    const configGUIDesktop = await import("../common/configDataDesktop");
    GUI_CONFIG__ = {
      id: id,
      language: configDataFr,
      display: configGUIDesktop.configDataDesktop,
    };
    // GUI_CONFIG__.display = displayDesktop;
  } else if (display === ConfigDisplay.large) {
    const configGUIDesktop = await import("../common/configDataDesktop");
    const configGUISpecialScreen = await import(
      "../common/configDataSpecialScreen"
    );
    GUI_CONFIG__ = {
      id: id,
      language: configDataFr,
      display: configGUIDesktop.configDataDesktop,
    };
    // GUI_CONFIG__.display = displayDesktop;
    GUI_CONFIG__.display.landing.features.lgColumn =
      configGUISpecialScreen.configDataSpecialScreen.large.landing_features_column;
    GUI_CONFIG__.display.atom_sizes.lgColumn =
      configGUISpecialScreen.configDataSpecialScreen.large.atom_sizes_column;
    GUI_CONFIG__.display.knowbook_sizes.lgColumn =
      configGUISpecialScreen.configDataSpecialScreen.large.atom_sizes_column;
  }

  const guiConfigData = {
    ...GUI_CONFIG__,
  };

  return guiConfigData;
}

export const I_getStaticPaths: GetStaticPaths = async (context) => {
  const paths = getAllConfig();
  return {
    paths,
    fallback: false,
  };
};

export const I_getStaticProps: GetStaticProps = async (context) => {
  const guiConfigData = await getConfigData(context.params);
  if (!guiConfigData) {
    return {
      notFound: true,
    };
  }
  return {
    props: { guiConfigData },
  };
};
