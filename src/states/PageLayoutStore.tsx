import { observable, action, computed } from "mobx";

import { IConfigData } from "../types.jsx";

import data_gui from "../data/data_gui.json";

export class PageLayoutStore {
  @observable private $searchPatternHome: string = "";
  @observable private $selectedAtomId: number = 0;

  private $guiConfig: IConfigData = data_gui.fr;

  get guiConfig(): IConfigData {
    return this.$guiConfig;
  }

  setGuiConfig(config: IConfigData): void {
    this.$guiConfig = config;
  }

  @computed
  get searchPatternHome() {
    return this.$searchPatternHome;
  }

  @action
  setsearchPatternHome(pattern: string): void {
    this.$searchPatternHome = pattern;
  }

  @computed
  get selectedAtomId() {
    return this.$selectedAtomId;
  }

  @action
  setselectedAtomId(id: number): void {
    this.$selectedAtomId = id;
  }

  // @observable private $pageDisplayed: string = "Home"; //"DavizFull";
  // @observable private $mobileDisplay: boolean = true;
  // @computed
  // get pageDisplayed(): string {
  //   return this.$pageDisplayed;
  // }

  // @computed
  // get mobileDisplay(): boolean {
  //   return this.$mobileDisplay;
  // }

  // @action
  // changePage(pagelayout: string): void {
  //   this.$pageDisplayed = pagelayout;
  // }
}
