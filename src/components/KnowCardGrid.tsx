import { observer } from "mobx-react";
import { Box } from "gestalt";
import KnowCard from "./KnowCard";
import { IAtom, AtomID, KnowbookID, IKnowbook } from "../types";

interface IKnowCardGridProps {
  knowbooks: IKnowbook[];
}

const KnowCardGrid: React.FunctionComponent<IKnowCardGridProps> = (props) => {
  if (props.knowbooks === undefined) {
    return <div />;
  } else {
    return (
      <div>
        <Box
          color="white"
          wrap={true}
          display="flex"
          direction="row"
          padding={1}
          justifyContent="around"
        >
          {props.knowbooks.map((item) => (
            <KnowCard
              key={item.id}
              id={item.id}
              name={item.name}
              image_url={item.content_atoms.slice(0, 4).map((atom) => {
                return atom.image_url;
              })}
              pathname={"/Knowbook"}
              queryObject={{ k: item.id }}
              amount={item.content_atoms.length}
            />
          ))}
        </Box>
      </div>
    );
  }
};

export default observer(KnowCardGrid);
