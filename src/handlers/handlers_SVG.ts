/*******************Page Header Modes*************************** */

import { eventT, TUiStringStorage } from "../config/globals";
import { updateSliderCircular } from "../libs/utilsSVG";
import { IStores } from "../stores/RootStore";

// export const switchPageHeaderMode =
//   (stores: IStores, page: TPages, mode: TPageHeaderModes) => (): void => {
//     stores.uiStore.setPageHeaderMode(page, mode);
//     // goPage(stores, stores.baseStore.paramsPage, configPaths.pages[page]);
//     goPage(stores, configPaths.pages[page]);
//   };

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

/*******************Slider*************************** */

export const onSliderPositionChange =
  (stores: IStores, sliderId: string) =>
  (value: number): void => {
    // stores.uiStore.updateSliderCircular(sliderId, value);
    updateSliderCircular(stores, sliderId, value);
  };
