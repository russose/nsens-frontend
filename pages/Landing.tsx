import { observer } from "mobx-react-lite";
import LoginSignup from "../src/components/LoginSignup";
import { Box } from "gestalt";

const Landing: React.FunctionComponent = (props) => {
  const content = <LoginSignup />;
  return (
    <Box display="flex" justifyContent="center">
      <Box
        padding={2}
        display="inlineBlock"
        column={12}
        smColumn={12}
        mdColumn={8}
        lgColumn={6}
      >
        {content}
      </Box>
    </Box>
  );
};

export default observer(Landing);
