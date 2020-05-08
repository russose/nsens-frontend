import { observer } from "mobx-react";
import { useStores } from "../src/states/_RootStore";

const More: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  return <div> More... To be completed</div>;
};

export default observer(More);
