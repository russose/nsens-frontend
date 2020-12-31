import { ParentSize } from "@visx/responsive";
import { observer } from "mobx-react-lite";
import Dialogs from "../src/components/Dialogs";

// import { useStores } from "../src/stores/_RootStoreHook";
// import { IItemDisplayMode } from "../src/stores/UIStore";

const Vizs: React.FunctionComponent = (props) => {
  // const { uiStore } = useStores();
  // uiStore.setItemDisplayMode(IItemDisplayMode.Network);

  return (
    <ParentSize>
      {(parent) => (
        <>
          {/* <Example width={parent.width - 5} height={parent.height - 5} /> */}
          <Dialogs />
        </>
      )}
    </ParentSize>
  );
};

export default observer(Vizs);
