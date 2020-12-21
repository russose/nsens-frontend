import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { USER_GUI_CONFIG } from "../../common/config";
import { onMenuButtonPath } from "../../handlers";
import { useStores } from "../../stores/_RootStoreHook";
import _Button, { IButton } from "../_Button";

interface IMenuBarButtonLayoutProps {
  name: string;
  color: any;
  buttons: IButton[];
}

const buttons_all = USER_GUI_CONFIG.buttons;

const MenuBarButtonLayout: React.FunctionComponent<IMenuBarButtonLayoutProps> = (
  props
) => {
  const stores = useStores();
  return (
    <Box color="white" padding={1} display="block">
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        justifyContent="around"
        color={props.color}
        borderSize="lg"
        rounding={2}
      >
        {props.buttons.map((button) => {
          return (
            <Box padding={0} alignItems="center">
              <_Button
                key={`${props.name}-${button.Id}`}
                icon={buttons_all[button.Id].icon}
                label={buttons_all[button.Id].label}
                path={onMenuButtonPath(
                  stores.uiStore,
                  stores.userStore
                )(button.Id)}
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
