import { observer } from "mobx-react-lite";
import React from "react";
import { IStores } from "../stores/RootStore";
import {
  configPaths,
  ICardKnowProps,
  IKnowbookStatic,
  IPosition,
  SVG_T,
  TPageHeaderModes,
  TSpecialPages,
  TPages,
} from "../../src/config/globals";
import { getRandomImageFromItems } from "../../src/libs/utils";
import SVGKnowbook from "../../src/components/SVGKnowbook";
import SVGRoot from "./SVGRoot";
import { switchPageHeaderMode } from "../handlers/handlers_Searchbar_Navigation";
import SVGElementsInPlanWithSlider from "./SVGElementsInPlanWithSlider";

interface IProps {
  stores: IStores;
  closed: boolean;
  R0_large?: number;
  amountElementsLevel?: number;
  translation?: IPosition;
}

const SVGKnowbooksFeatured: React.FunctionComponent<IProps> = (props) => {
  const stores = props.stores;
  const title =
    props.stores.baseStore.GUI_CONFIG.language.labels.knowbookFeatured;
  const pathKnowbookSpecial = configPaths.pages.KnowbookSpecial;
  const knowbook_mostviewed_title =
    stores.baseStore.GUI_CONFIG.language.SEO.title_description.KnowbookSpecial
      .Mostviewed.title;

  const handler = switchPageHeaderMode(
    stores,
    TPages.Home,
    TPageHeaderModes.homeFeaturedKnowbooks
  );

  const root_element = (
    <SVGRoot
      stores={stores}
      title={title}
      onClick={props.closed ? handler : undefined}
    />
  );

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
        edit_handler: undefined,
        delete_handler: undefined,
      },
    ];
  } else {
    cardKnowPropsMostviewed = [];
  }

  const static_knowbooks: IKnowbookStatic[] = [
    ...Array.from(stores.knowbookStore.staticKnowbooks.values()),
  ];

  const static_elements: SVG_T[] = static_knowbooks.map(
    (staticKnowbook, index) => {
      return (
        <SVGKnowbook
          stores={stores}
          id={staticKnowbook.name}
          title={
            stores.knowbookStore.staticKnowbooks.get(staticKnowbook.name)
              .name_display
          }
          image_url={stores.knowbookStore.getImageStaticKnowbook(
            staticKnowbook.name
          )}
          pathname={configPaths.pages.StaticKnowbook}
          queryObject={{ nameOrPeriod: staticKnowbook.name }}
          amount={0}
          edit_handler={undefined}
          delete_handler={undefined}
        />
      );
    }
  );

  const special_elements: SVG_T[] = cardKnowPropsMostviewed.map(
    (item: ICardKnowProps) => {
      return (
        <SVGKnowbook
          stores={stores}
          id={item.id}
          title={item.title}
          image_url={item.image_url}
          pathname={item.pathname}
          queryObject={item.queryObject}
          amount={0}
          edit_handler={undefined}
          delete_handler={undefined}
        />
      );
    }
  );

  return (
    <SVGElementsInPlanWithSlider
      stores={stores}
      id="SVGKnowbooksFeatured"
      root_element={root_element}
      closed={props.closed}
      elements_body_all_SVG_or_ItemIds={[
        ...special_elements,
        ...static_elements,
      ]}
      translation={props.translation}
    />
  );
};

export default observer(SVGKnowbooksFeatured);
