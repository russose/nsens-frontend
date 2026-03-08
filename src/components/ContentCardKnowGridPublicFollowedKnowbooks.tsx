import { observer } from "mobx-react-lite";
import { configPaths } from "../config/configLocalAndEnv";
import { ICardKnowProps, KnowbookID, TKnowbooksPages } from "../config/globals";
import { onGoKnowbookPage } from "../handlers/handlers_Navigation";
import { IStores } from "../stores/RootStore";
import CardKnowGrid from "./CardKnowGrid";
import Separator from "./Separator";
import { buttons_Knowbook_Card } from "./_buttons_definition";

interface IProps {
  stores: IStores;
}

const ContentCardKnowGridPublicFollowedKnowbooks: React.FunctionComponent<
  IProps
> = (props) => {
  const stores = props.stores;
  const pathKnowbook = configPaths.pages.Knowbook;

  const followedPublicKnowbooks: KnowbookID[] = Array.from(
    stores.knowbookStore.followedPublicKnowbooks.values()
  );

  if (followedPublicKnowbooks.length === 0) {
    return <></>;
  }

  const cardKnowPropsSavedKnowbooks: ICardKnowProps[] =
    followedPublicKnowbooks.map((id) => {
      const publicKnowbook =
        props.stores.knowbookStore.historyPublicKnowbooks.get(id);
      return {
        id: publicKnowbook.name,
        stores: stores,
        // title: item.name,
        knowbook: publicKnowbook,
        // title: buildPublicName(
        //   publicKnowbook.name,
        //   publicKnowbook.owner_username
        // ),
        // image_url: publicKnowbook.image_url,
        image_handler: onGoKnowbookPage(stores)(pathKnowbook, {
          type: TKnowbooksPages.publicKnowbooks,
          title: publicKnowbook.name,
          id: publicKnowbook.id,
        }),
        // amount: undefined,
        buttons: buttons_Knowbook_Card(stores, publicKnowbook),
        // nb_saved: publicKnowbook.nb_saved,
        // public: publicKnowbook.public,
      };
    });

  return (
    <>
      {/* <HeaderTitle
        stores={stores}
        title={
          stores.baseStore.GUI_CONFIG.language.knowbooks.knowbookFollowedPublic
        }
      /> */}
      <CardKnowGrid
        id="myPublicFollowedNotebooksLogged"
        stores={stores}
        cardKnowProps={cardKnowPropsSavedKnowbooks}
      />
      <Separator with_line={true} />
    </>
  );
};

export default observer(ContentCardKnowGridPublicFollowedKnowbooks);
