import { observer } from "mobx-react-lite";
import { Box } from "gestalt";
import { IKnowbook, KnowbookID } from "../common/types";
import { SavedStore } from "../stores/SavedStore";
import CardKnow from "./CardKnow";
import { entierAleatoire } from "../libs/utils";
import { KnowkookStore } from "../stores/KnowkookStore";

interface ICardKnowGridProps {
  knowbooks: IKnowbook[];
  edit_handler: any;
  delete_handler: any;
  savedStore: SavedStore;
  knowbookStore: KnowkookStore;
}

// const image_path = USER_DISPLAY.paths.knowbook_image;

function getKnowbookImage(
  knowbook: KnowbookID,
  savedStore: SavedStore,
  knowbookStore: KnowkookStore
): string {
  let image_paths_list: string[] = knowbookStore
    .getKnowbookAtomsList(knowbook, savedStore)
    .map((item) => {
      return item.image_url;
    });
  image_paths_list = image_paths_list.filter((item) => {
    return item !== "";
  });
  if (image_paths_list.length === 0) {
    return "";
  } else {
    const image_path =
      image_paths_list[entierAleatoire(0, image_paths_list.length - 1)];
    return image_path;
  }
}

const CardKnowGrid: React.FunctionComponent<ICardKnowGridProps> = (props) => {
  if (
    props.knowbooks === undefined ||
    props.knowbooks === null ||
    props.knowbooks.length === 0
  ) {
    return null;
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
          <CardKnow
            // key={item.name}
            key={`cardKnowbook-${item.name}`}
            id={item.name}
            title={item.name}
            // image_url={image_path}
            image_url={getKnowbookImage(
              item.name,
              props.savedStore,
              props.knowbookStore
            )}
            pathname={"/Knowbook"}
            queryObject={{ title: item.name }}
            amount={item.items.length}
            edit_handler={props.edit_handler(item.name)}
            delete_handler={props.delete_handler(item.name)}
          />
        ))}
      </Box>
    );
  }
};

export default observer(CardKnowGrid);
