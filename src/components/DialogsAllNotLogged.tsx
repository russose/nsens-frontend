import React from "react";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";
import { TUiBooleanStorage } from "../config/globals";
import dynamic from "next/dynamic";

const Article_D = dynamic(() => import("./DialogArticle"), {
  ssr: false,
});
const History_D = dynamic(() => import("./DialogHistory"), {
  ssr: false,
});

interface IProps {
  stores: IStores;
}

const DialogsAllNotLogged: React.FunctionComponent<IProps> = (props) => {
  return (
    <>
      {props.stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showArticle
      ) ? (
        <Article_D stores={props.stores} />
      ) : (
        <></>
      )}

      {props.stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showHistory
      ) ? (
        <History_D stores={props.stores} />
      ) : (
        <></>
      )}
    </>
  );
};

export default observer(DialogsAllNotLogged);
