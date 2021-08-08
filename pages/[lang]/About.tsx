import { observer } from "mobx-react";
import { useStores } from "../../src/stores/RootStoreHook";
import React from "react";
import AboutLayoutHybrid from "../../src/components/layout/AboutLayoutHybrid";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import SEOHeaderTitle from "../../src/components/SEOHeaderTitle";
import AppLayout from "../../src/components/layout/AppLayout";
import {
  configPaths,
  getEmail,
  getTwitter,
  IFeature,
} from "../../src/config/globals";
import { initializeApp } from "../../src/libs/helpersInitialize";
import { isInstalled } from "../../src/libs/utils";
import Installation from "../../src/components/Installation";
import Contacts from "../../src/components/Contacts";
import { Box, Image } from "gestalt";
import { isMobile } from "../../src/libs/helpersBase";

const About: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <></>;
  }

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const slogan = GUI_CONFIG.language.about.slogan;
  // const description = GUI_CONFIG.language.about.description;
  const path_logo = configPaths.image_logo_B;
  const path_image_main = configPaths.image_landing;
  const ratio_logo = GUI_CONFIG.display.About.ratio_logo;
  const ratio_image = GUI_CONFIG.display.About.ratio_image;

  const ratio_page = isMobile(stores)
    ? GUI_CONFIG.display.About.ratio_page_number
    : GUI_CONFIG.display.About.ratio_page_vh;

  const features: IFeature[] = GUI_CONFIG.language.about.features.map(
    (item: object, index: number) => {
      return {
        title: GUI_CONFIG.language.about.features[index].title,
        description: GUI_CONFIG.language.about.features[index].description,
        // image_url: paths.landing.images_feature[index],
        icon: GUI_CONFIG.language.about.features[index].icon,
      };
    }
  );

  const contact = GUI_CONFIG.language.user.contact;

  const installation_instructions = !isInstalled() && isMobile(stores) && (
    <Installation
      height="25vh"
      path_image={configPaths.image_install}
      instruction={GUI_CONFIG.language.user.install_instructions}
    />
  );

  const contacts = (
    <Contacts
      email={getEmail()}
      twitter_link={getTwitter()}
      text={contact}
      icon_size={32}
      text_size="lg"
    />
  );

  const main_image = (
    <Box padding={0} height={ratio_image} width="100%">
      <Image
        alt={GUI_CONFIG.language.about.slogan}
        color="transparent"
        fit="contain"
        naturalHeight={1}
        naturalWidth={1}
        loading="lazy"
        src={path_image_main}
      ></Image>
    </Box>
  );

  return (
    <AppLayout stores={stores}>
      <SEOHeaderTitle stores={stores} title={slogan} hidden={true} />
      <AboutLayoutHybrid
        stores={stores}
        slogan={slogan}
        // description={description}
        path_logo={path_logo}
        main_image={main_image}
        // path_image={path_image}
        // loginSignup={loginSignup}
        features={features}
        ratio_page={ratio_page}
        ratio_logo={ratio_logo}
        contacts={contacts}
        installation_instructions={installation_instructions}
        // ratio_image={ratio_image}
      ></AboutLayoutHybrid>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(About);
