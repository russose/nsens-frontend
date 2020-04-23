import { observer } from "mobx-react";
import SearchBar from "../src/components/SearchBar";

import { IConfigData } from "../src/types";

import data_gui from "../src/data/data_gui.json";
import { useStores } from "../src/states/_RootStore";
import { usersLoaded } from "../src/data/dataLoader";
import { onSearch, onSavedClick } from "../src/_handlers";
import MobileDefaultLayout from "../src/components/layout/MobileDefaultLayout";
import MobileWithSearchLayout from "../src/components/layout/MobileWithSearchLayout";
import CardGrid from "../src/components/CardGrid";
import Test from "./Test";

const guiConfig: IConfigData = data_gui.fr;

const Home: React.FunctionComponent = (props) => {
  const { pageLayoutStore, dataStore } = useStores();

  if (dataStore.user === undefined) {
    // pageLayoutStore.set_gui_config(data_gui.fr);
    dataStore.setUser(usersLoaded[0]);
    dataStore.setAtoms(usersLoaded[0].atoms_cache);
  }

  return (
    <MobileDefaultLayout>
      <MobileWithSearchLayout
        top={
          <SearchBar
            value={pageLayoutStore.searchPattern}
            config={guiConfig.searchBar}
            handler={onSearch(pageLayoutStore)}
          />
        }
        content={
          <CardGrid
            store={dataStore}
            atoms={dataStore.getAtomsFromSearchPattern(
              pageLayoutStore.searchPattern
            )}
            image_handler={(): void => {}}
            saved_handler={onSavedClick(dataStore)}
            // liked_handler={(): void => {}}
          />
        }
      />
    </MobileDefaultLayout>
  );
};

Test;

export default observer(Home);
