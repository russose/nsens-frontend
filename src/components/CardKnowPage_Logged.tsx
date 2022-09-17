import { observer } from "mobx-react-lite";
import { configPaths, ICardKnowProps, TSpecialPages } from "../config/globals";
import { onGoNotebookPage } from "../handlers/handlers_Navigation";
import { IStores } from "../stores/RootStore";
import {
  onDeleteKnowbook,
  onOpenRenameKnowbook,
} from "../handlers/handlers_Knowbooks";
import HeaderTitle from "./HeaderTitle";
import Separator from "./Separator";
import CardKnowGrid from "./CardKnowGrid";

interface IProps {
  stores: IStores;
}

const CardKnowPageLogged: React.FunctionComponent<IProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const stores = props.stores;

  const pathKnowbookSpecial = configPaths.pages.KnowbookSpecial;
  const knowbook_all_title =
    GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.AllSaved.title;
  const knowbook_none_title =
    GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.NoKnowbook.title;
  const knowbook_all_image = configPaths.knowbook_all_image;
  const knowbook_none_image = configPaths.knowbook_none_image;
  const knowbook_all_color = configPaths.knowbook_all_color;
  const knowbook_none_color = configPaths.knowbook_none_color;
  const pathKnowbook = configPaths.pages.Knowbook;

  const cardKnowPropsSavedNone: ICardKnowProps[] = [
    {
      id: pathKnowbookSpecial + "all",
      stores: stores,
      title: knowbook_all_title,
      image_url: knowbook_all_image,
      color_image: knowbook_all_color,
      image_handler: onGoNotebookPage(stores)(pathKnowbookSpecial, {
        pageType: TSpecialPages.AllSaved,
      }),
      amount: stores.savedStore.saved.size,
      rename_handler: undefined,
      delete_handler: undefined,
    },
    {
      id: pathKnowbookSpecial + "none",
      stores: stores,
      title: knowbook_none_title,
      image_url: knowbook_none_image,
      color_image: knowbook_none_color,
      image_handler: onGoNotebookPage(stores)(pathKnowbookSpecial, {
        pageType: TSpecialPages.NoKnowbook,
      }),
      amount: "-",
      rename_handler: undefined,
      delete_handler: undefined,
    },
  ];

  const cardKnowPropsLogged: ICardKnowProps[] = Array.from(
    stores.knowbookStore.knowbooks.values()
  ).map((item) => {
    return {
      id: item.name,
      stores: stores,
      title: item.name,
      image_url: stores.knowbookStore.getImageKnowbook(item.name),
      image_handler: onGoNotebookPage(stores)(pathKnowbook, {
        nameOrPeriod: item.name,
      }),
      amount: item.items.length,
      rename_handler: onOpenRenameKnowbook(stores),
      delete_handler: onDeleteKnowbook(stores),
    };
  });

  return (
    <>
      <HeaderTitle
        stores={stores}
        title={GUI_CONFIG.language.labels.knowbookUser}
      />
      <CardKnowGrid
        id="NotebooksLogged"
        stores={stores}
        knowbooks={[...cardKnowPropsLogged, ...cardKnowPropsSavedNone]}
      />
      <Separator with_line={true} />
    </>
  );
};

export default observer(CardKnowPageLogged);
