import React from "react";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";
import { IAtom } from "../config/types";
import Separator from "./Separator";
import { Box, Heading } from "gestalt";
import CardAtomGridNotLogged from "./CardAtomGridNotLogged";

interface IKnowbookNotLoggedProps {
  stores: IStores;
  items: IAtom[];
  related_items: IAtom[];
  static?: boolean;
}

const KnowbookNotLogged: React.FunctionComponent<IKnowbookNotLoggedProps> = (
  props
) => {
  const stores = props.stores;
  const Related_title =
    stores.baseStore.GUI_CONFIG.language.knowbooks.Related_title;

  let related_component;
  if (props.related_items.length === 0) {
    related_component = <></>;
  } else {
    related_component = (
      <>
        <Box height="15vh" />
        <Separator with_line={true} />
        <Box padding={3}>
          <Heading size="md">{Related_title}</Heading>
        </Box>
        <CardAtomGridNotLogged
          id="KnowbookStaticNotLogged_related"
          stores={stores}
          items={props.related_items}
        />
      </>
    );
  }

  return (
    <>
      <CardAtomGridNotLogged
        id="KnowbookStaticNotLogged"
        stores={stores}
        items={props.items}
        static={props.static}
      />
      {related_component}
    </>
  );
};

export default observer(KnowbookNotLogged);
