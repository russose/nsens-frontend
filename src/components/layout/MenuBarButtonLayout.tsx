import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { ColorT, DirectionT, RoundingT } from "../../common/types";
import { onMenuButtonPath } from "../../handlers/handlers_Navigation";
import { IStores } from "../../stores/_RootStore";
import _Button, { IButton } from "../_Button";

interface IMenuBarButtonLayoutProps {
  stores: IStores;
  name: string;
  color: ColorT;
  direction: DirectionT;
  buttons: IButton[];
}

const MenuBarButtonLayout: React.FunctionComponent<IMenuBarButtonLayoutProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const buttons_all = GUI_CONFIG.language.buttons;
  const rounding_menu: RoundingT = GUI_CONFIG.display.rounding_menu;

  return (
    <Box padding={1}>
      <Box
        padding={0}
        color={props.color}
        display="flex"
        direction={props.direction}
        alignItems="center"
        justifyContent="around"
        borderStyle="lg"
        rounding={rounding_menu}
      >
        {props.buttons.map((button) => {
          return (
            <Box key={`'box'-${props.name}-${button.Id}`} alignItems="center">
              <_Button
                key={`${props.name}-${button.Id}`}
                stores={props.stores}
                icon={buttons_all[button.Id].icon}
                label={buttons_all[button.Id].label}
                path={onMenuButtonPath(props.stores)(button.Id)}
                iconColor={button.iconColor}
                disabled={button.disabled}
                onClick={button.onClick}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default observer(MenuBarButtonLayout);
