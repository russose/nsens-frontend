import React from "react";
import { Box, IconButton } from "gestalt";
import { JsText } from "./js_components";
import Link from "next/link";

interface IButtonLinkProps {
  icon: any;
  label: string;
  pathname: string;
}

const icon_size = "sm";

const ButtonLink: React.FunctionComponent<IButtonLinkProps> = (props) => {
  return (
    <Box padding={0} alignItems="center">
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
  );
};

export default ButtonLink;
