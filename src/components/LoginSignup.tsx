import { observer } from "mobx-react-lite";
import { useStores } from "../stores/_RootStoreHook";
import { Box } from "gestalt";
import { USER_GUI_CONFIG } from "../common/config";
import LoginSignupForm from "./LoginSignupForm";
import { onChangeUsernamePassword, onSubmitLoginSignup } from "../handlers";

const LoginSignup: React.FunctionComponent = (props) => {
  const { dataStore, uiStore, userStore, knowbookStore } = useStores();
  return (
    <Box>
      {true && (
        <LoginSignupForm
          title="Really necessary?"
          description={USER_GUI_CONFIG.loginSignup.desciption}
          placeholder_username={
            USER_GUI_CONFIG.loginSignup.username_placeholder
          }
          placeholder_password={
            USER_GUI_CONFIG.loginSignup.password_placeholder
          }
          label_login={USER_GUI_CONFIG.loginSignup.login_label}
          label_signup={USER_GUI_CONFIG.loginSignup.signup_label}
          handler_button={onSubmitLoginSignup(
            uiStore,
            dataStore,
            userStore,
            knowbookStore
          )}
          handler_text={onChangeUsernamePassword(uiStore)}
        />
      )}
    </Box>
  );
};

export default observer(LoginSignup);
