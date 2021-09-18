import React from "react";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";
import { IAtom } from "../config/types";
import Separator from "./Separator";
import { Box, Heading } from "gestalt";
import CardAtomGridLogged from "./CardAtomGridLogged";

interface IKnowbookLoggedProps {
  stores: IStores;
  items: IAtom[];
  related_items: IAtom[];
}

const KnowbookLogged: React.FunctionComponent<IKnowbookLoggedProps> = (
  props
) => {
  const stores = props.stores;
  const Related_title =
    stores.baseStore.GUI_CONFIG.language.knowbooks_User.Related_title;

  let related_component;
  if (props.related_items.length === 0) {
    related_component = <></>;
  } else {
    related_component = (
      <>
        <Box height="15vh" />
        <Separator with_line={true} />
        <Box padding={3}>
          <Heading accessibilityLevel={2} size="md">
            {Related_title}
          </Heading>
        </Box>
        <CardAtomGridLogged
          id="KnowbookStaticLogged_related"
          stores={stores}
          items={props.related_items}
        />
      </>
    );
  }

  return (
    <>
      <CardAtomGridLogged
        id="KnowbookStaticLogged"
        stores={stores}
        items={props.items}
        // static={props.static}
      />
      {related_component}
    </>
  );
};

export default observer(KnowbookLogged);
