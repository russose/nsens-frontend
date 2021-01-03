import React from "react";
import { Box, Divider } from "gestalt";

export type ISeparatorProps = {
  with_line: boolean;
};

const Separator: React.FunctionComponent<ISeparatorProps> = (props) => {
  return (
    <>
      {props.with_line ? (
        <Box padding={3}>
          <Divider />
        </Box>
      ) : (
        <Box padding={5}></Box>
      )}
    </>
  );
};

export default Separator;
