import { observer } from "mobx-react-lite";
import { useStores } from "../../src/stores/RootStoreHook";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import AppLayout from "../../src/components/layout/AppLayout";
import { initializeApp } from "../../src/libs/helpersInitialize";
import SocialAndContacts from "../../src/components/SocialAndContacts";
import ContentLoading from "../../src/components/ContentLoading";
import Reveal_Presentation from "../../src/components/reveal/Reveal_Presentation";
import AboutContent from "../../src/components/reveal/AboutContent";
import { makeScreenshoots } from "../../src/libs/utilsServer";

const About: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);

  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const ratio_presentation = GUI_CONFIG.display.About.ratio_presentation;

  const contacts = <SocialAndContacts stores={stores} />;

  const revealSlides = (
    <Reveal_Presentation height={ratio_presentation}>
      <AboutContent stores={stores} />
    </Reveal_Presentation>
  );

  return (
    <AppLayout
      stores={stores}
      titleSEO={GUI_CONFIG.language.SEO.title_description.About.title}
      isBodySVG={false}
    >
      {revealSlides}
      {contacts}
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  makeScreenshoots();
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(About);
