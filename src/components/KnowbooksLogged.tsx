import React from "react";
import { observer } from "mobx-react";
import { IStores } from "../stores/RootStore";
import CardKnowGridSpecial from "./CardKnowGridSpecial";
import CardKnowGrid from "./CardKnowGrid";
import {
  onDeleteKnowbook,
  onOpenRenameKnowbook,
} from "../handlers/handlers_Knowbooks";
import { ICardKnowProps } from "./CardKnow";
import { configPaths } from "../config/globals";

interface IKnowbooksLoggedProps {
  stores: IStores;
}

const KnowbooksLogged: React.FunctionComponent<IKnowbooksLoggedProps> = (
  props
) => {
  const stores = props.stores;
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const knowbook_all_title = GUI_CONFIG.language.knowbooks.AllSaved_title;
  const knowbook_none_title = GUI_CONFIG.language.knowbooks.None_Title;
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
      // pathname: pathKnowbookSaved,
      // queryObject: {},
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
      // pathname: pathKnowbookNone,
      // queryObject: {},
      pathname: pathKnowbookNone,
      queryObject: { ...stores.baseStore.paramsPage },
      amount: "?",
      edit_handler: undefined,
      delete_handler: undefined,
    },
  ];

  return (
    <>
      <CardKnowGrid
        id="knowbooks"
        stores={stores}
        knowbooks={Array.from(stores.knowbookStore.knowbooks.values())}
        edit_handler={onOpenRenameKnowbook(stores)}
        delete_handler={onDeleteKnowbook(stores)}
      />
      <CardKnowGridSpecial
        id="knowbooksSpecial"
        stores={stores}
        cardKnowProps={cardKnowPropsSavedNone}
      />
    </>
  );
};

export default observer(KnowbooksLogged);
