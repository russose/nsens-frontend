import { observer } from "mobx-react-lite";
import React from "react";
import { IAtom } from "../config/globals";
import { showAtomContent } from "../handlers/handlers_Content";
import {
  goUserHandler_,
  onGoItemNetworkPage,
} from "../handlers/handlers_Navigation";
import { IStores } from "../stores/RootStore";
import CardAtomGrid from "./CardAtomGrid";

interface IProps {
  stores: IStores;
  id: string;
  atoms: IAtom[];
  size_factor?: number;
  desactivateGoNetwork?: boolean;
  externalyzeTitle?: boolean;
}

const CardAtomGrid_NotLogged: React.FunctionComponent<IProps> = (props) => {
  return (
    <CardAtomGrid
      id={props.id}
      stores={props.stores}
      atoms={props.atoms}
      image_handler={showAtomContent(props.stores)}
      isInAnyKnowbook_handler={undefined}
      // isItemSavedActionable_handler={undefined}
      // saved_handler={goUserHandler_(props.stores)}
      // edit_handler={undefined}
      edit_handler={goUserHandler_(props.stores)}
      top_handler={onGoItemNetworkPage(
        props.stores,
        props.desactivateGoNetwork
      )}
      size_factor={props.size_factor}
      externalyzeTitle={props.externalyzeTitle}
    />
  );
};

export default observer(CardAtomGrid_NotLogged);
