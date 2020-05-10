import { observer } from "mobx-react";
import { Sticky, Box } from "gestalt";
import { ReactElement } from "react";

interface IMobilePagesLayoutProps {
  top_components: ReactElement;
}

const MobilePagesLayout: React.FunctionComponent<IMobilePagesLayoutProps> = (
  props
) => {
  return (
    <div>
      <Sticky top={0}>
        <Box color="white" padding={1} display="block">
          {props.top_components}
        </Box>
      </Sticky>

      <Box
        color="white"
        padding={1}
        display="flex"
        direction="column"
        height="90vh"
        width="100"
        justifyContent="between"
        overflow="scrollY"
      >
        {props.children}
      </Box>
    </div>
  );
};

export default observer(MobilePagesLayout);
