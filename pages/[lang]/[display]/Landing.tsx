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
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";

const Landing: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);

  // redirectHomeIfLogged(stores);

  const slogan = GUI_CONFIG.language.landing.slogan;
  const description = GUI_CONFIG.language.landing.description;
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

  const isLogged = stores.userStore.isLogged;
  let page;
  if (!isLogged) {
    page = (
      <>
        <HeaderTitle stores={stores} title={slogan} hidden={true} />
        <LandingLayoutHybrid
          stores={stores}
          slogan={slogan}
          description={description}
          path_logo={path_logo}
          path_image={path_image}
          loginSignup={loginSignup}
          features={features}
          ratio_page={ratio_page}
          ratio_logo={ratio_logo}
          ratio_image={ratio_image}
        ></LandingLayoutHybrid>
      </>
    );
  } else {
    page = (
      <AppLayout>
        <HeaderTitle stores={stores} title={slogan} hidden={true} />
        <LandingLayoutHybrid
          stores={stores}
          slogan={slogan}
          description={description}
          path_logo={path_logo}
          path_image={path_image}
          // loginSignup={loginSignup}
          features={features}
          ratio_page={ratio_page}
          ratio_logo={ratio_logo}
          ratio_image={ratio_image}
        ></LandingLayoutHybrid>
      </AppLayout>
    );
  }

  return <>{page}</>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (constext) => {
  return await I_getStaticPaths(constext);
};

export default observer(Landing);
