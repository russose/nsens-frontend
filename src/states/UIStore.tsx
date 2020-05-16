import { observable, action, computed } from "mobx";
import { AtomID, KnowbookID, IKnowbook } from "../types";
import { ICheckboxes } from "../components/ModalTextInputCheckboxes";
import { DataStore } from "./DataStore";

// interface IEditionKnowbook {
//   newValue: string;
//   knwobooksInclusion: ICheckboxes[];
// }

export class UIStore {
  @observable private $searchPattern: string = "";
  private $selectedAtomId: AtomID = "";
  @observable private $editKnowbookOpened: boolean = false;
  @observable private $knowbookEditionNewTag: string = "";
  private $knowbookEditionInclusion = observable.map<KnowbookID, boolean>();
  // @observable private $knowbookEditionElements: IEditionKnowbook = {
  //   newValue: "",
  //   knwobooksInclusion: [],
  // };

  @computed
  get searchPattern() {
    return this.$searchPattern;
  }
  @computed
  get selectedAtomId() {
    return this.$selectedAtomId;
  }
  @computed
  get editKnowbookOpened() {
    return this.$editKnowbookOpened;
  }
  @computed
  get knowbookEditionNewTag() {
    return this.$knowbookEditionNewTag;
  }
  @computed
  get knowbookEditionInclusion() {
    return this.$knowbookEditionInclusion;
  }

  @action
  setSearchPattern(searchPattern: string): void {
    this.$searchPattern = searchPattern;
  }

  @action
  setSelectedAtomId(id: AtomID): void {
    this.$selectedAtomId = id;
  }

  @action
  setEditKnowbookOpened(state: boolean): void {
    this.$editKnowbookOpened = state;
  }

  @action
  initKnowbookEditionElements(atomID: AtomID, datastore: DataStore): void {
    this.$knowbookEditionNewTag = "";
    this.knowbookEditionInclusion.clear();

    const knowbook_id_list = Array.from(datastore.knowbooks.keys());
    knowbook_id_list.forEach((tag) => {
      this.knowbookEditionInclusion.set(
        tag,
        datastore.isAtomInKnowbook(atomID, tag)
      );
    });

    // //const atom = datastore.getAtom(atomID);
    // if (atom !== undefined) {
    //   const tags = atom.tags;
    //   tags.forEach((tag) => {
    //     this.knowbookEditionInclusion.set(
    //       tag,
    //       datastore.isAtomInKnowbook(atomID, tag)
    //     );
    //   });
    // } else {
    //   console.log("issue...");
    // }
  }

  @action
  UpdateNewTag(value: string): void {
    this.$knowbookEditionNewTag = value;
  }

  @action
  UpdateKnwobooksInclusion(knowbookId: KnowbookID, value: boolean): void {
    this.knowbookEditionInclusion.set(knowbookId, value);
  }

  /************************************************ */

  // get guiConfig(): IConfigData {
  //   return this.$guiConfig;
  // }

  // setGuiConfig(config: IConfigData): void {
  //   this.$guiConfig = config;
  // }

  // @computed
  // get selectedAtomId() {
  //   return this.$selectedAtomId;
  // }

  // @action
  // setselectedAtomId(id: number): void {
  //   this.$selectedAtomId = id;
  // }
}
