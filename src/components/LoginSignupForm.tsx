import { observer } from "mobx-react-lite";
import { Box, TextField, Button } from "gestalt";
import { ColorT, handlerT, RoundingT, SizeT } from "../common/types";
import { IStores } from "../stores/_RootStore";

interface ILoginSignupFormProps {
  stores: IStores;
  placeholder_username: string;
  placeholder_password: string;
  label_login: string;
  label_signup: string;
  handler_button: handlerT;
  handler_text: handlerT;
}

const LoginSignupForm: React.FunctionComponent<ILoginSignupFormProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.texfield_size;
  const button_icon_size: SizeT = GUI_CONFIG.display.dialogs.button_icon_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  const color_background: ColorT = GUI_CONFIG.general.colors.background;

  return (
    <Box
      rounding={rounding}
      borderStyle="lg"
      padding={1}
      color={color_background}
    >
      <Box
        padding={0}
        display="flex"
        direction="column"
        justifyContent="around"
      >
        <Box padding={2}>
          <TextField
            id="username"
            // label={props.placeholder_username}
            placeholder={props.placeholder_username}
            // errorMessage="this is a test"
            onChange={props.handler_text("username")}
            type="email"
            size={texfield_size}
          />
        </Box>
        <Box padding={2}>
          <TextField
            id="password"
            // label={props.placeholder_password}
            placeholder={props.placeholder_password}
            onChange={props.handler_text("password")}
            type="password"
            size={texfield_size}
          />
        </Box>
      </Box>

      <Box padding={3} display="flex" direction="row" justifyContent="around">
        <Button
          accessibilityLabel="signup"
          text={props.label_signup}
          size={button_icon_size}
          onClick={props.handler_button("signup")}
          color="red"
          inline
        />
        <Button
          accessibilityLabel="login"
          text={props.label_login}
          size={button_icon_size}
          onClick={props.handler_button("login")}
          color="blue"
          inline
        />
      </Box>
    </Box>
  );
};

export default observer(LoginSignupForm);
