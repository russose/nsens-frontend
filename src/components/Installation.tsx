import { Box, Text, Image } from "gestalt";
import React from "react";

interface IInstallationProps {
  instruction: string;
  path_image: string;
  height: string;
}

const Installation: React.FunctionComponent<IInstallationProps> = (props) => {
  return (
    <Box borderStyle="shadow" column={11} rounding={3}>
      <Box padding={5}>
        <Text weight="bold">{props.instruction}</Text>
      </Box>

      <Box padding={0} height={props.height} width="100%">
        <Image
          alt={props.instruction}
          color="transparent"
          fit="contain"
          naturalHeight={1}
          naturalWidth={1}
          // loading="lazy"
          src={props.path_image}
        ></Image>
      </Box>
    </Box>
  );
};

export default Installation;
