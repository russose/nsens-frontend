import { observer } from "mobx-react";

import MobilePagesLayout from "./MobilePagesLayout";
import { useStores } from "../../../states/_RootStore";
import { USER_GUI_CONFIG } from "../../../config";
import { onSearchHome } from "../../../_handlers";
import SearchBar from "../../SearchBar";

const MobileIndexLayout: React.FunctionComponent = (props) => {
  const { uiStore } = useStores();
  const searchbar = (
    <SearchBar
      placeholder={USER_GUI_CONFIG.searchBar}
      handler={onSearchHome(uiStore)}
      value={uiStore.searchPattern}
    />
  );
  return (
    <MobilePagesLayout top_components={searchbar}>
      {props.children}
    </MobilePagesLayout>
  );
};

export default observer(MobileIndexLayout);
