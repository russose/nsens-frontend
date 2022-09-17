import { observer } from "mobx-react-lite";
import { IAtom } from "../config/globals";
import { IStores } from "../stores/RootStore";
import CardAtom from "./CardAtom";
import {
  goUserHandler_,
  onGoItemMainPage,
  showArticle,
} from "../handlers/handlers_Navigation";

interface IProps {
  stores: IStores;
  item: IAtom;
  size_factor?: number;
}

const CardAtom_NotLogged: React.FunctionComponent<IProps> = (props) => {
  const stores = props.stores;
  const item = props.item;

  return (
    <CardAtom
      id={item.id}
      stores={stores}
      title={item.title}
      image_url={item.image_url}
      image_handler={showArticle(props.stores)(item.title, item.id)}
      saved_enabled={false}
      saved_actionable={true}
      saved_handler={goUserHandler_(props.stores)(item.id)}
      edit_handler={undefined}
      top_handler={onGoItemMainPage(stores)(item.title, item.id)}
      size_factor={props.size_factor}
    />
  );
};

export default observer(CardAtom_NotLogged);
