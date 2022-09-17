import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { useStores } from "../../../src/stores/RootStoreHook";
import { I_getStaticPaths } from "../../../src/libs/getDataParamsPage";
import {
  configFetching,
  configGeneral,
  configPaths,
  ICardKnowProps,
  TSpecialPages,
} from "../../../src/config/globals";
import HeaderSEO from "../../../src/components/HeaderSEO";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import AppLayout from "../../../src/components/layout/AppLayout";
import dynamic from "next/dynamic";
import { onGoNotebookPage } from "../../../src/handlers/handlers_Navigation";
import {
  IPageStaticKnowbooks,
  I_getStaticProps,
} from "../../../src/libs/getDataStaticKnowbooksMain";
import HeaderTitle from "../../../src/components/HeaderTitle";
import { makeScreenshoots } from "../../../src/libs/utilsServer";
import { buildAllStaticKnowbooks } from "../../../src/libs/getDataStaticKnowbooksHelpers";

const CardKnowGrid_D = dynamic(
  () => import("../../../src/components/CardKnowGrid"),
  {
    ssr: false,
  }
);

const CardKnowPageLogged_D = dynamic(
  () => import("../../../src/components/CardKnowPage_Logged"),
  {
    ssr: false,
  }
);

// async function initializeStaticKnowbooksMain(
//   stores: IStores,
//   staticKnowbookDefinition: IStaticKnowbookDefinition[]
// ) {
//   if (stores.knowbookStore.staticKnowbooks.size! > 1) {
//     //>1 and not !==0 in case navigation starts with a static knobooks (ex: Art)
//     return;
//   }

//   for (const staticKnowbook of staticKnowbookDefinition) {
//     // const nameOrPeriod = staticKnowbook.nameOrPeriod;
//     const knowbook: IKnowbookStatic = {
//       id: -1, //id not used in front but only in back
//       language: staticKnowbook.lang,
//       type: staticKnowbook.type,
//       name: staticKnowbook.nameOrPeriod,
//       name_display: staticKnowbook.name_display,
//       // items:
//       //   stores.knowbookStore.staticKnowbooks.get(nameOrPeriod) === undefined
//       //     ? []
//       //     : stores.knowbookStore.staticKnowbooks.get(nameOrPeriod).items,
//       items: [],
//     };
//     stores.knowbookStore.setStaticKnowbooks(knowbook.name, knowbook);
//     stores.knowbookStore.setImageStaticKnowbook(
//       knowbook.name,
//       staticKnowbook.image_url
//     );
//   }
// }

const Notebooks: React.FunctionComponent<IPageStaticKnowbooks> = (props) => {
  const stores = useStores();
  initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  // initializeStaticKnowbooksMain(stores, props.staticKnowbooks);

  const GUI_CONFIG = props.GUI_CONFIG;
  const pathKnowbookStatic = configPaths.pages.StaticKnowbook;
  const pathKnowbookSpecial = configPaths.pages.KnowbookSpecial;
  const knowbook_mostviewed_title =
    GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.Mostviewed.title;
  const mostviewed_image = configPaths.mostviewed_image;

  let cardKnowPropsStatic: ICardKnowProps[] = [];
  let cardKnowPropsMostviewed: ICardKnowProps[] = [];
  let description = "";

  const staticKnowbookIDList: string[] = Array.from(
    props.staticKnowbooks.map((staticKnowbook) => {
      return staticKnowbook.nameOrPeriod;
    })
  );
  staticKnowbookIDList.forEach((staticKnowbookID) => {
    description = description + " | " + staticKnowbookID;
  });

  cardKnowPropsStatic = props.staticKnowbooks.map((item) => {
    return {
      id: item.nameOrPeriod,
      stores: stores,
      title: item.name_display,
      image_url: item.image_url,
      image_handler: onGoNotebookPage(stores)(pathKnowbookStatic, {
        nameOrPeriod: item.nameOrPeriod,
      }),
      amount: undefined,
      rename_handler: undefined,
      delete_handler: undefined,
    };
  });

  cardKnowPropsMostviewed = [
    {
      id: knowbook_mostviewed_title,
      stores: stores,
      title: knowbook_mostviewed_title,
      image_url: mostviewed_image,
      image_handler: onGoNotebookPage(stores)(pathKnowbookSpecial, {
        pageType: TSpecialPages.Mostviewed,
      }),
      amount: undefined,
      rename_handler: undefined,
      delete_handler: undefined,
    },
  ];

  const content = (
    <>
      <HeaderTitle
        stores={stores}
        title={GUI_CONFIG.language.labels.knowbookFeatured}
      />
      <CardKnowGrid_D
        id="Notebooks"
        stores={stores}
        knowbooks={[...cardKnowPropsMostviewed, ...cardKnowPropsStatic]}
        // knowbooks={cardKnowPropsStatic}
      />
    </>
  );

  let content_logged = <></>;
  if (stores.baseStore.isLogged) {
    content_logged = <CardKnowPageLogged_D stores={stores} />;
  }

  return (
    <>
      <AppLayout paramsPage={props.paramsPage}>
        <HeaderSEO
          stores={stores}
          title={GUI_CONFIG.language.SEO.title_description.Home.title}
          additional_description={description}
        />
        {content_logged}
        {content}
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (configGeneral.demoModeForScreenshoots) {
    makeScreenshoots();
  }
  if (configFetching.staticKnowbooks.refreshAllStaticKnowbooks) {
    buildAllStaticKnowbooks();
  }
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(Notebooks);
