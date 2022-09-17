import { observer } from "mobx-react-lite";
import { ColorT, IAtom } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { onGoItemMainPage, showArticle } from "../handlers/handlers_Navigation";
import CardAtomCompactViz from "./CardAtomCompactViz";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../handlers/handlers_Saved";
import { onEditKnowbooks } from "../handlers/handlers_Knowbooks";
import { isMobile } from "../libs/helpersBase";

interface IProps {
  stores: IStores;
  item: IAtom;
  color: ColorT;
}

const CardAtomCompactViz_Logged: React.FunctionComponent<IProps> = (props) => {
  const stores = props.stores;
  const item = props.item;

  return (
    <CardAtomCompactViz
      key={`CardAtomCompactViz-${item.id}`}
      id={item.id}
      stores={stores}
      title={item.title}
      image_url={item.image_url}
      image_handler={showArticle(stores)(item.title, item.id)}
      saved_enabled={isItemSaved(stores)(item.id)}
      saved_actionable={isItemSavedActivated(stores)(item.id)}
      saved_handler={onSaved(stores)(item.id)}
      edit_handler={onEditKnowbooks(stores)(item.id)}
      top_handler={onGoItemMainPage(stores)(item.title, item.id)}
      CompactExtra={isMobile(stores)}
      color={props.color}
    />
  );
};

export default observer(CardAtomCompactViz_Logged);
