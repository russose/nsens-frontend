import { Box, Divider } from "gestalt";
import { observer } from "mobx-react-lite";
import { USER_DISPLAY, USER_GUI_CONFIG } from "../src/common/config";
import CardKnow from "../src/components/CardKnow";
import CardKnowGrid from "../src/components/CardKnowGrid";
import GridKnow from "../src/components/GridKnow";
import { onDeleteKnowbook, onOpenRenameKnowbook } from "../src/handlers";
import { useStores } from "../src/stores/_RootStoreHook";

const knowbook_all_title = USER_GUI_CONFIG.knowbooks.AllSaved_title;
const knowbook_none_title = USER_GUI_CONFIG.knowbooks.None_Title;
const knowbook_all_image = USER_DISPLAY.paths.knowbook_all_image;
const knowbook_none_image = USER_DISPLAY.paths.knowbook_none_image;

const Knowbooks: React.FunctionComponent = (props) => {
  const { savedStore, uiStore, knowbookStore } = useStores();

  const Saved = (
    <CardKnow
      id="saved knowbook"
      title={knowbook_all_title}
      image_url={knowbook_all_image}
      pathname="Saved"
      queryObject={{}}
      amount={savedStore.saved.size}
      edit_handler={undefined}
      delete_handler={undefined}
    />
  );

  const None = (
    <CardKnow
      id="none knowbook"
      title={knowbook_none_title}
      image_url={knowbook_none_image}
      pathname="None"
      queryObject={{}}
      amount="-"
      edit_handler={undefined}
      delete_handler={undefined}
    />
  );

  return (
    <Box>
      <CardKnowGrid
        id="knowbooks"
        knowbooks={Array.from(knowbookStore.knowbooks.values())}
        edit_handler={onOpenRenameKnowbook(uiStore)}
        delete_handler={onDeleteKnowbook(savedStore, knowbookStore)}
        savedStore={savedStore}
        knowbookStore={knowbookStore}
      />
      <Divider />
      <GridKnow items={[Saved, None]} />
      {/* <Box paddingY={10}></Box> */}
    </Box>
  );
};

export default observer(Knowbooks);
