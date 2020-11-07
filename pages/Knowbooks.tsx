import { observer } from "mobx-react-lite";
import { Box } from "gestalt";

import CardKnowGrid from "../src/components/CardKnowGrid";
import CardKnow from "../src/components/CardKnow";
import { useStores } from "../src/stores/_RootStore";
import { USER_DISPLAY, USER_GUI_CONFIG } from "../src/common/config";
import RenameKnowbooks from "../src/components/RenameKnowbooks";
import { onDeleteKnowbook, onOpenRenameKnowbook } from "../src/handlers";

const path_knowbook_image = USER_DISPLAY.paths.knowbook_image;

const Knowbooks: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();

  return (
    <Box>
      <CardKnowGrid
        knowbooks={Array.from(dataStore.knowbooks.values())}
        edit_handler={onOpenRenameKnowbook(uiStore)}
        delete_handler={onDeleteKnowbook(dataStore)}
        datastore={dataStore}
      />
      <Box
        //wrap={true}
        display="flex"
        direction="row"
        //padding={1}
        justifyContent="center"
      >
        <CardKnow
          id="saved"
          title={USER_GUI_CONFIG.knowbooks.AllSaved_title}
          image_url={path_knowbook_image}
          pathname="Saved"
          queryObject={{}}
          amount={dataStore.saved.size}
          edit_handler={undefined}
          delete_handler={undefined}
        />
        <CardKnow
          id="none"
          title={USER_GUI_CONFIG.knowbooks.None_Title}
          image_url={path_knowbook_image}
          pathname="None"
          queryObject={{}}
          amount="-"
          edit_handler={undefined}
          delete_handler={undefined}
        />
      </Box>
      <Box paddingY={10}></Box>
      <RenameKnowbooks />
    </Box>
  );
};

export default observer(Knowbooks);
