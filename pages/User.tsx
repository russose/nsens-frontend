import { observer } from "mobx-react-lite";
import { useStores } from "../src/stores/_RootStoreHook";
import LoginSignup from "../src/components/LoginSignup";
import { Button, Box } from "gestalt";
import { onLogout } from "../src/handlers";

const User: React.FunctionComponent = (props) => {
  const { dataStore, userStore, knowbookStore } = useStores();

  let content;

  if (!userStore.isLogged) {
    content = <LoginSignup />;
  } else {
    content = (
      <Box padding={10}>
        <Button
          accessibilityLabel="logout"
          text={"Logout"}
          size="md"
          onClick={onLogout(dataStore, userStore, knowbookStore)}
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
