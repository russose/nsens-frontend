import { observer } from "mobx-react-lite";
import CardAtomGrid from "../src/components/CardAtomGrid";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../src/handlers";
import { useStores } from "../src/stores/_RootStoreHook";

const Home: React.FunctionComponent = (props) => {
  const {
    savedStore,
    uiStore,
    userStore,
    knowbookStore,
    feedStore,
  } = useStores();
  return (
    <>
      <CardAtomGrid
        id="home"
        atoms={feedStore.getFeedList()}
        isItemSaved_handler={isItemSaved(savedStore)}
        isItemSavedActionable_handler={isItemSavedActivated(knowbookStore)}
        saved_handler={onSaved(savedStore, userStore, knowbookStore, feedStore)}
        edit_handler={onEditKnowbooks(uiStore, knowbookStore)}
      />
    </>
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
