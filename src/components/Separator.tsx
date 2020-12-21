import React from "react";
import { Box, Divider } from "gestalt";

const Separator: React.FunctionComponent<{}> = (props) => {
  return (
    <Box padding={5}>
      <Divider />
    </Box>
  );
};

export default Separator;
