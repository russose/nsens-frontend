import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { ColorT, DirectionT, IButton, RoundingT } from "../../config/globals";
import { onMenuButtonPath } from "../../handlers/handlers_Searchbar_Navigation";
import { IStores } from "../../stores/RootStore";
import Button from "../Button";

interface IMenuBarButtonLayoutProps {
  stores: IStores;
  name: string;
  color: ColorT;
  direction: DirectionT;
  buttons: IButton[];
}

const MenuBarButtonLayout: React.FunctionComponent<IMenuBarButtonLayoutProps> =
  (props) => {
    const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
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
          opacity={1}
        >
          {props.buttons.map((button) => {
            const display = button.hidden ? "none" : "block";
            return (
              <Box
                key={`'box'-${props.name}-${button.Id}`}
                alignItems="center"
                display={display}
              >
                <Button
                  key={`${props.name}-${button.Id}`}
                  stores={props.stores}
                  icon={buttons_all[button.Id].icon}
                  label={buttons_all[button.Id].label}
                  path={onMenuButtonPath(button.Id)}
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
