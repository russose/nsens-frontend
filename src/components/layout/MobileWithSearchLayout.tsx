import { ReactNode } from "react";
import { observer } from "mobx-react";
import { Sticky, Box } from "gestalt";

interface IMobileWithSearchLayoutProps {
  top?: ReactNode;
  content: ReactNode;
}

const MobileWithSearchLayout: React.FunctionComponent<IMobileWithSearchLayoutProps> = (
  props
) => {
  return (
    <div>
      <Sticky top={0}>
        <Box color="green" padding={1} display="block">
          {props.top}
        </Box>
      </Sticky>

      <Box
        color="blue"
        padding={1}
        display="flex"
        direction="column"
        height="85vh"
        width="100"
        justifyContent="between"
        overflow="scrollY"
      >
        {props.content}
      </Box>
    </div>
  );
};

export default observer(MobileWithSearchLayout);
