import React from "react";
import { observer } from "mobx-react";
import { IStores } from "../stores/RootStore";
import { empty_handler } from "../libs/utils";
import CardKnowGridStatic from "./CardKnowGridStatic";

interface IKnowbooksStaticProps {
  stores: IStores;
}

const KnowbooksStatic: React.FunctionComponent<IKnowbooksStaticProps> = (
  props
) => {
  const stores = props.stores;
  return (
    <>
      <CardKnowGridStatic
        id="knowbooksStatic"
        stores={stores}
        knowbooks={Array.from(stores.knowbookStore.staticKnowbooks.values())}
        edit_handler={empty_handler}
        delete_handler={empty_handler}
      />
    </>
  );
};

export default observer(KnowbooksStatic);
