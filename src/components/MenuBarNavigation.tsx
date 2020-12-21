import { observer } from "mobx-react-lite";
import React from "react";
import { ButtonIDType } from "../common/types";
import MenuBarButtonLayout from "./layout/MenuBarButtonLayout";
import _Button, { IButton } from "./_Button";

interface IMenuBarNavigationProps {
  name: string;
  color: any;
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
      name={props.name}
      color={props.color}
      buttons={buttons}
    />
  );
};

export default observer(MenuBarNavigation);
