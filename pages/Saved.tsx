import { observer } from "mobx-react";
import { useStores } from "../src/states/_RootStore";
import ContentGrid from "../src/components/CardGrid";
import { onSavedClick } from "../src/_handlers";

const Saved: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  return (
    <ContentGrid
      store={dataStore}
      atoms={dataStore.getSavedAtoms()}
      image_handler={(): void => {}}
      saved_handler={onSavedClick(dataStore)}
      // liked_handler={(): void => {}}
    />
  );
};

export default observer(Saved);
