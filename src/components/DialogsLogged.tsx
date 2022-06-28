import React from "react";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";
import { TUiBooleanStorage } from "../config/globals";
import dynamic from "next/dynamic";

const DialogEditKnowbooks_D = dynamic(
  () => import("../components/DialogEditKnowbooks")
);
const DialogRenameKnowbooks_D = dynamic(
  () => import("../components/DialogRenameKnowbooks")
);

interface IDialogsLoggedProps {
  stores: IStores;
}

const DialogsLogged: React.FunctionComponent<IDialogsLoggedProps> = (props) => {
  const stores = props.stores;

  return (
    <>
      {stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.editKnowbookOpened
      ) ? (
        <DialogEditKnowbooks_D stores={stores} />
      ) : (
        <></>
      )}
      {stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.renameKnowbookOpened
      ) ? (
        <DialogRenameKnowbooks_D stores={stores} />
      ) : (
        <></>
      )}
    </>
  );
};

export default observer(DialogsLogged);
