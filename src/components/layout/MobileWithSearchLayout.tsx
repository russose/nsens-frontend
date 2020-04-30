import { observer } from "mobx-react";
import { Sticky, Box } from "gestalt";
import SearchBar from "../SearchBar";
import { onSearchHome } from "../../_handlers";

import data_gui from "../../data/data_gui.json";
import { IConfigData } from "../../types";
import { useStores } from "../../states/_RootStore";
const guiConfig: IConfigData = data_gui.fr;

const MobileWithSearchLayout: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();
  return (
    <div>
      <Sticky top={0}>
        <Box color="green" padding={1} display="block">
          <SearchBar
            config={guiConfig.searchBar}
            handler={onSearchHome(dataStore)}
          />
        </Box>
      </Sticky>

      <Box
        color="blue"
        padding={1}
        display="flex"
        direction="column"
        height="85vh"
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
