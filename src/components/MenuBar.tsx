import { Box } from "gestalt";
import ButtonWithLabel from "./ButtonWithLabel";

import { IConfigMenuBar } from "../types";
import { ParsedUrlQueryInput } from "querystring";

interface IMenuBarProps {
  buttons_config: IConfigMenuBar[];
  //buttons_handlers: ((args: { event: SyntheticEvent<any> }) => void)[];
  pathnames: string[];
  queryObjects: ParsedUrlQueryInput[];
  label_active: string;
}

const MenuBar: React.FunctionComponent<IMenuBarProps> = (props) => {
  return (
    <Box
      padding={0}
      display="flex"
      alignItems="center"
      justifyContent="around"
      color="lightGray"
      borderSize="lg"
      rounding={2}
    >
      {props.buttons_config.map((data, index) => {
        return (
          <ButtonWithLabel
            key={index.toString()}
            icon={data.icon}
            label={data.label}
            pathname={props.pathnames[index]}
            queryObject={props.queryObjects[index]}
            enabled={data.label === props.label_active ? true : false}
          />
        );
      })}
    </Box>
  );
};

export default MenuBar;
