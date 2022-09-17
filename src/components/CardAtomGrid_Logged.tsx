import { observer } from "mobx-react-lite";
import React from "react";
import { IAtom } from "../config/globals";
import { onEditKnowbooks } from "../handlers/handlers_Knowbooks";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../handlers/handlers_Saved";
import { onGoItemMainPage, showArticle } from "../handlers/handlers_Navigation";
import { IStores } from "../stores/RootStore";
import CardAtomGrid from "./CardAtomGrid";

interface IProps {
  stores: IStores;
  id: string;
  atoms: IAtom[];
}

const CardAtomGrid_Logged: React.FunctionComponent<IProps> = (props) => {
  return (
    <CardAtomGrid
      id={props.id}
      stores={props.stores}
      atoms={props.atoms}
      image_handler={showArticle(props.stores)}
      isItemSaved_handler={isItemSaved(props.stores)}
      isItemSavedActionable_handler={isItemSavedActivated(props.stores)}
      saved_handler={onSaved(props.stores)}
      edit_handler={onEditKnowbooks(props.stores)}
      top_handler={onGoItemMainPage(props.stores)}
    />
  );
};

export default observer(CardAtomGrid_Logged);
