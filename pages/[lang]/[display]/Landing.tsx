import { observer } from "mobx-react-lite";
import LoginSignup from "../../../src/components/LoginSignup";
import { useStores } from "../../../src/stores/_RootStoreHook";
import React from "react";
import LandingLayoutHybrid from "../../../src/components/layout/LandingLayoutHybrid";
import { IFeature } from "../../../src/common/types";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/utilsConfigGui";

const Landing: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);

  // redirectHomeIfLogged(stores);

  const slogan = GUI_CONFIG.language.landing.slogan;
  const features_title = GUI_CONFIG.language.landing.features_title;
  // const path_background_image = GUI_CONFIG.paths.landing.image_background;
  const path_logo = GUI_CONFIG.paths.image_logo_B;
  const path_image = GUI_CONFIG.paths.image_landing;
  const ratio_page = GUI_CONFIG.display.landing.ratio_page;
  // const ratio_main = GUI_CONFIG.display.landing.ratio_main;
  const ratio_logo = GUI_CONFIG.display.landing.ratio_logo;
  const ratio_image = GUI_CONFIG.display.landing.ratio_image;
  const loginSignup = <LoginSignup />;

  const features: IFeature[] = GUI_CONFIG.language.landing.features.map(
    (item: object, index: number) => {
      return {
        title: GUI_CONFIG.language.landing.features[index].title,
        description: GUI_CONFIG.language.landing.features[index].description,
        // image_url: GUI_CONFIG.paths.landing.images_feature[index],
        icon: GUI_CONFIG.language.landing.features[index].icon,
      };
    }
  );

  return (
    <>
      <LandingLayoutHybrid
        stores={stores}
        slogan={slogan}
        features_title={features_title}
        // path_background_image={path_background_image}
        path_logo={path_logo}
        path_image={path_image}
        loginSignup={loginSignup}
        features={features}
        ratio_page={ratio_page}
        // ratio_main={ratio_main}
        ratio_logo={ratio_logo}
        ratio_image={ratio_image}
      ></LandingLayoutHybrid>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (constext) => {
  return await I_getStaticPaths(constext);
};

export default observer(Landing);
