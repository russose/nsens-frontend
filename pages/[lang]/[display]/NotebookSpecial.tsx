import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CardAtomGridDynamic from "../../../src/components/CardAtomGridDynamic";
import HeaderSEO from "../../../src/components/HeaderSEO";
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";
import {
  IAtom,
  IButton,
  TKnowbooksPages,
  initStateCat,
} from "../../../src/config/globals";
import { api_getSavedList } from "../../../src/libs/apiUserData";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { initializeMostviewed } from "../../../src/libs/helpersBase";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import { useStores } from "../../../src/stores/RootStoreHook";
import { buttons_sharing } from "../../../src/components/_buttons_definition";
import { IsItemInAnyKnowbook } from "../../../src/libs/helpersSavedKnowbooks";

const NotebookSpecial: React.FunctionComponent<IPage> = (props) => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  const stores = useStores();
  useEffect(() => {
    initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  }, []);

  const type = router.query.type;

  let knowbook_title = "";

  useEffect(() => {
    if (type === TKnowbooksPages.Mostviewed) {
      if (stores.baseStore.mostviewedIds.length === 0) {
        initializeMostviewed(stores).then(() => {
          setItems(
            stores.baseStore.getHistoryItems(stores.baseStore.mostviewedIds)
          );
        });
      } else {
        setItems(
          stores.baseStore.getHistoryItems(stores.baseStore.mostviewedIds)
        );
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    // if (type === TKnowbooksPages.AllSaved || TKnowbooksPages.NoKnowbook) {
    if (type === TKnowbooksPages.AllSaved) {
      api_getSavedList(stores.baseStore.paramsPage.lang).then(
        (saved: IAtom[]) => {
          stores.savedStore.setSavedWithHistory(saved, false);

          if (type === TKnowbooksPages.AllSaved) {
            setItems(
              stores.savedStore.savedItems.filter((item) => {
                return IsItemInAnyKnowbook(item.id, stores);
              })
            );
          }
          // else if (type === TKnowbooksPages.NoKnowbook) {
          //   setItems(ItemsInNoKnowbook(stores));
          // }
        }
      );
    }
  }, [router.isReady, stores.uiStore.getInitCompleted(initStateCat.userData)]);

  if (stores.uiStore.getInitCompleted(initStateCat.userData) !== true) {
    return <></>;
  }

  if (type === TKnowbooksPages.Mostviewed) {
    knowbook_title =
      props.GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.Mostviewed
        .title;
  } else if (type === TKnowbooksPages.AllSaved) {
    knowbook_title =
      props.GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.AllSaved
        .title;
  }
  // else if (type === TKnowbooksPages.NoKnowbook) {
  //   knowbook_title =
  //     props.GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.NoKnowbook
  //       .title;
  // }

  let addtional_buttons: IButton[];
  if (type === TKnowbooksPages.Mostviewed) {
    addtional_buttons = [...buttons_sharing(stores, router)];
  } else {
    addtional_buttons = [];
  }

  return (
    <AppLayout paramsPage={props.paramsPage}>
      <HeaderSEO stores={stores} title={knowbook_title} />
      <HeaderTitle
        stores={stores}
        title={knowbook_title}
        addtional_buttons_right={addtional_buttons}
        hidden={false}
      />
      <CardAtomGridDynamic
        id={"NotebookSpecial"}
        stores={stores}
        atoms={items}
      />
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(NotebookSpecial);
