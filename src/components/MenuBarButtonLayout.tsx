import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { ColorT, DirectionT, IButton, RoundingT } from "../config/globals";
import { onMenuButtonPath } from "../handlers/handlers_Searchbar_Navigation";
import { IStores } from "../stores/RootStore";
import Button from "./Button";

interface IProps {
  stores: IStores;
  name: string;
  color: ColorT;
  direction: DirectionT;
  rounding: RoundingT;
  // width: string;
  displayLabel: boolean;
  buttons: IButton[];
}

const MenuBarButtonLayout: React.FunctionComponent<IProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const buttons_all = GUI_CONFIG.language.buttons;
  const rounding_menu: RoundingT = props.rounding;

  return (
    <Box
      paddingY={1}
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
              path={onMenuButtonPath(props.stores)(button.Id)}
              iconColor={button.iconColor}
              disabled={button.disabled}
              onClick={button.onClick}
              displayLabel={props.displayLabel}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default observer(MenuBarButtonLayout);
