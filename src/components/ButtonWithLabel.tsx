import React, { SyntheticEvent } from "react";
import { Box, IconButton } from "gestalt";

import { JsText } from "./js_components";
import Link from "next/link";
import { ParsedUrlQueryInput } from "querystring";

interface IButtonWithLabelProps {
  icon: any;
  label: string;
  //onClick: (args: { event: SyntheticEvent<any> }) => void;
  pathname: string;
  queryObject: ParsedUrlQueryInput;
  enabled: boolean;
}

const font_size = "sm";
const icon_size = "md";
const weight = "bold";

const ButtonWithLabel: React.FunctionComponent<IButtonWithLabelProps> = (
  props
) => {
  // const size = props.enabled ? "md" : "xs";
  //const weight = props.enabled ? "bold" : "normal";

  return (
    <Box padding={0} display="flex" direction="column" alignItems="center">
      <Box>
        <Link href={{ pathname: props.pathname, query: props.queryObject }}>
          <a>
            <IconButton
              accessibilityLabel={props.label}
              //bgColor={props.enabled ? "lightGray" : "transparent"}
              icon={props.icon}
              iconColor="darkGray"
              size={icon_size}
              //onClick={props.onClick}
            />
          </a>
        </Link>
      </Box>
      <Box padding={0}>
        <JsText size={font_size} weight={weight}>
          {props.label}
        </JsText>
      </Box>
    </Box>
  );
};

export default ButtonWithLabel;
