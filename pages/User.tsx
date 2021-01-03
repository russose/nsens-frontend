import { observer } from "mobx-react-lite";
import { useStores } from "../src/stores/_RootStoreHook";
import { Button, Box } from "gestalt";
import { onLogout } from "../src/handlers";
import React from "react";

const User: React.FunctionComponent = (props) => {
  const stores = useStores();

  // let content;
  // if (!userStore.isLogged) {
  //   content = <LoginSignup />;
  // } else {
  //   content = (
  //     <Box padding={10}>
  //       <Button
  //         accessibilityLabel="logout"
  //         text={"Logout"}
  //         size="md"
  //         onClick={onLogout(savedStore, userStore, knowbookStore)}
  //         // inline
  //       />
  //     </Box>
  //   );
  // }

  const content = (
    <Box padding={10}>
      <Button
        accessibilityLabel="logout"
        text={"Logout"}
        size="md"
        onClick={onLogout(stores)}
        // inline
      />
    </Box>
  );

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
