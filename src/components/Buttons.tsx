import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { buttons_all, IButton, SizeT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import Button from "./Button";

interface IProps {
  stores: IStores;
  name: string;
  icon_size: SizeT;

  displayLabel: boolean;
  buttons: IButton[];
}

const Buttons: React.FunctionComponent<IProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const buttons_all_label = GUI_CONFIG.language.buttons_all_label as any;

  if (props.buttons === undefined || props.buttons.length === 0) {
    return <></>;
  }

  return (
    <>
      {props.buttons.map((button) => {
        const display = button.hidden ? "none" : "block";
        const label =
          buttons_all_label[button.Id] === undefined
            ? ""
            : buttons_all_label[button.Id].label;
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
              label={label}
              icon_size={props.icon_size}
              iconColor={button.iconColor}
              disabled={button.disabled}
              onClick={button.onClick}
              displayLabel={props.displayLabel}
            />
          </Box>
        );
      })}
    </>
  );
};

export default observer(Buttons);
