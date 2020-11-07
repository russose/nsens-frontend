import React from "react";
import { Box, IconButton } from "gestalt";

interface IButtonLinkProps {
  icon: any;
  label: string;
  onClick: () => void;
}

const icon_size = "sm";

const ButtonLink: React.FunctionComponent<IButtonLinkProps> = (props) => {
  return (
    <Box padding={0} alignItems="center">
      <IconButton
        accessibilityLabel={props.label}
        icon={props.icon}
        iconColor="darkGray"
        size={icon_size}
        onClick={props.onClick}
      />
    </Box>
  );
};

export default ButtonLink;
