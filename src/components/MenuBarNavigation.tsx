import { observer } from "mobx-react-lite";
import React from "react";
import { ButtonIDType, ColorT } from "../common/types";
import { IStores } from "../stores/_RootStore";
import MenuBarButtonLayout from "./layout/MenuBarButtonLayout";
import _Button, { IButton } from "./_Button";

interface IMenuBarNavigationProps {
  stores: IStores;
  name: string;
  color: ColorT;
}

const MenuBarNavigation: React.FunctionComponent<IMenuBarNavigationProps> = (
  props
) => {
  const buttons: IButton[] = [
    {
      Id: ButtonIDType.HOME,
    },
    {
      Id: ButtonIDType.KNOWBOOKS,
    },
    {
      Id: ButtonIDType.LOGIN,
    },
  ];

  return (
    <MenuBarButtonLayout
      stores={props.stores}
      name={props.name}
      color={props.color}
      direction="row"
      buttons={buttons}
    />
  );
};

export default observer(MenuBarNavigation);
