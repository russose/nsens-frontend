import { observer } from "mobx-react-lite";
import Network from "../src/components/vizs/Network";
import { ParentSize } from "@visx/responsive";
import { Box } from "gestalt";
import EditKnowbooks from "../src/components/EditKnowbooks";
import { useStores } from "../src/stores/_RootStoreHook";
import { IItemDisplayMode } from "../src/stores/UIStore";

const Vizs: React.FunctionComponent = (props) => {
  const { uiStore } = useStores();
  uiStore.setItemDisplayMode(IItemDisplayMode.Network);

  const title = "Astrophysique";
  const itemId = "Q37547";
  // const title = "Albert Einstein";
  // const itemId = "Q937";
  // const itemId = "Q129026"; //Requin blanc
  return (
    <ParentSize>
      {(parent) => (
        <Box>
          <Network
            title={title}
            itemId={itemId}
            width={parent.width - 5}
            height={parent.height - 5}
          />
          <EditKnowbooks />
        </Box>
      )}
    </ParentSize>
  );
};

export default observer(Vizs);
