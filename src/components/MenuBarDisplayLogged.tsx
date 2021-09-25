import { observer } from "mobx-react-lite";
import React from "react";
import { TButtonID, IButton } from "../config/globals";
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

  //List only updated properties regarding the NotLogged buttons
  const buttons_update: IButton[] = [
    {
      Id: TButtonID.ARTICLE,
    },
    {
      Id: TButtonID.VIZS,
    },
    {
      Id: TButtonID.SEPARATOR,
    },
    {
      Id: TButtonID.SAVE,
      onClick: onSaved(stores)(stores.uiStore.selectedAtom.id),
      disabled: !isItemSavedActivated(stores)(stores.uiStore.selectedAtom.id),
      iconColor: isItemSaved(stores)(stores.uiStore.selectedAtom.id)
        ? configGeneral.colors.iconColorDefaultSelected
        : configGeneral.colors.iconColorDefaultNotSelected,
    },
    {
      Id: TButtonID.EDIT,
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
