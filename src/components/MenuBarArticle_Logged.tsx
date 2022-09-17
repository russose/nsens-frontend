import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral, IButton, RoundingT } from "../config/globals";
import { TButtonID } from "../config/globals";
import { onEditKnowbooks } from "../handlers/handlers_Knowbooks";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../handlers/handlers_Saved";

import { IStores } from "../stores/RootStore";
import MenuBarArticle_NotLogged from "./MenuBarArticle_NotLogged";

interface IMenuBarNavigationProps {
  stores: IStores;
  rounding: RoundingT;
}

const MenuBarArticle_Logged: React.FunctionComponent<
  IMenuBarNavigationProps
> = (props) => {
  const stores = props.stores;

  const buttons: IButton[] = [
    {
      Id: TButtonID.EDIT,
      onClick: onEditKnowbooks(stores)(stores.uiStore.selectedAtom.id),
      hidden: !isItemSaved(stores)(stores.uiStore.selectedAtom.id),
    },
    {
      Id: TButtonID.SAVE,
      onClick: onSaved(stores)(stores.uiStore.selectedAtom.id),
      disabled: !isItemSavedActivated(stores)(stores.uiStore.selectedAtom.id),
      iconColor: isItemSaved(stores)(stores.uiStore.selectedAtom.id)
        ? configGeneral.colors.iconColorDefaultSelected
        : configGeneral.colors.iconColorDefaultNotSelected,
    },
  ];

  return (
    <>
      <MenuBarArticle_NotLogged
        stores={props.stores}
        rounding={props.rounding}
        specific_buttons={buttons}
      />
    </>
  );
};

export default observer(MenuBarArticle_Logged);
