import {
  TButtonID,
  configButtonsPath,
  configPaths,
  eventT,
  TPageHeaderModes,
  TPages,
  TUiStringStorage,
} from "../config/globals";
import { goPage, setFeedFromSearch, updateHome } from "../libs/helpersBase";
import { path_link } from "../libs/utils";
import { IStores } from "../stores/RootStore";

/*******************Logo*************************** */
export const onTapLogo = (stores: IStores) => (): void => {
  updateHome(stores);
  goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);

  // goRandomStaticKnowbook(stores);
};

/*******************Searchbar*************************** */

export const onSearchHomeText =
  (stores: IStores) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
    stores.uiStore.setUiStringStorage(
      TUiStringStorage.searchPattern,
      input.value
    );
    // console.log(uiStore.searchPattern);
  };

export const onSearchHomeSubmit = (stores: IStores) => (): void => {
  const searchPattern = stores.uiStore.getUiStringStorage(
    TUiStringStorage.searchPattern
  );
  if (searchPattern.length > 0) {
    setFeedFromSearch(stores, searchPattern);
    goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Search);
  } else {
    updateHome(stores);
    goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
  }
  // goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Search);
};

export const onSearchHomeKeyboard =
  (stores: IStores) =>
  (input: { event: eventT; value: string }): void => {
    if (input.event.key === "Enter") {
      onSearchHomeSubmit(stores)();
    } else if (input.event.key === "Escape") {
      stores.uiStore.setUiStringStorage(TUiStringStorage.searchPattern, "");
    }
  };

/*******************Navigation*************************** */

export const onMenuButtonPath =
  (stores: IStores) =>
  (buttonId: TButtonID): string => {
    if (buttonId === TButtonID.ARTICLE) {
      return path_link(stores.uiStore.selectedAtom.id, stores);
    }

    return configButtonsPath[buttonId];
  };

/*******************Slider*************************** */

export const onSliderPositionChange =
  (stores: IStores, sliderId: string) =>
  (value: number): void => {
    // const slider = stores.uiStore.sliders.get(sliderId);
    // console.log(slider.position);
    // console.log("max", slider.max);
    stores.uiStore.updateSliderCircular(sliderId, value);
  };

/*******************Page Header Modes*************************** */

export const switchPageHeaderMode =
  (stores: IStores, page: TPages, mode: TPageHeaderModes) => (): void => {
    stores.uiStore.setPageHeaderMode(page, mode);
    goPage(stores, stores.baseStore.paramsPage, configPaths.pages[page]);
  };

export const onDropdownSelection =
  (stores: IStores) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
    stores.uiStore.setUiStringStorage(
      TUiStringStorage.dropdownselection,
      input.value
    );
    const slider = stores.uiStore.sliders.get(stores.graphStore.rootItemId);
    // console.log("slider", slider.position, slider.positionOneStep);
    stores.uiStore.initSlider(slider.id, slider.max);
  };
