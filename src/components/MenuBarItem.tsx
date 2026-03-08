import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral } from "../config/configLocalAndEnv";
import { SizeT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import MenuBarButtonLayout from "./MenuBarButtonLayout";

interface IProps {
  stores: IStores;
  titleComponent: any;
  buttons: any;
}

const MenuBarItem: React.FunctionComponent<IProps> = (props) => {
  const color_menu = configGeneral.colors.menu;
  const stores = props.stores;
  const icon_size: SizeT =
    stores.baseStore.GUI_CONFIG.display.size_icon_generic;
  const rounding = props.stores.baseStore.GUI_CONFIG.display.rounding_menu;

  // const buttons = buttons_MenuBarItem(stores, router);

  const displayLabel = false;

  const menu = (
    <Box width="100%" paddingX={2}>
      <Box
        display="flex"
        direction="row"
        justifyContent="between"
        alignItems="center"
      >
        {props.titleComponent}
        <Box column={7} smColumn={7} mdColumn={4} lgColumn={3}>
          <MenuBarButtonLayout
            stores={props.stores}
            name="NavigationMenuBar"
            icon_size={icon_size}
            color={color_menu}
            direction="row"
            rounding={rounding}
            buttons={props.buttons}
            displayLabel={displayLabel}
          />
        </Box>
      </Box>
    </Box>
  );

  return menu;
};

export default observer(MenuBarItem);
