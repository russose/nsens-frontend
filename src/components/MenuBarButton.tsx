import { Box } from "gestalt";
import { USER_GUI_CONFIG } from "../common/config";
import { ButtonIDType } from "../common/types";
import Button from "./Button";

interface IMenuBarButtonProps {
  name: string;
  buttonsIds: ButtonIDType[];
  color: any;
  onClick_handler: (buttonId: ButtonIDType) => () => void;
}

const buttons = USER_GUI_CONFIG.buttons;

const MenuBarButton: React.FunctionComponent<IMenuBarButtonProps> = (props) => {
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
          <Button
            // key={index.toString()}
            key={`${props.name}-${buttonId}`}
            icon={buttons[buttonId].icon}
            label={buttons[buttonId].label}
            onClick={props.onClick_handler(buttonId)}
          />
        );
      })}
    </Box>
  );
};

export default MenuBarButton;
