import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import SEOHeaderTitle from "../../src/components/SEOHeaderTitle";
import AppLayout from "../../src/components/layout/AppLayout";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { useStores } from "../../src/stores/RootStoreHook";
import {
  initializeApp,
  initializeStaticKnowbooksFullPage,
} from "../../src/libs/helpersInitialize";
import ContentLoading from "../../src/components/ContentLoading";
// import CardKnowGridStatic from "../../src/components/CardKnowGridStatic";
import { empty_handler, getRandomImageFromItems } from "../../src/libs/utils";
import CardKnowList from "../../src/components/CardKnowList";
import {
  configPaths,
  IKnowbookStatic,
  StaticKnowbookFamilyType,
} from "../../src/config/globals";
import CardKnowListSpecial from "../../src/components/CardKnowListSpecial";
import { ICardKnowProps } from "../../src/components/CardKnow";

const Knowbooks: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;

  initializeApp(stores, paramsPage);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  initializeStaticKnowbooksFullPage(stores);
  if (stores.baseStore.initCompleted.staticKnowbooksFull !== true) {
    //Loading StaticKnowbooks Full (blocking)
    return <ContentLoading stores={stores} />;
  }

  const pathKnowbookMostviewed = configPaths.pages.KnowbookMostviewed;
  const knowbook_mostviewed_title =
    stores.baseStore.GUI_CONFIG.language.SEO.title_description
      .KnowbookMostviewed.title;

  let cardKnowPropsMostviewed: ICardKnowProps[];
  if (stores.baseStore.mostviewedIds.length !== 0) {
    cardKnowPropsMostviewed = [
      {
        id: pathKnowbookMostviewed,
        stores: stores,
        title: knowbook_mostviewed_title,
        image_url: getRandomImageFromItems(
          stores.baseStore.getHistoryItems(stores.baseStore.mostviewedIds)
        ),
        pathname: pathKnowbookMostviewed,
        queryObject: { ...stores.baseStore.paramsPage },
        amount: stores.baseStore
          .getHistoryItems(stores.baseStore.mostviewedIds)
          .filter((item) => {
            return item.image_url !== "";
          }).length,
        edit_handler: undefined,
        delete_handler: undefined,
      },
    ];
  } else {
    cardKnowPropsMostviewed = [];
  }

  const knowbooks = Array.from(stores.knowbookStore.staticKnowbooks.values());
  const knowbooks_sorted = knowbooks.sort(function (a, b) {
    if (a.type === StaticKnowbookFamilyType.TREND) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <AppLayout stores={stores}>
      <Box>
        <SEOHeaderTitle
          stores={stores}
          title={
            stores.baseStore.GUI_CONFIG.language.SEO.title_description
              .Knowbooks_Featured.title
          }
        />
        {/* <KnowbooksStatic stores={stores} /> */}
        {/* <CardKnowGridStatic
          id="knowbooksStatic"
          stores={stores}
          knowbooks={Array.from(stores.knowbookStore.staticKnowbooks.values())}
          edit_handler={empty_handler}
          delete_handler={empty_handler}
        /> */}
        <Box
          wrap={true}
          display="flex"
          direction="row"
          flex="grow"
          justifyContent="around"
        >
          <CardKnowListSpecial
            id="knowbooksSpecialMostviewed"
            stores={stores}
            cardKnowProps={cardKnowPropsMostviewed}
          />
          <CardKnowList
            id="knowbooksStatic"
            stores={stores}
            knowbooks={knowbooks_sorted}
            edit_handler={empty_handler}
            delete_handler={empty_handler}
            static={true}
          />
        </Box>
      </Box>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(Knowbooks);
