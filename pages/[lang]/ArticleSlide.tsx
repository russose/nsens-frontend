import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import AppLayout from "../../src/components/layout/AppLayout";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { initializeApp } from "../../src/libs/helpersInitialize";
import { useStores } from "../../src/stores/RootStoreHook";
import ContentLoading from "../../src/components/ContentLoading";
import Reveal_Presentation from "../../src/components/reveal/Reveal_Presentation";
import HeaderTitle from "../../src/components/HeaderTitle";
import ArticleSlideContent from "../../src/components/reveal/ArticleSlideContent";

const NotebookSlide: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const router = useRouter();
  const selected_knowbook = router.query.nameOrPeriod as string;

  const heightSlideArticle =
    stores.baseStore.GUI_CONFIG.display.layout.heightSlideArticle;

  const config = {
    embedded: false,
    disableLayout: true,
    overview: false,
    loop: true,
    // autoSlide: 10000,
  };
  const revealSlides = (
    <Reveal_Presentation config={config} height={heightSlideArticle}>
      <ArticleSlideContent stores={stores} />
    </Reveal_Presentation>
  );

  return (
    <AppLayout stores={stores} titleSEO={selected_knowbook} isBodySVG={false}>
      <HeaderTitle stores={stores} title={selected_knowbook} />
      {revealSlides}
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(NotebookSlide);
