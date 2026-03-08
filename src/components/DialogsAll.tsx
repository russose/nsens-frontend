import { observer } from "mobx-react-lite";
import React from "react";
import { TUiBooleanStorage } from "../config/globals";
import { IStores } from "../stores/RootStore";
import DialogWikiArticle from "./DialogWikiArticle";
import DialogEditKnowbooks from "./DialogEditKnowbooks";
import DialogEditKnowbookProps from "./DialogEditKnowbookProps";
import DialogHistory from "./DialogHistory";
import DialogSharing from "./DialogSharing";
import DialogEditUserProps from "./DialogEditUserProps";
import DialogArxivContent from "./DialogArxivContent";
import DialogBookContent from "./DialogBookContent";

interface IDialogsLoggedProps {
  stores: IStores;
}

const DialogsAll: React.FunctionComponent<IDialogsLoggedProps> = (props) => {
  const stores = props.stores;

  return (
    <>
      {props.stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showWikiArticle
      ) ? (
        <DialogWikiArticle stores={props.stores} />
      ) : (
        <></>
      )}

      {props.stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showArxivCentent
      ) ? (
        <DialogArxivContent stores={props.stores} />
      ) : (
        <></>
      )}

      {props.stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showBookCentent
      ) ? (
        <DialogBookContent stores={props.stores} />
      ) : (
        <></>
      )}

      {props.stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showHistory
      ) ? (
        <DialogHistory stores={props.stores} />
      ) : (
        <></>
      )}

      {stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showEditKnowbooks
      ) ? (
        <DialogEditKnowbooks stores={stores} />
      ) : (
        <></>
      )}
      {/* {stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.renameKnowbookOpened
      ) ? (
        <DialogRenameKnowbooks stores={stores} />
      ) : (
        <></>
      )} */}
      {stores.uiStore.getUiBooleanStorage(TUiBooleanStorage.showSharing) ? (
        <DialogSharing stores={stores} />
      ) : (
        <></>
      )}
      {stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showEditKnowbookProps
      ) ? (
        <DialogEditKnowbookProps stores={stores} />
      ) : (
        <></>
      )}
      {stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showEditUserProps
      ) ? (
        <DialogEditUserProps stores={stores} />
      ) : (
        <></>
      )}
    </>
  );
};

export default observer(DialogsAll);
