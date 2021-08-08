import { observer } from "mobx-react";
import React from "react";
import { IAtom } from "../config/types";
import { goUserHandler } from "../libs/helpersBase";
import { empty_handler } from "../libs/utils";
import { IStores } from "../stores/RootStore";
import CardAtomGrid from "./CardAtomGrid";

export type ICardAtomGridNotLoggedProps = {
  stores: IStores;
  id: string;
  items: IAtom[];
  static?: boolean;
};

const CardAtomGridNotLogged: React.FunctionComponent<ICardAtomGridNotLoggedProps> =
  (props) => {
    const stores = props.stores;

    return (
      <CardAtomGrid
        id={props.id}
        stores={stores}
        atoms={props.items}
        isItemSaved_handler={empty_handler}
        isItemSavedActionable_handler={() => {
          return true;
        }}
        saved_handler={goUserHandler(stores)}
        edit_handler={empty_handler}
        static={props.static}
      />
    );
  };

export default observer(CardAtomGridNotLogged);
