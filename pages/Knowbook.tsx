import { observer } from "mobx-react";
import { useStores } from "../src/states/_RootStore";
import AtomCardGridSaved from "../src/components/AtomCardGridSaved";
import { onSavedClick } from "../src/_handlers";
import { useRouter } from "next/router";
import MobileKnowbookLayout from "../src/components/layout/MobileKnowbookLayout";
import { NextPage } from "next";

const Knowbook: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  const router = useRouter();
  let selected_knowbook = router.query.k as string;

  return (
    <AtomCardGridSaved
      atoms={dataStore.getKnowbookAtomsList(selected_knowbook)}
      listOfIdsSaved={dataStore.getSavedIds()}
      saved_handler={onSavedClick(dataStore)}
    />
  );
};

(Knowbook as any).getLayoutMobile = (page: NextPage) => (
  <MobileKnowbookLayout>{page}</MobileKnowbookLayout>
);

export default observer(Knowbook);
