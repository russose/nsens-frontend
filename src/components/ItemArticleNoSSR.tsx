import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG_T } from "../common/configGUI";
import { IStores } from "../stores/_RootStore";
import Article from "./Article";

interface IItemArticleNoSSRProps {
  stores: IStores;
  GUI_CONFIG: GUI_CONFIG_T;
  item_title: string;
}

const ItemArticleNoSSR: React.FunctionComponent<IItemArticleNoSSRProps> = (
  props
) => {
  const stores = props.stores;

  const GUI_CONFIG = props.GUI_CONFIG;
  const heightTopAndBottom = GUI_CONFIG.display.heightTopAndBottom;
  const height = stores.userStore.screen.height - 1.0 * heightTopAndBottom;

  return (
    <Box padding={1}>
      <Article item_title={props.item_title} stores={stores} height={height} />
    </Box>
  );
};

export default observer(ItemArticleNoSSR);
