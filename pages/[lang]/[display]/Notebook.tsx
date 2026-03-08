import { Box, SlimBanner } from "gestalt";
import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CardAtomGridDynamic from "../../../src/components/CardAtomGridDynamic";
import HeaderSEO from "../../../src/components/HeaderSEO";
import HeaderTitle from "../../../src/components/HeaderTitle";
import {
  buttons_Knowbook_Card,
  buttons_sharing,
} from "../../../src/components/_buttons_definition";
import AppLayout from "../../../src/components/layout/AppLayout";
import {
  IAtom,
  IKnowbookFull,
  TSource,
  TUiBooleanStorage,
  initStateCat,
} from "../../../src/config/globals";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { isMobile } from "../../../src/libs/helpersBase";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import { getAndStoreOneKnowbookFull } from "../../../src/libs/helpersSavedKnowbooks";
import { buildPublicName } from "../../../src/libs/utils";
import { useStores } from "../../../src/stores/RootStoreHook";

function reorder_items(items: IAtom[]): IAtom[] {
  function sort_by_name(items: IAtom[]): IAtom[] {
    const items_sorted_by_name: IAtom[] = items.sort((a, b) => {
      if (a.title < b.title) {
        //a est avant à b
        return -1;
      } else {
        //a est après à b
        return 1;
      }
    });

    return items_sorted_by_name;
  }

  const items_wiki = sort_by_name(
    items.filter((item) => {
      return item.source === TSource.wiki;
    })
  );

  const items_books = sort_by_name(
    items.filter((item) => {
      return item.source === TSource.books;
    })
  );

  const items_arxiv = sort_by_name(
    items.filter((item) => {
      return item.source === TSource.arxiv;
    })
  );

  const result: IAtom[] = items_books.concat(items_arxiv).concat(items_wiki);

  return result;
}

const Notebook: React.FunctionComponent<IPage> = (props) => {
  const router = useRouter();
  const stores = useStores();
  useEffect(() => {
    initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  }, []);

  const knowbook_name = router.query.title as string;
  const knowbook_id = Number(router.query.id);

  let knowbook = stores.knowbookStore.getKnowbookFromId(knowbook_id);

  const initialItems =
    knowbook !== undefined
      ? stores.baseStore.getHistoryItems(knowbook.items)
      : [];

  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    stores.uiStore.setSelectedKnowbook(knowbook_id);

    if (
      knowbook === undefined ||
      knowbook.items.length === 0 ||
      stores.baseStore.getHistoryItems(knowbook.items).length !==
        knowbook.items.length
    ) {
      if (stores.uiStore.getInitCompleted(initStateCat.userData) !== true) {
        return;
      }
      if (isNaN(knowbook_id)) {
        return;
      }

      getAndStoreOneKnowbookFull(stores, knowbook_id).then(
        (knowbookFull: IKnowbookFull) => {
          setItems(knowbookFull.items);
        }
      );
    }
  }, [
    router.isReady,
    stores.uiStore.getInitCompleted(initStateCat.userData),
    // items.length,
    // stores.baseStore.getHistoryItems(knowbook.items).length,
    // knowbook.items,
  ]);

  if (stores.uiStore.getInitCompleted(initStateCat.userData) !== true) {
    return <></>;
  }

  if (knowbook === undefined) {
    return <></>;
  }

  // Appel de l'observable pour forcer le rendu quand ca change
  stores.uiStore.getUiBooleanStorage(TUiBooleanStorage.showEditKnowbooks);

  let titleSEO: string =
    stores.baseStore.GUI_CONFIG.language.SEO.title_description.Knowbook.title +
    " " +
    knowbook_name;

  const buttons = buttons_Knowbook_Card(stores, knowbook);
  let addtional_buttons_left = [buttons[0]];
  let addtional_buttons_right = [
    buttons[1],
    buttons[2],
    ...buttons_sharing(stores, router, !knowbook.public),
  ];

  if (!isMobile(stores)) {
    addtional_buttons_right = addtional_buttons_left.concat(
      addtional_buttons_right
    );
    addtional_buttons_left = [];
  }

  const description = (
    <Box paddingX={4}>
      <SlimBanner
        type="recommendation"
        message={knowbook.description.length !== 0 ? knowbook.description : ""}
        iconAccessibilityLabel="Description"
        helperLink={{
          text:
            knowbook.sourceUrl.length !== 0 &&
            knowbook.sourceUrl.startsWith("https://")
              ? stores.baseStore.GUI_CONFIG.language.editKnowbookProps
                  .nameSource
              : "",
          accessibilityLabel:
            stores.baseStore.GUI_CONFIG.language.editKnowbookProps.nameSource,
          href: knowbook.sourceUrl,
          target: "blank",
        }}
      />
    </Box>
  );

  const displayDescription =
    knowbook.description.length !== 0 || knowbook.sourceUrl.length !== 0;

  const content = (
    <>
      <HeaderSEO stores={stores} title={titleSEO} />
      <HeaderTitle
        stores={stores}
        // title={knowbook_name}
        title={buildPublicName(knowbook.name, knowbook.owner_username)}
        // showSharing={true}
        // addtional_buttons={buttons_sharing(stores, router)}
        addtional_buttons_left={addtional_buttons_left}
        addtional_buttons_right={addtional_buttons_right}
        hidden={false}
      />
      {displayDescription && description}
      <CardAtomGridDynamic
        id={"Knowbook"}
        stores={stores}
        atoms={reorder_items(items)}
      />
    </>
  );

  return <AppLayout paramsPage={props.paramsPage}>{content}</AppLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(Notebook);
