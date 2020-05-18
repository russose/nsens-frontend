import { observer } from "mobx-react";
import { Box } from "gestalt";
import KnowCard from "./KnowCard";
import { IKnowbook } from "../../types";
import { DataStore } from "../../states/DataStore";

interface IKnowCardGridProps {
  knowbooks: IKnowbook[];
  datastore: DataStore;
}

const KnowCardGrid: React.FunctionComponent<IKnowCardGridProps> = (props) => {
  if (props.knowbooks === undefined) {
    return <Box></Box>;
  } else {
    return (
      <Box
        color="white"
        wrap={true}
        display="flex"
        direction="row"
        padding={1}
        justifyContent="center"
      >
        {props.knowbooks.map((item) => (
          <KnowCard
            key={item.id}
            id={item.id}
            name={item.name}
            images_url={props.datastore
              .getAtomsFromAtomIdList(item.content_atoms.slice(0, 4))
              .map((atom) => {
                return atom.image_url;
              })}
            pathname={"/Knowbooks/Knowbook"}
            queryObject={{ k: item.id }}
            amount={item.content_atoms.length}
          />
        ))}
      </Box>
    );
  }
};

export default observer(KnowCardGrid);
