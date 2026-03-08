import { Box, SegmentedControl } from "gestalt";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import {
  IAtom,
  ICardKnowProps,
  IKnowbook,
  KnowbookID,
  TKnowbooksPages,
  TUiNumberStorage,
  configFetching,
  configPaths,
} from "../config/globals";
import { onGoKnowbookPage } from "../handlers/handlers_Navigation";
import { api_getPublicKnowbooksWithTheseItems } from "../libs/apiRelated";
import { searchAndStoreArxivAtoms } from "../libs/helpersBaseArxivScholar";
import { searchAndStoreGooglebooksAtoms } from "../libs/helpersBaseBooks";
import { searchAndStoreWikiAtoms } from "../libs/helpersBaseWiki";
import { IStores } from "../stores/RootStore";
import CardAtomGridDynamic from "./CardAtomGridDynamic";
import CardKnowGrid from "./CardKnowGrid";
import { buttons_Knowbook_Card } from "./_buttons_definition";

interface IProps {
  stores: IStores;
  refresh: boolean;
  search_string: string;
}

const ContentSearch: React.FunctionComponent<IProps> = (props) => {
  const stores = props.stores;
  const root_label = stores.baseStore.GUI_CONFIG.language.search;
  const lang = stores.baseStore.paramsPage.lang;

  const search_string = props.search_string;

  // const [controlIndex, setControlIndex] = useState(0);
  const [controlIndex, setControlIndex] = useState(
    stores.uiStore.getUiNumberStorage(TUiNumberStorage.currentSearchTabIndex)
  );
  const [searchedWikiId, setSearchedWikiId] = useState([]);
  const [searchedBooksId, setSearchedBooksId] = useState([]);
  const [searchedArxivId, setSearchedArxivId] = useState([]);
  const [searchedKnowbooksId, setSearchedKnowbooksId] = useState([]);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  async function fetchWiki(): Promise<void> {
    const items: IAtom[] = await searchAndStoreWikiAtoms(stores, search_string);
    const items_ids =
      items === undefined
        ? []
        : items.map((item) => {
            return item.id;
          });
    setSearchedWikiId(items_ids);
  }

  async function fetchBooks(): Promise<void> {
    const items: IAtom[] = await searchAndStoreGooglebooksAtoms(
      stores,
      search_string,
      configFetching.amount_searchBooks_sizeSingleBatch,
      configFetching.amount_searchBooks_amountBatch
    );
    const items_ids =
      items === undefined
        ? []
        : items.map((item) => {
            return item.id;
          });
    setSearchedBooksId(items_ids);
  }

  async function fetchArxiv(): Promise<void> {
    const items: IAtom[] = await searchAndStoreArxivAtoms(
      stores,
      search_string,
      configFetching.amount_searchArxiv
    );
    const items_ids =
      items === undefined
        ? []
        : items.map((item) => {
            return item.id;
          });
    setSearchedArxivId(items_ids);
  }

  useEffect(() => {
    if (props.refresh) {
      Promise.all([fetchWiki(), fetchBooks(), fetchArxiv()]).then(() => {
        setFetchCompleted(true);
      });
    }
  }, [search_string]);

  useEffect(() => {
    if (props.refresh) {
      if (fetchCompleted) {
        api_getPublicKnowbooksWithTheseItems(
          [...searchedWikiId, ...searchedArxivId, ...searchedBooksId],
          lang,
          configFetching.amount_searchPublicKnowbooks
        ).then((publicKnowbooks: IKnowbook[]) => {
          stores.knowbookStore.setPublicKnowbooks(publicKnowbooks);

          const searchedKnowbooksId_ =
            publicKnowbooks === undefined
              ? []
              : publicKnowbooks.map((publicKnowbook) => {
                  return publicKnowbook.id;
                });

          if (
            JSON.stringify(searchedKnowbooksId_) !==
            JSON.stringify(searchedKnowbooksId)
          ) {
            setSearchedKnowbooksId(searchedKnowbooksId_);
          }

          stores.uiStore.setSearchResults(
            searchedWikiId,
            searchedBooksId,
            searchedArxivId,
            searchedKnowbooksId
          );
        });
      }
    } else {
      setSearchedWikiId(stores.uiStore.searchResults.wiki);
      setSearchedBooksId(stores.uiStore.searchResults.books);
      setSearchedArxivId(stores.uiStore.searchResults.arxiv);
      setSearchedKnowbooksId(stores.uiStore.searchResults.knowbooksIds);
    }
  }, [fetchCompleted, searchedKnowbooksId]);

  const pathKnowbook = configPaths.pages.Knowbook;
  // const mostviewed_image = configPaths.mostviewed_image;

  const controlLabels = [
    root_label.control_wiki,
    root_label.control_books,
    root_label.control_arxiv,
    root_label.control_knowbooks,
  ];

  let content;
  if (controlIndex === 0) {
    content = (
      <CardAtomGridDynamic
        id={"Search Wiki"}
        stores={stores}
        atoms={stores.baseStore.getHistoryItems(searchedWikiId)}
      />
    );
  } else if (controlIndex === 1) {
    content = (
      <CardAtomGridDynamic
        id={"Search Books"}
        stores={stores}
        atoms={stores.baseStore.getHistoryItems(searchedBooksId)}
      />
    );
  } else if (controlIndex === 2) {
    content = (
      <CardAtomGridDynamic
        id={"Search Arxiv"}
        stores={stores}
        atoms={stores.baseStore.getHistoryItems(searchedArxivId)}
      />
    );
  } else if (controlIndex === 3) {
    const knowbooksId: KnowbookID[] = searchedKnowbooksId;

    const cardKnowProps: ICardKnowProps[] = knowbooksId.map(
      (publicKnowbookId) => {
        const publicKnowbook =
          stores.knowbookStore.getKnowbookFromId(publicKnowbookId);
        return {
          id: publicKnowbook.name,
          stores: stores,
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
      }
    );

    content = (
      <CardKnowGrid
        id="Search Knowbook"
        stores={stores}
        cardKnowProps={cardKnowProps}
      />
    );
  }

  // if (stores.baseStore.paramsPage.lang !== Tlanguage.en) {
  //   controlLabels = [
  //     root_label.control_wiki,
  //     root_label.control_books,
  //     // root_label.control_arxiv,
  //     root_label.control_knowbooks,
  //   ];
  // }

  const control = (
    <>
      <Box padding={1}></Box>
      <Box
        display="flex"
        direction="row"
        flex="grow"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          column={12}
          smColumn={12}
          mdColumn={10}
          lgColumn={6}
          padding={2}
          alignItems="center"
        >
          <SegmentedControl
            items={controlLabels}
            selectedItemIndex={controlIndex}
            onChange={({ activeIndex }) => {
              stores.uiStore.setUiNumberStorage(
                TUiNumberStorage.currentSearchTabIndex,
                activeIndex
              );
              setControlIndex(activeIndex);
            }}
          />
        </Box>
      </Box>
    </>
  );

  return (
    <>
      {control}
      {content}
    </>
  );
};

export default observer(ContentSearch);
