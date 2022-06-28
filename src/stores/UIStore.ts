import { observable, action, makeObservable } from "mobx";
import {
  AtomID,
  IparamsAtom,
  ISlider,
  KnowbookID,
  TPageHeaderModes,
  TPages,
  TUiBooleanStorage,
  TUiNumberStorage,
  TUiStringStorage,
} from "../config/globals";
import { RootStore } from "./RootStore";

// const SLIDER_MOVE_TOLERANCE_RATE = 0.8;
export class UIStore {
  $rootStore: RootStore;
  private $selectedAtom: IparamsAtom = { id: "", title: "" };
  private $editKnowbookMembers = observable.map<KnowbookID, boolean>();
  private $selectedKnowbookIdName: KnowbookID = "";
  private $sliders = observable.map<string, ISlider>();
  private $pageHeaderMode = observable.map<TPages, TPageHeaderModes>();
  private $uiStringStorage = observable.map<TUiStringStorage, string>();
  private $uiBooleanStorage = observable.map<TUiBooleanStorage, boolean>();

  private $uiNumberStorage = observable.map<TUiNumberStorage, number>();

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<UIStore, "$selectedAtom" | "$selectedKnowbookIdName">(this, {
      $selectedAtom: observable,
      $selectedKnowbookIdName: observable,
      init: action,
      initUiStorage: action,
      setUiStringStorage: action,
      setUiBooleanStorage: action,
      setUiNumberStorage: action,
      initPageHeaderMode: action,
      setPageHeaderMode: action,
      setSelectedAtom: action,
      setEditKnowbookMembers: action,
      // clearEditKnowbookMembers: action,
      setSelectedKnowbookIdName: action,
      setSliders: action,
      initSlider: action,
      // updateSliderCircular: action,
    });
  }

  init() {
    this.initPageHeaderMode();
    this.initUiStorage();
  }

  initUiStorage(): void {
    const TUiStringStorage_list = Object.values(TUiStringStorage);
    const TUiBooleanStorage_list = Object.values(TUiBooleanStorage);
    const TUiNumberStorage_list = Object.values(TUiNumberStorage);

    for (const key of TUiStringStorage_list) {
      this.$uiStringStorage.set(key, "");
    }
    for (const key of TUiBooleanStorage_list) {
      this.$uiBooleanStorage.set(key, false);
    }
    for (const key of TUiNumberStorage_list) {
      this.$uiNumberStorage.set(key, 0);
    }
  }

  getUiStringStorage(key: TUiStringStorage) {
    return this.$uiStringStorage.get(key);
  }
  getUiBooleanStorage(key: TUiBooleanStorage) {
    return this.$uiBooleanStorage.get(key);
  }
  getUiNumberStorage(key: TUiNumberStorage) {
    return this.$uiNumberStorage.get(key);
  }

  setUiStringStorage(key: TUiStringStorage, value: string): void {
    this.$uiStringStorage.set(key, value);
  }
  setUiBooleanStorage(key: TUiBooleanStorage, value: boolean): void {
    this.$uiBooleanStorage.set(key, value);
  }
  setUiNumberStorage(key: TUiNumberStorage, value: number): void {
    this.$uiNumberStorage.set(key, value);
  }

  initPageHeaderMode(): void {
    // this.$pageHeaderMode.set(
    //   TPages.Home,
    //   TPageHeaderModes.homeFeaturedKnowbooks
    // );
    this.$pageHeaderMode.set(
      TPages.ItemCircle,
      TPageHeaderModes.itemAllRelated
    );

    const pages_list = Object.values(TPages);

    for (const page of pages_list) {
      if (!this.$pageHeaderMode.has(page)) {
        this.$pageHeaderMode.set(page, TPageHeaderModes.none);
      }
    }
  }
  setPageHeaderMode(page: TPages, mode: TPageHeaderModes): void {
    this.$pageHeaderMode.set(page, mode);
  }
  isPageHeaderMode(page: TPages, mode: TPageHeaderModes): boolean {
    return this.$pageHeaderMode.get(page) === mode;
  }

  get sliders() {
    return this.$sliders;
  }
  setSliders(slider: ISlider): void {
    this.$sliders.set(slider.id, slider);
  }

  initSlider(sliderId: string, max: number): void {
    const slider = {
      id: sliderId,
      position: 0,
      positionOneStep: 0,
      max: max,
      maxOneStep: 360,
    };
    this.$sliders.set(slider.id, slider);
  }

  // updateSliderCircular(id: string, value: number): void {
  //   const slider = this.sliders.get(id);

  //   if (slider === undefined) {
  //     return;
  //   }

  //   const tolerance = slider.maxOneStep * SLIDER_MOVE_TOLERANCE_RATE;
  //   const current_PositionOneStep = slider.positionOneStep;
  //   const current_Position = slider.position;
  //   const delta = value - current_PositionOneStep;

  //   let new_Position: number;
  //   if (Math.abs(delta) < tolerance) {
  //     new_Position = current_Position + delta;
  //   } else {
  //     if (delta < 0) {
  //       new_Position = current_Position + value;
  //     } else {
  //       new_Position = current_Position - slider.maxOneStep + value;
  //     }
  //   }

  //   if (new_Position >= 0 && new_Position <= slider.max) {
  //     slider.positionOneStep = value;
  //     slider.position = new_Position;
  //   } else if (new_Position < 0) {
  //     slider.positionOneStep = value;
  //     slider.position = 0;
  //   } else if (new_Position > slider.max) {
  //     slider.positionOneStep = value;
  //     slider.position = slider.max;
  //   }
  //   this.$sliders.set(slider.id, slider);
  // }

  get selectedKnowbookIdName() {
    return this.$selectedKnowbookIdName;
  }
  setSelectedKnowbookIdName(knowbookId: KnowbookID): void {
    this.$selectedKnowbookIdName = knowbookId;
  }

  get selectedAtom() {
    return this.$selectedAtom;
  }
  setSelectedAtom(id: AtomID, title: string): void {
    this.$selectedAtom.id = id;
    this.$selectedAtom.title = title;
  }

  get editKnowbookMembers() {
    return this.$editKnowbookMembers;
  }
  setEditKnowbookMembers(knowbookId: KnowbookID, value: boolean): void {
    this.editKnowbookMembers.set(knowbookId, value);
  }
  // clearEditKnowbookMembers(): void {
  //   this.editKnowbookMembers.clear();
  // }
}
