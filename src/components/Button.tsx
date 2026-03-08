import { Box, IconButton, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { ColorT, configGeneral, ICONS, IconT, SizeT } from "../config/globals";
import { IStores } from "../stores/RootStore";

interface IButtonProps {
  stores: IStores;
  icon: IconT;
  label: string;
  // path: string;

  icon_size: SizeT;
  iconColor?: ColorT;
  disabled?: boolean;
  bgColor?: string;

  displayLabel: boolean;
  // tooltip?: string;

  onClick: () => void;
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  // const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const icon_size: SizeT = props.icon_size;
  const iconColor_ =
    props.iconColor === undefined
      ? configGeneral.colors.iconColorDefault
      : props.iconColor;
  const disabled_ = props.disabled === undefined ? false : props.disabled;

  let labetText = <></>;
  if (props.displayLabel) {
    labetText = (
      <Box paddingY={0}>
        <Text
          size={
            props.stores.baseStore.GUI_CONFIG.display.size_text_generic as any
          }
          weight="bold"
        >
          {props.label}
        </Text>
      </Box>
    );
  }

  let icon = props.icon;
  let __path = undefined;
  if (!Object.values(ICONS).includes(props.icon)) {
    //Custom icon
    icon = undefined;
    __path = props.icon;
  }

  return (
    <Box paddingX={0} display="flex" direction="column" alignItems="center">
      <IconButton
        accessibilityLabel={props.label}
        icon={icon}
        dangerouslySetSvgPath={{
          __path: __path,
        }}
        iconColor={iconColor_}
        size={icon_size}
        onClick={props.onClick}
        disabled={disabled_}
        bgColor={props.bgColor as any}

        // tooltip={{
        //   text: props.tooltip,
        //   accessibilityLabel: "",
        // }}
      />
      {labetText}
    </Box>
  );
};

export default observer(Button);
