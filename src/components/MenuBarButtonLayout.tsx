import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  ColorT,
  DirectionT,
  IButton,
  RoundingT,
  SizeT,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import Buttons from "./Buttons";

interface IProps {
  stores: IStores;
  name: string;
  icon_size: SizeT;
  color: ColorT;
  direction: DirectionT;
  rounding: RoundingT;
  // width: string;
  displayLabel: boolean;
  buttons: IButton[];

  withoutBorder?: boolean;
}

const MenuBarButtonLayout: React.FunctionComponent<IProps> = (props) => {
  const rounding_menu: RoundingT = props.rounding;

  return (
    <Box
      paddingY={0}
      height={"100%"}
      // width={"100%"}
      color={props.color}
      display="flex"
      direction={props.direction}
      alignItems="center"
      justifyContent="around"
      borderStyle={props.withoutBorder !== true ? "lg" : undefined}
      rounding={rounding_menu}
      opacity={1}
    >
      <Buttons
        stores={props.stores}
        name={props.name}
        displayLabel={props.displayLabel}
        icon_size={props.icon_size}
        buttons={props.buttons}
      />
    </Box>
  );
};

export default observer(MenuBarButtonLayout);
