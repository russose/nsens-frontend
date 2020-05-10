import { observer } from "mobx-react";
import { useStores } from "../src/states/_RootStore";
import KnowCardGrid from "../src/components/KnowCardGrid";
import { NextPage } from "next";
import MobileKnowbookLayout from "../src/components/layout/MobileKnowbookLayout";

const Knowbooks: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  return <KnowCardGrid knowbooks={Array.from(dataStore.knowbooks.values())} />;
};

(Knowbooks as any).getLayoutMobile = (page: NextPage) => (
  <MobileKnowbookLayout>{page}</MobileKnowbookLayout>
);

export default observer(Knowbooks);
