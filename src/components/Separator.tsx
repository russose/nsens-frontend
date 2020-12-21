import React from "react";
import { Box, Divider } from "gestalt";

const Separator: React.FunctionComponent<{}> = (props) => {
  return (
    <>
      <Box padding={5}></Box>
      <Divider />
      <Box padding={1}></Box>
    </>
  );
};

export default Separator;
