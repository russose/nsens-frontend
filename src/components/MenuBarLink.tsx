import { Box } from "gestalt";
import { USER_GUI_CONFIG } from "../common/config";
import { ButtonIDType } from "../common/types";
import ButtonLink from "./ButtonLink";

interface IMenuBarLinkProps {
  name: string;
  buttonsIds: ButtonIDType[];
  color: any;
  path_handler: (buttonId: ButtonIDType) => string;
}

const buttons = USER_GUI_CONFIG.buttons;

const MenuBarLink: React.FunctionComponent<IMenuBarLinkProps> = (props) => {
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
      {props.buttonsIds.map((buttonId) => {
        return (
          <ButtonLink
            // key={index.toString()}
            key={`${props.name}-${buttonId}`}
            icon={buttons[buttonId].icon}
            label={buttons[buttonId].label}
            pathname={props.path_handler(buttonId)}
          />
        );
      })}
    </Box>
  );
};

export default MenuBarLink;
