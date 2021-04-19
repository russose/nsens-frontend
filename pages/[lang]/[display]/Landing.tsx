import { observer } from "mobx-react-lite";
import { useStores } from "../../../src/stores/_RootStoreHook";
import React from "react";
import LandingLayoutHybrid from "../../../src/components/layout/LandingLayoutHybrid";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getConfigData";
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";
import FormLoginSignup from "../../../src/components/FormLoginSignup";
import {
  onChangeUsernamePassword,
  onSubmitLoginSignup,
} from "../../../src/handlers/handlers_LoginSignup";
import { configPaths } from "../../../src/config/globals";
import { IFeature } from "../../../src/config/globals";
import { initializeAppAndRedirect } from "../../../src/libs/helpers_InitAndRedirect";

const Landing: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  initializeAppAndRedirect(stores, GUI_CONFIG);

  const slogan = GUI_CONFIG.language.landing.slogan;
  const description = GUI_CONFIG.language.landing.description;
  // const path_background_image = paths.landing.image_background;
  const path_logo = configPaths.image_logo_B;
  const path_image = configPaths.image_landing;
  const ratio_page = GUI_CONFIG.display.landing.ratio_page;
  // const ratio_main = GUI_CONFIG.display.landing.ratio_main;
  const ratio_logo = GUI_CONFIG.display.landing.ratio_logo;
  const ratio_image = GUI_CONFIG.display.landing.ratio_image;
  const placeholder_username =
    GUI_CONFIG.language.landing.loginSignup.username_placeholder;
  const password_placeholder =
    GUI_CONFIG.language.landing.loginSignup.password_placeholder;
  const missing_password_text =
    GUI_CONFIG.language.landing.loginSignup.missing_password_text;
  const login_label = GUI_CONFIG.language.landing.loginSignup.login_label;
  const signup_label = GUI_CONFIG.language.landing.loginSignup.signup_label;

  const loginSignup = (
    <FormLoginSignup
      stores={stores}
      placeholder_username={placeholder_username}
      placeholder_password={password_placeholder}
      missing_password_text={missing_password_text}
      label_login={login_label}
      label_signup={signup_label}
      handler_text={onChangeUsernamePassword(stores)}
      handler_button={onSubmitLoginSignup(stores)}
    />
  );

  const features: IFeature[] = GUI_CONFIG.language.landing.features.map(
    (item: object, index: number) => {
      return {
        title: GUI_CONFIG.language.landing.features[index].title,
        description: GUI_CONFIG.language.landing.features[index].description,
        // image_url: paths.landing.images_feature[index],
        icon: GUI_CONFIG.language.landing.features[index].icon,
      };
    }
  );

  const isLogged = stores.baseStore.isLogged;
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
      <AppLayout stores={stores}>
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
