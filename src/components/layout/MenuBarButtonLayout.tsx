import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG } from "../../common/config";
import { onMenuButtonPath } from "../../handlers";
import { useStores } from "../../stores/_RootStoreHook";
import _Button, { IButton } from "../_Button";

interface IMenuBarButtonLayoutProps {
  name: string;
  color: any;
  direction: any;
  buttons: IButton[];
}

const buttons_all = GUI_CONFIG.language.buttons;

const MenuBarButtonLayout: React.FunctionComponent<IMenuBarButtonLayoutProps> = (
  props
) => {
  const stores = useStores();
  return (
    // <Box color="white" padding={1} display="block">
    <Box padding={1} display="block">
      <Box
        padding={1}
        display="flex"
        // direction="column"
        direction={props.direction}
        alignItems="center"
        justifyContent="around"
        color={props.color}
        borderStyle="lg"
        rounding={2}
      >
        {props.buttons.map((button) => {
          return (
            <Box
              key={`'box'-${props.name}-${button.Id}`}
              padding={0}
              alignItems="center"
            >
              <_Button
                key={`${props.name}-${button.Id}`}
                // key={(props.name + button.Id).toString()}
                icon={buttons_all[button.Id].icon}
                label={buttons_all[button.Id].label}
                path={onMenuButtonPath(stores.uiStore)(button.Id)}
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
