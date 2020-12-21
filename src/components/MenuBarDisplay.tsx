import { observer } from "mobx-react-lite";
import React from "react";
import { ButtonIDType } from "../common/types";
import {
  isItemSaved,
  isItemSavedActivated,
  onDisplayModeClick,
  onEditKnowbooks,
  onSaved,
} from "../handlers";
import { useStores } from "../stores/_RootStoreHook";
import MenuBarButtonLayout from "./layout/MenuBarButtonLayout";
import _Button, { IButton, iconColorDefault } from "./_Button";

interface IMenuBarDisplayProps {
  name: string;
  color: any;
}

const MenuBarDisplay: React.FunctionComponent<IMenuBarDisplayProps> = (
  props
) => {
  const stores = useStores();

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
      onClick: onSaved(
        stores.savedStore,
        stores.userStore,
        stores.knowbookStore,
        stores.feedStore
      )(stores.uiStore.selectedAtomId),
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

  return (
    <MenuBarButtonLayout
      name={props.name}
      color={props.color}
      buttons={buttons}
    />
  );
};

export default observer(MenuBarDisplay);
