import { observer } from "mobx-react-lite";
import React from "react";
import { IStores } from "../stores/RootStore";
import { configPaths } from "../../src/config/configLocalAndEnv";
import {
  onDeleteKnowbook,
  onOpenRenameKnowbook,
} from "../../src/handlers/handlers_Knowbooks";
import SVGKnowbook from "../../src/components/SVGKnowbook";
import SVGElementsInCircleWithSlider from "./SVGElementsInCircleWithSlider";
import {
  ICardKnowProps,
  IKnowbook,
  IPosition,
  SVG_T,
  TPageHeaderModes,
  TPages,
  TSpecialPages,
} from "../config/globals";
import SVGRoot from "./SVGRoot";
import { switchPageHeaderMode } from "../handlers/handlers_Searchbar_Navigation";

interface IProps {
  stores: IStores;
  closed: boolean;
  R0_large?: number;
  amountElementsLevel?: number;
  translation?: IPosition;
}

const SVGKnowbooksUser: React.FunctionComponent<IProps> = (props) => {
  const stores = props.stores;
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const title = props.stores.baseStore.GUI_CONFIG.language.labels.knowbookUser;
  const knowbook_all_title =
    GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.AllSaved.title;
  const knowbook_none_title =
    GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.NoKnowbook.title;
  const knowbook_all_image = configPaths.knowbook_all_image;
  const knowbook_none_image = configPaths.knowbook_none_image;
  const pathKnowbookSpecial = configPaths.pages.KnowbookSpecial;
  const pathKnowbook = configPaths.pages.Knowbook;

  if (!stores.baseStore.isLogged) {
    return <></>;
  }

  const handler = switchPageHeaderMode(
    stores,
    TPages.Home,
    TPageHeaderModes.homeUserKnowbooks
  );

  const root_element = (
    <SVGRoot
      stores={stores}
      title={title}
      onClick={props.closed ? handler : () => {}}
    />
  );

  const cardKnowPropsSavedNone: ICardKnowProps[] = [
    {
      id: pathKnowbookSpecial + "1",
      stores: stores,
      title: knowbook_all_title,
      image_url: knowbook_all_image,
      pathname: pathKnowbookSpecial,
      queryObject: { pageType: TSpecialPages.AllSaved },
      amount: stores.savedStore.saved.size,
      edit_handler: undefined,
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
      edit_handler: undefined,
      delete_handler: undefined,
    },
  ];

  const knowbooks: IKnowbook[] = [
    ...Array.from(stores.knowbookStore.knowbooks.values()),
  ];

  const elements: SVG_T[] = knowbooks.map((knowbook, index) => {
    return (
      <SVGKnowbook
        stores={stores}
        id={knowbook.name}
        title={knowbook.name}
        image_url={stores.knowbookStore.getImageKnowbook(knowbook.name)}
        pathname={pathKnowbook}
        queryObject={{ nameOrPeriod: knowbook.name }}
        amount={knowbook.items.length}
        edit_handler={onOpenRenameKnowbook(stores)}
        delete_handler={onDeleteKnowbook(stores)}
      />
    );
  });

  const special_elements: SVG_T[] = cardKnowPropsSavedNone.map(
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
    <SVGElementsInCircleWithSlider
      stores={stores}
      id="SVGKnowbooksUser"
      root_element={root_element}
      closed={props.closed}
      elements_body_all_SVG_or_ItemIds={[...elements, ...special_elements]}
      R0_large={props.R0_large}
      amountElementsLevel={props.amountElementsLevel}
      translation={props.translation}
    />
  );
};

export default observer(SVGKnowbooksUser);
