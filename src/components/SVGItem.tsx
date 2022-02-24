import { observer } from "mobx-react-lite";
import React from "react";
import { IAtom } from "../config/globals";
import { onEditKnowbooks } from "../handlers/handlers_Knowbooks";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../handlers/handlers_Saved";
import { showArticle } from "../handlers/handlers_Searchbar_Navigation";
import { path_link } from "../libs/utils";
import { IStores } from "../stores/RootStore";
import CardAtom from "./CardAtom";

interface IProps {
  stores: IStores;
  item: IAtom;
}

const SVGItem: React.FunctionComponent<IProps> = (props) => {
  const RATION_H_W =
    props.stores.baseStore.GUI_CONFIG.display.layout.ratio_H_W_Item;
  const height = props.stores.baseStore.GUI_CONFIG.display.atom_sizes.height;
  const width =
    props.stores.baseStore.GUI_CONFIG.display.atom_sizes.height / RATION_H_W;
  const item = props.item;
  const stores = props.stores;

  if (item === undefined) {
    return <></>;
  }

  props.stores.baseStore.setGoodImageInHistoryItem(item.id);

  return (
    <foreignObject x={-width / 2} y={-height / 2} width={width} height={height}>
      <div className="anim-element">
        <CardAtom
          // key={`cardAtomNetwork-${item.id}`}
          id={item.id}
          stores={stores}
          title={item.title}
          image_url={item.image_url}
          pathname={path_link(item.id, stores)}
          queryObject={{ title: item.title, id: item.id }}
          saved_enabled={isItemSaved(stores)(item.id)}
          saved_actionable={isItemSavedActivated(stores)(item.id)}
          saved_handler={onSaved(stores)(item.id)}
          edit_handler={onEditKnowbooks(stores)(item.id)}
          top_handler={showArticle(stores, item.title, item.id)}
        />
      </div>
    </foreignObject>
  );
};

export default observer(SVGItem);
