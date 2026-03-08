import { observer } from "mobx-react-lite";
import {
  configGeneral,
  configPaths,
  ICardKnowProps,
  IKnowbook,
  TKnowbooksPages,
} from "../config/globals";
import { onGoKnowbookPage } from "../handlers/handlers_Navigation";
import { IStores } from "../stores/RootStore";
import CardKnowGrid from "./CardKnowGrid";
import { buttons_Knowbook_Card } from "./_buttons_definition";

interface IProps {
  stores: IStores;
  public?: boolean;
}

const ContentCardKnowGridMyKnowbooks: React.FunctionComponent<IProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const stores = props.stores;
  const pathKnowbook = configPaths.pages.Knowbook;

  const pathKnowbookSpecial = configPaths.pages.KnowbookSpecial;
  const knowbook_all_title =
    GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.AllSaved.title;
  const knowbook_all_image = configPaths.knowbook_all_image;
  const knowbook_all_color = configGeneral.colors.knowbook_all_color;

  let cardKnowPropsSavedAll: ICardKnowProps[] = [];

  const knowbookSavedAll: IKnowbook = {
    id: 0,
    name: knowbook_all_title,
    description: undefined,
    sourceUrl: undefined,
    owner: undefined,
    // owner_username?: string;
    language: undefined,
    public: false,
    image_url: knowbook_all_image,
    // image_rank: number;
    items: undefined,
    nb_saved: undefined,
  };

  // if (!props.public) {
  cardKnowPropsSavedAll = [
    {
      id: pathKnowbookSpecial + "all",
      stores: stores,
      knowbook: knowbookSavedAll,
      // title: knowbook_all_title,
      // image_url: knowbook_all_image,
      color_image: knowbook_all_color,
      image_handler: onGoKnowbookPage(stores)(pathKnowbookSpecial, {
        type: TKnowbooksPages.AllSaved,
        title: "",
        id: -1,
      }),
      // amount: stores.savedStore.saved.size,
      buttons: [],
      // nb_saved: undefined,
      // public: false,
    },
    // {
    //   id: pathKnowbookSpecial + "none",
    //   stores: stores,
    //   title: knowbook_none_title,
    //   image_url: knowbook_none_image,
    //   color_image: knowbook_none_color,
    //   image_handler: onGoKnowbookPage(stores)(pathKnowbookSpecial, {
    //     type: TKnowbooksPages.NoKnowbook,
    //     name: "",
    //     id: -1,
    //   }),
    //   amount: "-",
    //   // followPublic_handler: undefined,
    //   // followPublic_color: undefined,
    //   // delete_handler: undefined,
    //   buttons: [],
    // },
  ];
  // }

  let knowbooks;
  if (props.public === undefined) {
    knowbooks = Array.from(stores.knowbookStore.knowbooks.values());
  } else {
    knowbooks = Array.from(stores.knowbookStore.knowbooks.values()).filter(
      (knowbook) => {
        return knowbook.public === props.public;
      }
    );
  }

  const cardKnowPropsLogged: ICardKnowProps[] =
    // Array.from(
    //   stores.knowbookStore.knowbooks.values()
    // )
    knowbooks.map((item) => {
      return {
        id: item.name,
        stores: stores,
        knowbook: item,
        // title: item.public
        //   ? buildPublicName(item.name, stores.baseStore.user.username)
        //   : item.name,
        // title: !item.public
        //   ? item.name + GUI_CONFIG.language.knowbooks.privateLabel
        //   : item.name,
        // image_url: item.image_url,
        image_handler: onGoKnowbookPage(stores)(pathKnowbook, {
          type: TKnowbooksPages.myKnowbooks,
          title: item.name,
          id: item.id,
        }),
        // amount: item.items.length,
        buttons: buttons_Knowbook_Card(stores, item),
        // nb_saved: item.nb_saved,
        // public: item.public,
      };
    });

  return (
    <>
      {/* <HeaderTitle
        stores={stores}
        title={GUI_CONFIG.language.knowbooks.knowbookUserPrivate}
      /> */}
      <CardKnowGrid
        id="myNotebooksLogged"
        stores={stores}
        cardKnowProps={[...cardKnowPropsLogged, ...cardKnowPropsSavedAll]}
      />
    </>
  );
};

export default observer(ContentCardKnowGridMyKnowbooks);
