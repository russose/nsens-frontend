import { Box } from "gestalt";
import { IConfigMenuBar } from "../common/types";
import ButtonLink from "./ButtonLink";

interface IMenuBarHProps {
  buttons_config: IConfigMenuBar[];
  pathnames: string[];
  color: any;
  isLogged: boolean;
  loginPath: string;
}

const MenuBarH: React.FunctionComponent<IMenuBarHProps> = (props) => {
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
            // key={index.toString()}
            key={`menuBar-${index}`}
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

// export default observer(MenuBar_v);
export default MenuBarH;
