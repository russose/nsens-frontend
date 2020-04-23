import { observer } from "mobx-react";
import { Sticky, Box } from "gestalt";
import MenuBar from "../MenuBar";

import data_gui from "../../data/data_gui.json";
import { IConfigData } from "../../types";

const guiConfig: IConfigData = data_gui.fr;

const MobileDefaultLayout: React.FunctionComponent = (props) => {
  return (
    <div className="MobileDefaultLayout">
      <Box
        color="red"
        padding={1}
        display="flex"
        direction="column"
        height="98vh"
        width="100"
        justifyContent="between"
        overflow="hidden"
      >
        {props.children}

        <Sticky bottom={0}>
          <Box color="green" padding={1} display="block">
            <MenuBar
              label_active="Saved"
              buttons_config={guiConfig.menuBar}
              pathPages_onClick={[
                "/Home",
                "/Knowbooks",
                "/Saved",
                "/Knowbooks",
              ]}
            />
          </Box>
        </Sticky>
      </Box>
    </div>
  );
};

export default observer(MobileDefaultLayout);
