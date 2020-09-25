import React from "react";
import { Box, IconButton } from "gestalt";
import { JsText } from "./js_components";
import Link from "next/link";

interface IButtonLinkTextProps {
  icon: any;
  label: string;
  pathname: string;
}

const font_size = "sm";
const icon_size = "xs";
const weight = "bold";

const ButtonLinkText: React.FunctionComponent<IButtonLinkTextProps> = (
  props
) => {
  // const size = props.enabled ? "md" : "xs";
  //const weight = props.enabled ? "bold" : "normal";

  return (
    <Box padding={0} display="flex" direction="column" alignItems="center">
      <Box>
        <Link href={{ pathname: props.pathname }}>
          <a>
            <IconButton
              accessibilityLabel={props.label}
              icon={props.icon}
              iconColor="darkGray"
              size={icon_size}
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

export default ButtonLinkText;
