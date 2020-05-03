import { observer } from "mobx-react";
import { Sticky, Box } from "gestalt";
import MenuBar from "../MenuBar";
import { USER_GUI_CONFIG } from "../../config";
import { useStores } from "../../states/_RootStore";

const MobileDefaultLayout: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();
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
              pathPages_onClick={[
                dataStore.getHomeUrl(),
                "/Knowbooks",
                "/Knowbooks",
                "/Knowbooks",
              ]}
            />
          </Box>
        </Sticky>
      </Box>
    </div>
  );
};

//export default observer(MobileDefaultLayout);
export default MobileDefaultLayout;
