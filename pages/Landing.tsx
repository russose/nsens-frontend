import { observer } from "mobx-react-lite";
import LoginSignup from "../src/components/LoginSignup";
import { Box } from "gestalt";
import { useStores } from "../src/stores/_RootStoreHook";
import { goHome } from "../src/libs/utils";

const Landing: React.FunctionComponent = (props) => {
  const stores = useStores();

  stores.uiStore.setScreen();

  //when username==="", it means the user is not logged!
  //When username===null, it means the App is not initialyzed
  if (stores.userStore.user === null) {
    stores.userStore.initializeApp(stores);
    return <></>;
  }

  if (stores.userStore.isLogged) {
    // Already Logged
    if (process.browser) {
      goHome();
    }
  }

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
