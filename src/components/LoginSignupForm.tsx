import { observer } from "mobx-react-lite";
import { Box, TextField, Button, Text } from "gestalt";
import { GUI_CONFIG } from "../common/config";

interface ILoginSignupFormProps {
  title: string;
  description: string;
  placeholder_username: string;
  placeholder_password: string;
  label_login: string;
  label_signup: string;
  handler_button: any;
  handler_text: any;
}

const LoginSignupForm: React.FunctionComponent<ILoginSignupFormProps> = (
  props
) => {
  const texfield_size: any = GUI_CONFIG.display.dialogs.texfield_size;
  const button_icon_size: any = GUI_CONFIG.display.dialogs.button_icon_size;

  return (
    <Box>
      <Box padding={5}>
        <Text align="justify" size="lg" weight="bold">
          {props.description}
        </Text>
      </Box>

      {/* <Box color="white" rounding={3} borderSize="lg" padding={1}> */}
      <Box rounding={3} borderStyle="lg" padding={1}>
        <Box
          padding={1}
          display="flex"
          direction="column"
          justifyContent="around"
        >
          <Box padding={3}>
            <TextField
              id="username"
              label={props.placeholder_username}
              placeholder={props.placeholder_username}
              // errorMessage="this is a test"
              onChange={props.handler_text("username")}
              type="email"
              size={texfield_size}
            />
          </Box>
          <Box padding={3}>
            <TextField
              id="password"
              label={props.placeholder_password}
              placeholder={props.placeholder_password}
              onChange={props.handler_text("password")}
              type="password"
              size={texfield_size}
            />
          </Box>
        </Box>

        <Box padding={3} display="flex" direction="row" justifyContent="around">
          <Button
            accessibilityLabel="login"
            text={props.label_login}
            size={button_icon_size}
            onClick={props.handler_button("login")}
            inline
          />
          <Button
            accessibilityLabel="signup"
            text={props.label_signup}
            size={button_icon_size}
            onClick={props.handler_button("signup")}
            inline
          />
        </Box>
      </Box>
    </Box>
  );
};

export default observer(LoginSignupForm);
