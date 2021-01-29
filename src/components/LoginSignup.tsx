import { observer } from "mobx-react-lite";
import { useStores } from "../stores/_RootStoreHook";
import { onChangeUsernamePassword, onSubmitLoginSignup } from "../handlers";
import React from "react";
import LoginSignupForm from "./LoginSignupForm";

const LoginSignup: React.FunctionComponent = (props) => {
  const stores = useStores();
  const GUI_CONFIG = stores.userStore.GUI_CONFIG;
  return (
    // <Box>
    <>
      <LoginSignupForm
        stores={stores}
        placeholder_username={
          GUI_CONFIG.language.landing.loginSignup.username_placeholder
        }
        placeholder_password={
          GUI_CONFIG.language.landing.loginSignup.password_placeholder
        }
        label_login={GUI_CONFIG.language.landing.loginSignup.login_label}
        label_signup={GUI_CONFIG.language.landing.loginSignup.signup_label}
        handler_button={onSubmitLoginSignup(stores)}
        handler_text={onChangeUsernamePassword(stores.uiStore)}
      />
    </>
    // </Box>
  );
};

export default observer(LoginSignup);
