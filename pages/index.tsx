import { observer } from "mobx-react-lite";
import React from "react";
import CardAtomGrid from "../src/components/CardAtomGrid";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../src/handlers";
import { displayCompactedGridCondition } from "../src/libs/utils";
import { useStores } from "../src/stores/_RootStoreHook";

const Home: React.FunctionComponent = (props) => {
  const stores = useStores();
  return (
    <CardAtomGrid
      id="Home"
      atoms={stores.feedStore.getFeedList()}
      isItemSaved_handler={isItemSaved(stores.savedStore)}
      isItemSavedActionable_handler={isItemSavedActivated(stores.knowbookStore)}
      saved_handler={onSaved(stores)}
      edit_handler={onEditKnowbooks(stores.uiStore, stores.knowbookStore)}
      compact={displayCompactedGridCondition(stores)}
    />
  );
};

// (Home as any).getLayoutMobile = (page: NextPage) => (
//   <MobileIndexLayout>{page}</MobileIndexLayout>
// );

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const query_search = context.query.q as string | undefined;
//   const query_action = context.query.a as string | undefined;

//   const output: ISyncBackFrontProps = await indexSyncServerClientBack(
//     query_search,
//     query_action
//   );

//   return {
//     props: output,
//   };
// };

export default observer(Home);
