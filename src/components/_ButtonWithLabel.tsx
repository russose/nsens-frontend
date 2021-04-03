import React from "react";
import { Box, IconButton, Text } from "gestalt";
import { IconT, SizeT } from "../common/types";

interface IButtonWithLabelProps {
  icon: IconT;
  direction: "column" | "row";
  href: string;
  text: string;
  icon_size: SizeT;
  text_size: SizeT;
}

const _ButtonWithLabel: React.FunctionComponent<IButtonWithLabelProps> = (
  props
) => {
  return (
    <>
      <Box
        padding={0}
        display="flex"
        direction={props.direction}
        alignItems="center"
      >
        <a href={props.href}>
          <IconButton
            accessibilityLabel={props.text}
            icon={props.icon}
            iconColor="darkGray"
            size={props.icon_size}
          />
        </a>
        <Text size={props.text_size} weight="bold">
          {props.text}
        </Text>
      </Box>
    </>
  );
};

export default _ButtonWithLabel;
