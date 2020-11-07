import { observer } from "mobx-react-lite";
import { useStores } from "../src/stores/_RootStore";
import LoginSignup from "../src/components/LoginSignup";
import { Text, Button, Box } from "gestalt";
import { onLogout } from "../src/handlers";

const User: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  let content;

  if (!dataStore.isLogged) {
    content = <LoginSignup />;
  } else {
    content = (
      <Box padding={10}>
        <Button
          accessibilityLabel="logout"
          text={"Logout"}
          size="md"
          onClick={onLogout(dataStore)}
          // inline
        />
      </Box>
    );
  }

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

export default observer(User);
