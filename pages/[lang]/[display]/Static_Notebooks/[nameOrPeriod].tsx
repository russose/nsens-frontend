import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import {
  IPageStaticKnowbook,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../../src/libs/getDataStaticKnowbooks";
import { initializeApp } from "../../../../src/libs/helpersInitialize";
import { useStores } from "../../../../src/stores/RootStoreHook";
import HeaderTitle from "../../../../src/components/HeaderTitle";
import CardAtomGridDynamic from "../../../../src/components/CardAtomGridDynamic";
import HeaderSEO from "../../../../src/components/HeaderSEO";
import AppLayout from "../../../../src/components/layout/AppLayout";
import { IStores } from "../../../../src/stores/RootStore";
import {
  IKnowbookStatic,
  IRelatedAtomFull,
  IStaticKnowbookWithItemsDefinition,
} from "../../../../src/config/globals";
import { readRelatedStringFromItem } from "../../../../src/libs/helpersRelated";

async function initializeStaticKnowbook(
  stores: IStores,
  staticKnowbookDefinition: IStaticKnowbookWithItemsDefinition
) {
  if (
    stores.knowbookStore.staticKnowbooks.get(
      staticKnowbookDefinition.nameOrPeriod
    ) !== undefined
  ) {
    if (
      stores.knowbookStore.staticKnowbooks.get(
        staticKnowbookDefinition.nameOrPeriod
      ).items.length !== 0
    ) {
      return;
    }
  }

  const knowbook: IKnowbookStatic = {
    id: -1, //id not used in front but only in back
    language: staticKnowbookDefinition.lang,
    type: staticKnowbookDefinition.type,
    name: staticKnowbookDefinition.nameOrPeriod,
    name_display: staticKnowbookDefinition.name_display,
    items: staticKnowbookDefinition.items,
  };
  stores.knowbookStore.setStaticKnowbooks(knowbook.name, knowbook);

  stores.baseStore.setHistory(knowbook.items, true);

  knowbook.items.forEach((atom) => {
    const related: IRelatedAtomFull[] = readRelatedStringFromItem(atom);
    stores.baseStore.setRelated(atom.id, related);
  });
}

const BestKnowbook: React.FunctionComponent<IPageStaticKnowbook> = (props) => {
  const stores = useStores();
  initializeApp(stores, props.paramsPage, props.GUI_CONFIG);

  const name_display = props.staticKnowbook.name_display;
  initializeStaticKnowbook(stores, props.staticKnowbook);
  const items = props.staticKnowbook.items;

  let description = "";
  props.staticKnowbook.items.forEach((item) => {
    description = description + " | " + item.title;
  });

  const content = (
    <>
      <HeaderSEO
        stores={stores}
        title={
          stores.baseStore.GUI_CONFIG.language.SEO.title_description
            .StaticKnowbook.title +
          " " +
          name_display
        }
        additional_description={description}
      />
      <HeaderTitle stores={stores} title={name_display} />
      <CardAtomGridDynamic
        id={`BestKnowbook-${name_display}`}
        stores={stores}
        atoms={items}
        SSR={true}
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

export default observer(BestKnowbook);
