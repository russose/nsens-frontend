import React from "react";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";
import DialogEditKnowbooks from "./DialogEditKnowbooks";
import DialogRenameKnowbooks from "./DialogRenameKnowbooks";

interface IDialogsLoggedProps {
  stores: IStores;
}

const DialogsLogged: React.FunctionComponent<IDialogsLoggedProps> = (props) => {
  const stores = props.stores;

  return (
    <>
      <DialogEditKnowbooks stores={stores} />
      <DialogRenameKnowbooks stores={stores} />
    </>
  );
};

export default observer(DialogsLogged);
