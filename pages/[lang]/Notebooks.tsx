import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import AppLayout from "../../src/components/layout/AppLayout";
import { useStores } from "../../src/stores/RootStoreHook";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { initializeApp } from "../../src/libs/helpersInitialize";
import ContentLoading from "../../src/components/ContentLoading";
import {
  onDeleteKnowbook,
  onOpenRenameKnowbook,
} from "../../src/handlers/handlers_Knowbooks";
import {
  configPaths,
  ICardKnowProps,
  TSpecialPages,
} from "../../src/config/globals";
import { getRandomImageFromItems } from "../../src/libs/utils";
import CardKnowGrid from "../../src/components/CardKnowGrid";
import Separator from "../../src/components/Separator";
import HeaderTitle from "../../src/components/HeaderTitle";

const Notebooks: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;

  initializeApp(stores, paramsPage);
  // To be checked/deleted: Initialyzed until userData to avoid allRelatedIdsForHome being refreshed 1000s times because of home update
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const pathKnowbookStatic = configPaths.pages.StaticKnowbook;
  const pathKnowbookSpecial = configPaths.pages.KnowbookSpecial;
  const knowbook_mostviewed_title =
    stores.baseStore.GUI_CONFIG.language.SEO.title_description.KnowbookSpecial
      .Mostviewed.title;
  const knowbook_all_title =
    stores.baseStore.GUI_CONFIG.language.SEO.title_description.KnowbookSpecial
      .AllSaved.title;
  const knowbook_none_title =
    stores.baseStore.GUI_CONFIG.language.SEO.title_description.KnowbookSpecial
      .NoKnowbook.title;
  const knowbook_all_image = configPaths.knowbook_all_image;
  const knowbook_none_image = configPaths.knowbook_none_image;
  const pathKnowbook = configPaths.pages.Knowbook;

  let cardKnowPropsMostviewed: ICardKnowProps[];
  if (stores.baseStore.mostviewedIds.length !== 0) {
    cardKnowPropsMostviewed = [
      {
        id: pathKnowbookSpecial,
        stores: stores,
        title: knowbook_mostviewed_title,
        image_url: getRandomImageFromItems(
          stores.baseStore.getHistoryItems(stores.baseStore.mostviewedIds)
        ),
        pathname: pathKnowbookSpecial,
        queryObject: { pageType: TSpecialPages.Mostviewed },
        amount: 0,
        rename_handler: undefined,
        delete_handler: undefined,
      },
    ];
  } else {
    cardKnowPropsMostviewed = [];
  }

  const cardKnowPropsStatic: ICardKnowProps[] = Array.from(
    stores.knowbookStore.staticKnowbooks.values()
  ).map((item) => {
    return {
      id: item.name,
      stores: stores,
      title: item.name_display,
      // image_url: getRandomImageFromItems(item.items),
      image_url: stores.knowbookStore.getImageStaticKnowbook(item.name),
      pathname: pathKnowbookStatic,
      queryObject: { nameOrPeriod: item.name },
      amount: undefined,
      // edit_handler: onEditKnowbooks(stores),
      // delete_handler: onDeleteKnowbook(stores),
      rename_handler: undefined,
      delete_handler: undefined,
    };
  });

  const content = (
    <>
      <HeaderTitle
        stores={stores}
        title={stores.baseStore.GUI_CONFIG.language.labels.knowbookFeatured}
      />
      <CardKnowGrid
        id="Notebooks"
        stores={stores}
        knowbooks={[...cardKnowPropsMostviewed, ...cardKnowPropsStatic]}
      />
    </>
  );

  let content_logged = <></>;
  if (stores.baseStore.isLogged) {
    const cardKnowPropsSavedNone: ICardKnowProps[] = [
      {
        id: pathKnowbookSpecial + "1",
        stores: stores,
        title: knowbook_all_title,
        image_url: knowbook_all_image,
        pathname: pathKnowbookSpecial,
        queryObject: { pageType: TSpecialPages.AllSaved },
        amount: stores.savedStore.saved.size,
        rename_handler: undefined,
        delete_handler: undefined,
      },
      {
        id: pathKnowbookSpecial + "2",
        stores: stores,
        title: knowbook_none_title,
        image_url: knowbook_none_image,
        pathname: pathKnowbookSpecial,
        queryObject: { pageType: TSpecialPages.NoKnowbook },
        amount: "-",
        rename_handler: undefined,
        delete_handler: undefined,
      },
    ];

    const cardKnowPropsLogged: ICardKnowProps[] = Array.from(
      stores.knowbookStore.knowbooks.values()
    ).map((item) => {
      return {
        id: item.name,
        stores: stores,
        title: item.name,
        // image_url: getRandomImageFromItems(
        //   stores.baseStore.getHistoryItems(item.items)
        // ),
        image_url: stores.knowbookStore.getImageKnowbook(item.name),
        pathname: pathKnowbook,
        queryObject: { nameOrPeriod: item.name },
        amount: item.items.length,
        // edit_handler: onEditKnowbooks(stores),
        // delete_handler: onDeleteKnowbook(stores),
        rename_handler: onOpenRenameKnowbook(stores),
        delete_handler: onDeleteKnowbook(stores),
      };
    });

    content_logged = (
      <>
        <HeaderTitle
          stores={stores}
          title={stores.baseStore.GUI_CONFIG.language.labels.knowbookUser}
        />
        <CardKnowGrid
          id="NotebooksLogged"
          stores={stores}
          knowbooks={[...cardKnowPropsLogged, ...cardKnowPropsSavedNone]}
        />
        <Separator with_line={true} />
      </>
    );
  }

  return (
    <>
      <AppLayout
        stores={stores}
        titleSEO={
          stores.baseStore.GUI_CONFIG.language.SEO.title_description.Knowbooks
            .title
        }
        isBodySVG={false}
      >
        {content_logged}
        {content}
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(Notebooks);
