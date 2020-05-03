import { observer } from "mobx-react";
import { Sticky, Box } from "gestalt";
import SearchBar from "../SearchBar";
import { onSearchHome } from "../../_handlers";

import { useStores } from "../../states/_RootStore";
import { USER_GUI_CONFIG } from "../../config";

const MobileWithSearchLayout: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();
  return (
    <div>
      <Sticky top={0}>
        <Box color="white" padding={1} display="block">
          <SearchBar
            config={USER_GUI_CONFIG.searchBar}
            handler={onSearchHome(dataStore)}
            value={dataStore.searchPattern}
          />
        </Box>
      </Sticky>

      <Box
        color="white"
        padding={1}
        display="flex"
        direction="column"
        height="90vh"
        width="100"
        justifyContent="between"
        overflow="scrollY"
      >
        {props.children}
      </Box>
    </div>
  );
};

export default observer(MobileWithSearchLayout);
