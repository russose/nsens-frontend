import { observer } from "mobx-react-lite";
import { IKnowbook, KnowbookID } from "../common/types";
import { entierAleatoire } from "../libs/utils";
import { KnowkookStore } from "../stores/KnowkookStore";
import { SavedStore } from "../stores/SavedStore";
import CardKnow from "./CardKnow";
import GridKnow from "./GridKnow";

interface ICardKnowGridProps {
  id: string;
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
    return <></>;
  } else {
    return (
      <GridKnow
        items={props.knowbooks.map((item) => {
          return (
            <CardKnow
              // key={item.name}
              key={`cardKnowbook-${props.id}-${item.name}`}
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
          );
        })}
      />
    );
  }
};

export default observer(CardKnowGrid);
