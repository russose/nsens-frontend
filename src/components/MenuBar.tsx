import { Box } from "gestalt";
import ButtonWithLabel from "./ButtonWithLabel";

import { IConfigMenuBar } from "../types";
import { SyntheticEvent } from "react";

interface IMenuBarProps {
  buttons_config: IConfigMenuBar[];
  //buttons_handlers: ((args: { event: SyntheticEvent<any> }) => void)[];
  pathPages_onClick: string[];
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
            //onClick={props.buttons_handlers[index]}
            pathPage_onClick={props.pathPages_onClick[index]}
            enabled={data.label === props.label_active ? true : false}
          />
        );
      })}
    </Box>
  );
};

export default MenuBar;
