import { observer } from "mobx-react-lite";
import React from "react";
import { ButtonIDType, ColorT } from "../common/types";
import {
  isItemSaved,
  isItemSavedActivated,
  onDisplayModeClick,
  onEditKnowbooks,
  onSaved,
} from "../handlers";
import { IStores } from "../stores/_RootStore";
import MenuBarButtonLayout from "./layout/MenuBarButtonLayout";
import _Button, { IButton, iconColorDefault } from "./_Button";

interface IMenuBarDisplayProps {
  stores: IStores;
  name: string;
  color: ColorT;
}

const MenuBarDisplay: React.FunctionComponent<IMenuBarDisplayProps> = (
  props
) => {
  const stores = props.stores;
  const buttons: IButton[] = [
    {
      Id: ButtonIDType.ARTICLE,
      onClick: onDisplayModeClick(stores.uiStore)(ButtonIDType.ARTICLE),
      disabled: false,
    },
    {
      Id: ButtonIDType.VIZS,
      onClick: onDisplayModeClick(stores.uiStore)(ButtonIDType.VIZS),
      disabled: false,
    },
    {
      Id: ButtonIDType.SAVE,
      onClick: onSaved(stores)(stores.uiStore.selectedAtomId),
      disabled: !isItemSavedActivated(stores.knowbookStore)(
        stores.uiStore.selectedAtomId
      ),
      iconColor: isItemSaved(stores.savedStore)(stores.uiStore.selectedAtomId)
        ? "red"
        : iconColorDefault,
    },
    {
      Id: ButtonIDType.EDIT,
      onClick: onEditKnowbooks(
        stores.uiStore,
        stores.knowbookStore
      )(stores.uiStore.selectedAtomId),
      disabled: !isItemSaved(stores.savedStore)(stores.uiStore.selectedAtomId),
    },
  ];

  const direction = "row";

  return (
    <MenuBarButtonLayout
      stores={stores}
      name={props.name}
      color={props.color}
      direction={direction}
      buttons={buttons}
    />
  );
};

export default observer(MenuBarDisplay);
