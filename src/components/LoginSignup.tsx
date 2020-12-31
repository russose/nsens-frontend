import { observer } from "mobx-react-lite";
import { useStores } from "../stores/_RootStoreHook";
import { GUI_CONFIG } from "../common/config";
import LoginSignupForm from "./LoginSignupForm";
import { onChangeUsernamePassword, onSubmitLoginSignup } from "../handlers";

const LoginSignup: React.FunctionComponent = (props) => {
  const stores = useStores();
  return (
    // <Box>
    <>
      {true && (
        <LoginSignupForm
          title="Really necessary?"
          description={GUI_CONFIG.language.loginSignup.desciption}
          placeholder_username={
            GUI_CONFIG.language.loginSignup.username_placeholder
          }
          placeholder_password={
            GUI_CONFIG.language.loginSignup.password_placeholder
          }
          label_login={GUI_CONFIG.language.loginSignup.login_label}
          label_signup={GUI_CONFIG.language.loginSignup.signup_label}
          handler_button={onSubmitLoginSignup(stores)}
          handler_text={onChangeUsernamePassword(stores.uiStore)}
        />
      )}
    </>
    // </Box>
  );
};

export default observer(LoginSignup);
