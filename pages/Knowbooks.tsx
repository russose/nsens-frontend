import { observer } from "mobx-react";
import { useStores } from "../src/states/_RootStore";
import CardGrid from "../src/components/CardGrid";
import { onSavedClick } from "../src/_handlers";

const Knowbooks: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  return (
    <CardGrid
      atoms={dataStore.getSavedList()}
      listOfIdsSaved={dataStore.getSavedIds()}
      saved_handler={onSavedClick(dataStore)}
      image_handler={(): void => {}}
    />
  );
};

export default observer(Knowbooks);
