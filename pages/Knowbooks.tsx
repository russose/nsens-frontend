import { Box, Divider } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG } from "../src/common/config";
import { paths } from "../src/common/configPaths";
import CardKnow from "../src/components/CardKnow";
import CardKnowGrid from "../src/components/CardKnowGrid";
import GridKnow from "../src/components/GridKnow";
import AppLayout from "../src/components/layout/AppLayout";
import { onDeleteKnowbook, onOpenRenameKnowbook } from "../src/handlers";
import { useStores } from "../src/stores/_RootStoreHook";

const knowbook_all_title = GUI_CONFIG.language.knowbooks.AllSaved_title;
const knowbook_none_title = GUI_CONFIG.language.knowbooks.None_Title;
const knowbook_all_image = GUI_CONFIG.paths.knowbook_all_image;
const knowbook_none_image = GUI_CONFIG.paths.knowbook_none_image;
const pathKnowbookSaved = paths.pages.KnowbookSaved;
const pathKnowbookNone = paths.pages.KnowbookNone;

const Knowbooks: React.FunctionComponent = (props) => {
  const stores = useStores();

  const Saved = (
    <CardKnow
      id={pathKnowbookSaved}
      title={knowbook_all_title}
      image_url={knowbook_all_image}
      pathname={pathKnowbookSaved}
      queryObject={{}}
      amount={stores.savedStore.saved.size}
      edit_handler={undefined}
      delete_handler={undefined}
    />
  );

  const None = (
    <CardKnow
      id={pathKnowbookNone}
      title={knowbook_none_title}
      image_url={knowbook_none_image}
      pathname={pathKnowbookNone}
      queryObject={{}}
      amount="-"
      edit_handler={undefined}
      delete_handler={undefined}
    />
  );

  return (
    <AppLayout>
      <Box>
        <CardKnowGrid
          id="knowbooks"
          knowbooks={Array.from(stores.knowbookStore.knowbooks.values())}
          edit_handler={onOpenRenameKnowbook(stores.uiStore)}
          delete_handler={onDeleteKnowbook(
            stores.savedStore,
            stores.knowbookStore
          )}
          savedStore={stores.savedStore}
          knowbookStore={stores.knowbookStore}
        />
        <Divider />
        <GridKnow items={[Saved, None]} />
        {/* <Box paddingY={10}></Box> */}
      </Box>
    </AppLayout>
  );
};

export default observer(Knowbooks);
