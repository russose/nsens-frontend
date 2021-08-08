import { observer } from "mobx-react";
import React from "react";
import { ButtonIDType, IButton } from "../config/globals";
import { IStores } from "../stores/RootStore";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../handlers/handlers_Saved";
import { onEditKnowbooks } from "../handlers/handlers_Knowbooks";
import { configGeneral } from "../config/globals";
import MenuBarDisplayNotLogged from "./MenuBarDisplayNotLogged";

interface IMenuBarDisplayProps {
  stores: IStores;
  // isMobile: boolean;
}

const MenuBarDisplay: React.FunctionComponent<IMenuBarDisplayProps> = (
  props
) => {
  const stores = props.stores;
  const buttons_update: IButton[] = [
    {
      Id: ButtonIDType.ARTICLE,
    },
    {
      Id: ButtonIDType.VIZS,
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
      hidden: !isItemSaved(stores)(stores.uiStore.selectedAtom.id),
    },
  ];

  return (
    <>
      <MenuBarDisplayNotLogged
        stores={stores}
        buttons={buttons_update}
        // isMobile={props.isMobile}
      />
    </>
  );
};

export default observer(MenuBarDisplay);
