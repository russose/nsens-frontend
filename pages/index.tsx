import { observer } from "mobx-react-lite";
import {
  onSaved,
  onEditKnowbooks,
  isItemSaved,
  isItemSavedActivated,
} from "../src/handlers";
import EditKnowbooks from "../src/components/EditKnowbooks";
import { Box } from "gestalt";
import CardAtomGrid from "../src/components/CardAtomGrid";
import { _login, _getUser } from "../src/_api";
import { useStores } from "../src/stores/_RootStoreHook";

const Home: React.FunctionComponent = (props) => {
  const {
    dataStore,
    uiStore,
    graphStore,
    userStore,
    knowbookStore,
  } = useStores();
  return (
    <Box>
      <CardAtomGrid
        atoms={dataStore.getFeedList()}
        isItemSaved_handler={isItemSaved(dataStore)}
        isItemSavedActionable_handler={isItemSavedActivated(knowbookStore)}
        saved_handler={onSaved(dataStore, graphStore, userStore, knowbookStore)}
        edit_handler={onEditKnowbooks(uiStore, knowbookStore)}
      />
      <EditKnowbooks />
    </Box>
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
