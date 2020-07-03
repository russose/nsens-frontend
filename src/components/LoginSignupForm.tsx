import { observer } from "mobx-react";
import { Box, TextField, IconButton, Button } from "gestalt";
import { JsText } from "./js_components";

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
  return (
    <Box>
      <Box padding={5}>
        <JsText align="justify" size="lg" weight="bold">
          {props.description}
        </JsText>
      </Box>

      <Box color="white" rounding={3} borderSize="lg" padding={1}>
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
              size="md"
            />
          </Box>
          <Box padding={3}>
            <TextField
              id="password"
              label={props.placeholder_password}
              placeholder={props.placeholder_password}
              onChange={props.handler_text("password")}
              type="password"
              size="md"
            />
          </Box>
        </Box>

        <Box
          padding={3}
          display="flex"
          direction="row"
          justifyContent="between"
        >
          <Button
            accessibilityLabel="login"
            text={props.label_login}
            size="sm"
            onClick={props.handler_button("login")}
            inline
          />
          <Button
            accessibilityLabel="signup"
            text={props.label_signup}
            size="sm"
            onClick={props.handler_button("signup")}
            inline
          />
        </Box>
      </Box>
    </Box>
  );
};

export default observer(LoginSignupForm);
