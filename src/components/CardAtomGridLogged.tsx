import { observer } from "mobx-react-lite";
import React from "react";
import { IAtom } from "../config/globals";
import { onEditKnowbooks } from "../handlers/handlers_Knowbooks";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../handlers/handlers_Saved";
import { IStores } from "../stores/RootStore";
import CardAtomGrid from "./CardAtomGrid";

export type ICardAtomGridLoggedProps = {
  stores: IStores;
  id: string;
  items: IAtom[];
  static?: boolean;
};

const CardAtomGridLogged: React.FunctionComponent<ICardAtomGridLoggedProps> = (
  props
) => {
  const stores = props.stores;
  return (
    <CardAtomGrid
      id={props.id}
      stores={stores}
      atoms={props.items}
      isItemSaved_handler={isItemSaved(stores)}
      isItemSavedActionable_handler={isItemSavedActivated(stores)}
      saved_handler={onSaved(stores)}
      edit_handler={onEditKnowbooks(stores)}
      static={props.static}
    />
  );
};

export default observer(CardAtomGridLogged);
