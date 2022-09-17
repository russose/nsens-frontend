import { observer } from "mobx-react-lite";
import { ColorT, IAtom } from "../config/globals";
import { IStores } from "../stores/RootStore";
import {
  goUserHandler_,
  onGoItemMainPage,
  showArticle,
} from "../handlers/handlers_Navigation";
import CardAtomCompactViz from "./CardAtomCompactViz";
import { isMobile } from "../libs/helpersBase";

interface IProps {
  stores: IStores;
  item: IAtom;
  color: ColorT;
}

const CardAtomCompactViz_NotLogged: React.FunctionComponent<IProps> = (
  props
) => {
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
      saved_enabled={false}
      saved_actionable={true}
      saved_handler={goUserHandler_(props.stores)(item.id)}
      edit_handler={undefined}
      top_handler={onGoItemMainPage(stores)(item.title, item.id)}
      CompactExtra={isMobile(stores)}
      color={props.color}
    />
  );
};

export default observer(CardAtomCompactViz_NotLogged);
