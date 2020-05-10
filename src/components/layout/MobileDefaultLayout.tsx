import { Sticky, Box } from "gestalt";
import MenuBar from "../MenuBar";
import { USER_GUI_CONFIG } from "../../config";

const MobileDefaultLayout: React.FunctionComponent = (props) => {
  return (
    <div className="MobileDefaultLayout">
      <Box
        color="white"
        padding={0}
        display="flex"
        direction="column"
        height="98vh"
        width="100"
        justifyContent="between"
        overflow="hidden"
      >
        {props.children}
        <Sticky bottom={0}>
          <Box color="white" padding={1} display="block">
            <MenuBar
              label_active="Saved"
              buttons_config={USER_GUI_CONFIG.menuBar}
              pathnames={["/", "/Knowbooks", "/User", "/More"]}
              queryObjects={[{ a: "n" }, { k: "test2" }, {}, {}]}
            />
          </Box>
        </Sticky>
      </Box>
    </div>
  );
};

export default MobileDefaultLayout;
