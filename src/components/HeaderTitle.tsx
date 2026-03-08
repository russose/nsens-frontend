import { Box, Heading } from "gestalt";
import { useRouter } from "next/router";
import React from "react";
import {
  IButton,
  RoundingT,
  SizeT,
  configGeneral,
  handlerT,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import Buttons from "./Buttons";

interface IProps {
  stores: IStores;
  title: string;
  // showSharing?: boolean;
  addtional_buttons_left?: IButton[];
  addtional_buttons_right?: IButton[];
  hidden: boolean;
}

const HeaderTitle: React.FunctionComponent<IProps> = (props) => {
  let router;
  // if (props.showSharing === true) {
  router = useRouter();
  // }

  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.size_text_header;
  const color_headers = configGeneral.colors.headers as handlerT;
  const rounding_menu: RoundingT = GUI_CONFIG.display.rounding_menu;
  const icon_size: SizeT =
    props.stores.baseStore.GUI_CONFIG.display.size_icon_generic;

  function addtional_buttons(addtional_buttons: IButton[]): any {
    const display_buttons: boolean =
      addtional_buttons !== undefined && addtional_buttons.length !== 0;
    const result = (
      <Box
        display="flex"
        direction="column"
        column={1}
        smColumn={1}
        mdColumn={1}
        lgColumn={1}
      >
        <Box
          display="flex"
          direction="row"
          flex="grow"
          alignItems="center"
          justifyContent="around"
          width="100%"
        >
          {display_buttons ? (
            <Buttons
              stores={props.stores}
              name={props.title}
              displayLabel={false}
              icon_size={icon_size}
              buttons={addtional_buttons}
            />
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );

    return result;
  }

  const display = props.hidden ? "none" : "block";

  return (
    <>
      <Box display={display}>
        <Box
          display="flex"
          direction="row"
          flex="grow"
          alignItems="center"
          justifyContent="between"
          padding={2}
          paddingX={5}
        >
          {addtional_buttons(props.addtional_buttons_left)}
          <Box
            column={8}
            smColumn={8}
            mdColumn={6}
            lgColumn={4}
            padding={1}
            color={color_headers}
            borderStyle="lg"
            alignItems="center"
            rounding={rounding_menu}
          >
            <Heading
              accessibilityLevel={1}
              size={header_size}
              align="center"
              overflow="normal"
              lineClamp={2}
            >
              {props.title}
            </Heading>
          </Box>
          {addtional_buttons(props.addtional_buttons_right)}
        </Box>
      </Box>
    </>
  );
};

export default HeaderTitle;
