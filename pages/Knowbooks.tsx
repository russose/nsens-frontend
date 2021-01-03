import { Box, Divider } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG } from "../src/common/config";
import { paths } from "../src/common/configPaths";
import { ICardKnowProps } from "../src/components/CardKnow";
import CardKnowGrid from "../src/components/CardKnowGrid";
import CardKnowGridSpecial from "../src/components/CardKnowGridSpecial";
import { onDeleteKnowbook, onOpenRenameKnowbook } from "../src/handlers";
import { displayCompactedGridCondition } from "../src/libs/utils";
import { useStores } from "../src/stores/_RootStoreHook";

const Knowbooks: React.FunctionComponent = (props) => {
  const knowbook_all_title = GUI_CONFIG.language.knowbooks.AllSaved_title;
  const knowbook_none_title = GUI_CONFIG.language.knowbooks.None_Title;
  const knowbook_all_image = GUI_CONFIG.paths.knowbook_all_image;
  const knowbook_none_image = GUI_CONFIG.paths.knowbook_none_image;
  const pathKnowbookSaved = paths.pages.KnowbookSaved;
  const pathKnowbookNone = paths.pages.KnowbookNone;

  const stores = useStores();

  const cardKnowPropsSavedNone: ICardKnowProps[] = [
    {
      id: pathKnowbookSaved,
      title: knowbook_all_title,
      image_url: knowbook_all_image,
      pathname: pathKnowbookSaved,
      queryObject: {},
      amount: stores.savedStore.saved.size,
      edit_handler: undefined,
      delete_handler: undefined,
    },
    {
      id: pathKnowbookNone,
      title: knowbook_none_title,
      image_url: knowbook_none_image,
      pathname: pathKnowbookNone,
      queryObject: {},
      amount: "-",
      edit_handler: undefined,
      delete_handler: undefined,
    },
  ];

  return (
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
        compact={displayCompactedGridCondition(stores)}
      />
      <Divider />
      <CardKnowGridSpecial
        id="knowbooksSpecial"
        cardKnowProps={cardKnowPropsSavedNone}
        compact={displayCompactedGridCondition(stores)}
      />
      {/* <Box paddingY={10}></Box> */}
    </Box>
  );
};

export default observer(Knowbooks);
