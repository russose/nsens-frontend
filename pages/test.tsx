import { observer } from "mobx-react";
import { useStores } from "../src/stores/RootStoreHook";
import React from "react";
import { IPage } from "../src/libs/getDataParamsPage";
import AppLayout from "../src/components/layout/AppLayout";
import { initializeApp } from "../src/libs/helpersInitialize";
import { ConfigLanguage, IparamsPage } from "../src/config/types";
import _Test from "../src/components/_Test";

const test: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();

  //   const paramsPage = props.paramsPage;
  const paramsPage: IparamsPage = {
    lang: ConfigLanguage.fr,
    // display: ConfigDisplay.desktop,
  };
  initializeApp(stores, paramsPage);
  if (
    stores.baseStore.initCompleted.core !== true
    // || stores.baseStore.initCompleted.display !== true
  ) {
    //Not yet initialyzed
    return <></>;
  }

  return (
    <>
      <AppLayout stores={stores}>
        <_Test stores={stores}></_Test>
      </AppLayout>
    </>
  );
};

export default observer(test);
