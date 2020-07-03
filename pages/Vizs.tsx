import { observer } from "mobx-react";
import { useStores } from "../src/stores/_RootStore";

const Vizs: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  return <div> Vizs... To be completed</div>;
};

export default observer(Vizs);
