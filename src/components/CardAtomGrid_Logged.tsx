import { observer } from "mobx-react-lite";
import React from "react";
import { IAtom } from "../config/globals";
import { showAtomContent } from "../handlers/handlers_Content";
import {
  IsItemInAnyKnowbook_handler,
  onEditKnowbooks,
} from "../handlers/handlers_Knowbooks";
import { onGoItemNetworkPage } from "../handlers/handlers_Navigation";
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

const CardAtomGrid_Logged: React.FunctionComponent<IProps> = (props) => {
  return (
    <CardAtomGrid
      id={props.id}
      stores={props.stores}
      atoms={props.atoms}
      // image_handler={showArticle(props.stores)}
      image_handler={showAtomContent(props.stores)}
      isInAnyKnowbook_handler={IsItemInAnyKnowbook_handler(props.stores)}
      // isItemSavedActionable_handler={isItemSavedActivated(props.stores)}
      // saved_handler={onSaved(props.stores)}
      edit_handler={onEditKnowbooks(props.stores)}
      top_handler={onGoItemNetworkPage(
        props.stores,
        props.desactivateGoNetwork
      )}
      size_factor={props.size_factor}
      externalyzeTitle={props.externalyzeTitle}
    />
  );
};

export default observer(CardAtomGrid_Logged);
