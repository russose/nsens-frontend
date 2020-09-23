import { observer } from "mobx-react";
import {
  onSaved,
  onEditKnowbooks,
  isItemSaved,
  isItemSavedActivated,
} from "../src/handlers";
import { useStores } from "../src/stores/_RootStore";
import EditKnowbooks from "../src/components/EditKnowbooks";
import { Box } from "gestalt";
import CardAtomGrid from "../src/components/CardAtomGrid";
import { _login, _getUser } from "../src/_api";
import { CONFIG_OPS } from "../src/common/config_env";

const Home: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();
  return (
    <Box>
      <CardAtomGrid
        atoms={dataStore.getFeedList()}
        isItemSaved_handler={isItemSaved(dataStore)}
        isItemSavedActionable_handler={isItemSavedActivated(dataStore)}
        saved_handler={onSaved(dataStore)}
        edit_handler={onEditKnowbooks(uiStore, dataStore)}
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
