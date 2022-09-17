import { observer } from "mobx-react-lite";
import { IAtom } from "../config/globals";
import { IStores } from "../stores/RootStore";
import CardAtom from "./CardAtom";
import { onEditKnowbooks } from "../handlers/handlers_Knowbooks";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../handlers/handlers_Saved";
import { onGoItemMainPage, showArticle } from "../handlers/handlers_Navigation";

interface IProps {
  stores: IStores;
  item: IAtom;
  size_factor?: number;
}

const CardAtom_Logged: React.FunctionComponent<IProps> = (props) => {
  const stores = props.stores;
  const item = props.item;

  return (
    <CardAtom
      id={item.id}
      stores={stores}
      title={item.title}
      image_url={item.image_url}
      image_handler={showArticle(props.stores)(item.title, item.id)}
      saved_enabled={isItemSaved(stores)(item.id)}
      saved_actionable={isItemSavedActivated(stores)(item.id)}
      saved_handler={onSaved(stores)(item.id)}
      edit_handler={onEditKnowbooks(stores)(item.id)}
      top_handler={onGoItemMainPage(stores)(item.title, item.id)}
      size_factor={props.size_factor}
    />
  );
};

export default observer(CardAtom_Logged);
