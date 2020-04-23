import { observer } from "mobx-react";
import SearchBar from "../src/components/SearchBar";
import KnowbooksContent from "../src/components/ContentKnowbooks";

import { IConfigData } from "../src/types";

import data_gui from "../src/data/data_gui.json";
import MobileWithSearchLayout from "../src/components/layout/MobileWithSearchLayout";
import MobileDefaultLayout from "../src/components/layout/MobileDefaultLayout";
const guiConfig: IConfigData = data_gui.fr;

const Knowbooks: React.FunctionComponent = (props) => {
  return (
    <MobileDefaultLayout>
      <MobileWithSearchLayout
        top={
          <SearchBar
            value=""
            config={guiConfig.searchBar}
            handler={(): void => {}}
          />
        }
        content={<KnowbooksContent />}
      />
    </MobileDefaultLayout>
  );
};

export default observer(Knowbooks);
