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
import { initializeApp } from "../../src/libs/helpersInitialize";
// import dynamic from "next/dynamic";
import Separator from "../../src/components/Separator";
import ContentLoading from "../../src/components/ContentLoading";
import CatchupMessage from "../../src/components/CatchupMessage";
import { configPaths } from "../../src/config/configLocalAndEnv";
import { ICardKnowProps } from "../../src/components/CardKnow";
// import CardKnowGrid from "../../src/components/CardKnowGrid";
import {
  onDeleteKnowbook,
  onOpenRenameKnowbook,
} from "../../src/handlers/handlers_Knowbooks";
import CardKnowListSpecial from "../../src/components/CardKnowListSpecial";
import CardKnowList from "../../src/components/CardKnowList";

// const KnowbooksLoggedDynamic = dynamic(
//   () => import("../../src/components/KnowbooksLogged"),
//   { ssr: true }
// );
// const CatchupMessageDynamic = dynamic(
//   () => import("../../src/components/CatchupMessage"),
//   { ssr: false }
// );

const Knowbooks: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  // initializeKnowbooks(stores);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const knowbook_all_title =
    GUI_CONFIG.language.SEO.title_description.KnowbookSaved.title;
  const knowbook_none_title =
    GUI_CONFIG.language.SEO.title_description.KnowbookNone.title;
  const knowbook_all_image = configPaths.knowbook_all_image;
  const knowbook_none_image = configPaths.knowbook_none_image;
  const pathKnowbookSaved = configPaths.pages.KnowbookSaved;
  const pathKnowbookNone = configPaths.pages.KnowbookNone;

  const cardKnowPropsSavedNone: ICardKnowProps[] = [
    {
      id: pathKnowbookSaved,
      stores: stores,
      title: knowbook_all_title,
      image_url: knowbook_all_image,
      pathname: pathKnowbookSaved,
      queryObject: { ...stores.baseStore.paramsPage },
      amount: stores.savedStore.saved.size,
      edit_handler: undefined,
      delete_handler: undefined,
    },
    {
      id: pathKnowbookNone,
      stores: stores,
      title: knowbook_none_title,
      image_url: knowbook_none_image,
      pathname: pathKnowbookNone,
      queryObject: { ...stores.baseStore.paramsPage },
      amount: "-",
      edit_handler: undefined,
      delete_handler: undefined,
    },
  ];

  let message;
  let knowbooksUser;
  if (stores.baseStore.isLogged) {
    // knowbooksUser = <KnowbooksLoggedDynamic stores={stores} />;

    knowbooksUser = (
      <>
        {/* <CardKnowGrid
          id="knowbooks"
          stores={stores}
          knowbooks={Array.from(stores.knowbookStore.knowbooks.values())}
          edit_handler={onOpenRenameKnowbook(stores)}
          delete_handler={onDeleteKnowbook(stores)}
        /> */}
        <Box
          wrap={true}
          display="flex"
          direction="row"
          flex="grow"
          justifyContent="around"
        >
          <CardKnowList
            id="knowbooks"
            stores={stores}
            knowbooks={Array.from(stores.knowbookStore.knowbooks.values())}
            edit_handler={onOpenRenameKnowbook(stores)}
            delete_handler={onDeleteKnowbook(stores)}
            static={false}
          />
          <CardKnowListSpecial
            id="knowbooksSpecial"
            stores={stores}
            cardKnowProps={cardKnowPropsSavedNone}
          />
        </Box>
      </>
    );
    message = <></>;
  } else {
    knowbooksUser = <></>;
    message = (
      <>
        <Separator with_line={false} />
        <Separator with_line={false} />
        <CatchupMessage stores={stores} withButton={true} />
      </>
    );
  }

  return (
    <AppLayout stores={stores}>
      <Box>
        <SEOHeaderTitle
          stores={stores}
          title={
            stores.baseStore.GUI_CONFIG.language.SEO.title_description
              .Knowbooks_User.title
          }
        />
        {knowbooksUser}
        {message}
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
