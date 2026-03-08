import { observer } from "mobx-react-lite";
import {
  configPaths,
  ICardKnowProps,
  IKnowbook,
  TKnowbooksPages,
} from "../config/globals";
import { onGoKnowbookPage } from "../handlers/handlers_Navigation";
import { IStores } from "../stores/RootStore";
import { buttons_Knowbook_Card } from "./_buttons_definition";
import CardKnowGrid from "./CardKnowGrid";

interface IProps {
  stores: IStores;
}

const ContentCardKnowGridPublicKnowbooks: React.FunctionComponent<IProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const stores = props.stores;

  const pathKnowbook = configPaths.pages.Knowbook;
  const pathKnowbookSpecial = configPaths.pages.KnowbookSpecial;
  const knowbook_mostviewed_title =
    GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.Mostviewed.title;
  const mostviewed_image = configPaths.mostviewed_image;

  const publicKnowbook_all = stores.knowbookStore.getPublicKnowbooks_all();

  const publicKnowbook_without_mine: IKnowbook[] = publicKnowbook_all
    // .filter((item) => {
    //   return item.id >= 0;
    // })
    .filter((item) => {
      return !stores.baseStore.isLogged
        ? true
        : item.owner !== stores.baseStore.user.userId;

      // return item.owner !== stores.baseStore.user.userId;
    });

  const publicKnowbook_without_mine_without_followed: IKnowbook[] =
    publicKnowbook_without_mine.filter((item) => {
      return !stores.knowbookStore.followedPublicKnowbooks.has(item.id);
    });

  const cardKnowPropsPublic: ICardKnowProps[] =
    publicKnowbook_without_mine_without_followed.map((item) => {
      return {
        id: item.name,
        stores: stores,
        knowbook: item,
        // title: item.name + " (" + item.owner_username + ")",
        // title: buildPublicName(item.name, item.owner_username),
        // image_url: item.image_url,
        image_handler: onGoKnowbookPage(stores)(pathKnowbook, {
          type: TKnowbooksPages.publicKnowbooks,
          title: item.name,
          id: item.id,
        }),
        // amount: undefined,
        buttons: buttons_Knowbook_Card(stores, item),
        // nb_saved: item.nb_saved,
        // public: item.public,
      };
    });

  const knowbookMostviewed: IKnowbook = {
    id: 0,
    name: knowbook_mostviewed_title,
    description: undefined,
    sourceUrl: undefined,
    owner: undefined,
    language: undefined,
    public: false,
    image_url: mostviewed_image,
    // image_rank: number;
    items: undefined,
    nb_saved: undefined,
  };

  const cardKnowPropsMostviewed: ICardKnowProps[] = [
    {
      id: knowbook_mostviewed_title,
      stores: stores,
      knowbook: knowbookMostviewed,
      // title: knowbook_mostviewed_title,
      // image_url: mostviewed_image,
      image_handler: onGoKnowbookPage(stores)(pathKnowbookSpecial, {
        type: TKnowbooksPages.Mostviewed,
        title: "",
        id: -1,
      }),
      // amount: undefined,
      buttons: [],
      // nb_saved: undefined,
      // public: false,
    },
  ];

  return (
    <>
      {/* <HeaderTitle
        stores={stores}
        title={GUI_CONFIG.language.knowbooks.knowbookFeatured}
      /> */}
      <CardKnowGrid
        id="PublicNotebooks"
        stores={stores}
        cardKnowProps={[
          ...cardKnowPropsMostviewed,
          ...cardKnowPropsPublic,
          // ...cardKnowPropsStatic,
        ]}
      />
    </>
  );
};

export default observer(ContentCardKnowGridPublicKnowbooks);
