import { observer } from "mobx-react-lite";
import React from "react";
import { IAtom } from "../config/globals";
import {
  goUserHandler_,
  onGoItemMainPage,
  showArticle,
} from "../handlers/handlers_Navigation";
import { IStores } from "../stores/RootStore";
import CardAtomGrid from "./CardAtomGrid";

interface IProps {
  stores: IStores;
  id: string;
  atoms: IAtom[];
}

const CardAtomGrid_NotLogged: React.FunctionComponent<IProps> = (props) => {
  return (
    <CardAtomGrid
      id={props.id}
      stores={props.stores}
      atoms={props.atoms}
      image_handler={showArticle(props.stores)}
      isItemSaved_handler={undefined}
      isItemSavedActionable_handler={undefined}
      saved_handler={goUserHandler_(props.stores)}
      edit_handler={undefined}
      top_handler={onGoItemMainPage(props.stores)}
    />
  );
};

export default observer(CardAtomGrid_NotLogged);
