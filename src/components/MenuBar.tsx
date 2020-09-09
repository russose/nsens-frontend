import { Box } from "gestalt";
import { IConfigMenuBar } from "../common/types";
import ButtonLink from "./ButtonLink";
import { observer } from "mobx-react";

interface IMenuBarProps {
  buttons_config: IConfigMenuBar[];
  pathnames: string[];
  color: any;
  isLogged: boolean;
  loginPath: string;
}

const MenuBar: React.FunctionComponent<IMenuBarProps> = (props) => {
  return (
    <Box
      padding={1}
      display="flex"
      alignItems="center"
      justifyContent="around"
      color={props.color}
      borderSize="lg"
      rounding={2}
    >
      {props.buttons_config.map((data, index) => {
        return (
          <ButtonLink
            key={index.toString()}
            icon={data.icon}
            label={data.label}
            pathname={
              !props.isLogged && index !== 0
                ? props.loginPath
                : props.pathnames[index]
            }
          />
        );
      })}
    </Box>
  );
};

export default observer(MenuBar);
