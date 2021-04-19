import { observer } from "mobx-react-lite";
import React from "react";
import { ButtonIDType } from "../common/globals";
import { IStores } from "../stores/_RootStore";
import MenuBarButtonLayout from "./layout/MenuBarButtonLayout";
import _Button, { IButton } from "./_Button";
import { Box } from "gestalt";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../handlers/handlers_Saved";
import { onEditKnowbooks } from "../handlers/handlers_Knowbooks";
import { configGeneral } from "../common/globals";

interface IMenuBarDisplayProps {
  stores: IStores;
  isMobile: boolean;
}

const MenuBarDisplay: React.FunctionComponent<IMenuBarDisplayProps> = (
  props
) => {
  const stores = props.stores;
  const color_menu = configGeneral.colors.menu;
  const buttons: IButton[] = [
    {
      Id: ButtonIDType.ARTICLE,
      // onClick: onDisplayModeClick(stores.uiStore)(ButtonIDType.ARTICLE),
      // disabled: false,
    },
    {
      Id: ButtonIDType.VIZS,
      // onClick: onDisplayModeClick(stores.uiStore)(ButtonIDType.VIZS),
      // disabled: false,
    },
    {
      Id: ButtonIDType.SAVE,
      onClick: onSaved(stores)(stores.uiStore.selectedAtom.id),
      disabled: !isItemSavedActivated(stores)(stores.uiStore.selectedAtom.id),
      iconColor: isItemSaved(stores)(stores.uiStore.selectedAtom.id)
        ? "red"
        : configGeneral.colors.iconColorDefault,
    },
    {
      Id: ButtonIDType.EDIT,
      onClick: onEditKnowbooks(stores)(stores.uiStore.selectedAtom.id),
      disabled: !isItemSaved(stores)(stores.uiStore.selectedAtom.id),
    },
  ];

  const menuBarButton = (
    <MenuBarButtonLayout
      stores={stores}
      name="MenuBarDisplay"
      color={color_menu}
      direction="row"
      buttons={buttons}
    />
  );

  return (
    <>
      {props.isMobile ? (
        <Box column={12}>{menuBarButton}</Box>
      ) : (
        <Box display="flex" direction="column" flex="grow" alignItems="end">
          <Box padding={0} column={4} smColumn={3} mdColumn={3} lgColumn={2}>
            {menuBarButton}
          </Box>
        </Box>
      )}
    </>
  );
};

export default observer(MenuBarDisplay);
