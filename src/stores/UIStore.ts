import { observable, action, computed } from "mobx";
import { AtomID, KnowbookID } from "../srcCommon/types";
import { DataStore } from "./DataStore";

export class UIStore {
  @observable private $searchPattern: string = "";
  private $selectedAtomId: AtomID = "";
  @observable private $articleContent: string = "";

  @observable private $editKnowbookOpened: boolean = false;
  @observable private $editKnowbookNewValue: string = "";
  private $editKnowbookMembers = observable.map<KnowbookID, boolean>();

  @observable private $loginScreenUsername: string = "";
  @observable private $loginScreenPassword: string = "";

  @computed
  get searchPattern() {
    return this.$searchPattern;
  }
  @action
  setSearchPattern(searchPattern: string): void {
    this.$searchPattern = searchPattern;
  }
  @computed
  get selectedAtomId() {
    return this.$selectedAtomId;
  }
  @action
  setSelectedAtomId(id: AtomID): void {
    this.$selectedAtomId = id;
  }
  @computed
  get articleContent() {
    return this.$articleContent;
  }
  @action
  setArticleContent(article: string): void {
    this.$articleContent = article;
  }
  @computed
  get editKnowbookOpened() {
    return this.$editKnowbookOpened;
  }
  @action
  setEditKnowbookOpened(state: boolean): void {
    this.$editKnowbookOpened = state;
  }
  @computed
  get editKnowbookNewValue() {
    return this.$editKnowbookNewValue;
  }
  @action
  setEditKnowbookNewValue(value: string): void {
    this.$editKnowbookNewValue = value;
  }
  @computed
  get editKnowbookMembers() {
    return this.$editKnowbookMembers;
  }
  @action
  setEditKnowbookMembers(knowbookId: KnowbookID, value: boolean): void {
    this.editKnowbookMembers.set(knowbookId, value);
  }

  @computed
  get loginScreenUsername() {
    return this.$loginScreenUsername;
  }
  @action
  setLoginScreenUsername(value: string): void {
    this.$loginScreenUsername = value;
  }
  @computed
  get loginScreenPassword() {
    return this.$loginScreenPassword;
  }
  @action
  setLoginScreenPassword(value: string): void {
    this.$loginScreenPassword = value;
  }

  /******************************************************* */
  @action
  initKnowbookEditionElements(atomID: AtomID, datastore: DataStore): void {
    this.$editKnowbookNewValue = "";
    this.editKnowbookMembers.clear();

    const knowbook_id_list = Array.from(datastore.knowbooks.keys());
    knowbook_id_list.forEach((knowbookId) => {
      this.editKnowbookMembers.set(
        knowbookId,
        datastore.isItemInKnowbook(atomID, knowbookId)
      );
    });
  }

  // @computed
  // get spinnerState() {
  //   return this.$spinnerState;
  // }

  // @action
  // setSpinnerState(state: boolean): void {
  //   this.$spinnerState = state;
  // }
}
