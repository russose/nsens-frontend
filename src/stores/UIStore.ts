import { observable, action, makeObservable } from "mobx";
import { AtomID, IparamsAtom, KnowbookID } from "../config/globals";
import { RootStore } from "./RootStore";

export class UIStore {
  $rootStore: RootStore;
  private $searchPattern: string = "";
  private $selectedAtom: IparamsAtom = { id: "", title: "" };
  private $articleContent: string = "";

  private $editKnowbookOpened: boolean = false;
  private $editKnowbookNewValue: string = "";
  private $editKnowbookMembers = observable.map<KnowbookID, boolean>();

  private $selectedKnowbookIdName: KnowbookID = "";
  private $renameKnowbookOpened: boolean = false;
  private $renameKnowbookNewName: string = "";

  private $loginScreenUsername: string = "";
  private $loginScreenUsername_: string = "";
  private $loginScreenPassword: string = "";
  private $loginScreenError: string = "";

  private $changePasswordUsername: string = "";
  private $changePasswordPassword: string = "";
  private $changePasswordValidationCode: string = "";
  private $changePasswordError: string = "";

  private $showLoading: boolean = false;

  constructor(rootStore: RootStore) {
    this.$rootStore = rootStore;
    makeObservable<
      UIStore,
      | "$searchPattern"
      | "$selectedAtom"
      | "$articleContent"
      | "$editKnowbookOpened"
      | "$editKnowbookNewValue"
      | "$selectedKnowbookIdName"
      | "$renameKnowbookOpened"
      | "$renameKnowbookNewName"
      | "$loginScreenUsername"
      | "$loginScreenUsername_"
      | "$loginScreenPassword"
      | "$loginScreenError"
      | "$changePasswordUsername"
      | "$changePasswordPassword"
      | "$changePasswordValidationCode"
      | "$changePasswordError"
      | "$showLoading"
    >(this, {
      $searchPattern: observable,
      $selectedAtom: observable,
      $articleContent: observable,
      $editKnowbookOpened: observable,
      $editKnowbookNewValue: observable,
      $loginScreenUsername: observable,
      $loginScreenUsername_: observable,
      $loginScreenPassword: observable,
      $loginScreenError: observable,
      $changePasswordUsername: observable,
      $changePasswordPassword: observable,
      $changePasswordValidationCode: observable,
      $changePasswordError: observable,
      $selectedKnowbookIdName: observable,
      $renameKnowbookOpened: observable,
      $renameKnowbookNewName: observable,
      $showLoading: observable,
      setSearchPattern: action,
      setSelectedAtom: action,
      setArticleContent: action,
      setEditKnowbookOpened: action,
      setEditKnowbookNewValue: action,
      setEditKnowbookMembers: action,
      clearEditKnowbookMembers: action,
      setSelectedKnowbookIdName: action,
      setRenameKnowbookOpened: action,
      setRenameKnowbookNewName: action,
      setLoginScreenUsername: action,
      setLoginScreenUsername_: action,
      setLoginScreenPassword: action,
      setLoginScreenError: action,
      setChangePasswordUsername: action,
      setChangePasswordPassword: action,
      setChangePasswordValidationCode: action,
      setChangePasswordError: action,
      setShowLoading: action,
    });
  }

  get selectedKnowbookIdName() {
    return this.$selectedKnowbookIdName;
  }
  setSelectedKnowbookIdName(knowbookId: KnowbookID): void {
    this.$selectedKnowbookIdName = knowbookId;
  }

  get renameKnowbookOpened() {
    return this.$renameKnowbookOpened;
  }
  setRenameKnowbookOpened(state: boolean): void {
    this.$renameKnowbookOpened = state;
  }

  get renameKnowbookNewName() {
    return this.$renameKnowbookNewName;
  }
  setRenameKnowbookNewName(value: string): void {
    this.$renameKnowbookNewName = value;
  }

  get searchPattern() {
    return this.$searchPattern;
  }
  setSearchPattern(searchPattern: string): void {
    this.$searchPattern = searchPattern;
  }

  get selectedAtom() {
    return this.$selectedAtom;
  }
  setSelectedAtom(id: AtomID, title: string): void {
    this.$selectedAtom.id = id;
    this.$selectedAtom.title = title;
  }

  get articleContent() {
    return this.$articleContent;
  }
  setArticleContent(article: string): void {
    this.$articleContent = article;
  }

  get editKnowbookOpened() {
    return this.$editKnowbookOpened;
  }
  setEditKnowbookOpened(state: boolean): void {
    this.$editKnowbookOpened = state;
  }

  get editKnowbookNewValue() {
    return this.$editKnowbookNewValue;
  }
  setEditKnowbookNewValue(value: string): void {
    this.$editKnowbookNewValue = value;
  }

  get editKnowbookMembers() {
    return this.$editKnowbookMembers;
  }
  setEditKnowbookMembers(knowbookId: KnowbookID, value: boolean): void {
    this.editKnowbookMembers.set(knowbookId, value);
  }
  clearEditKnowbookMembers(): void {
    this.editKnowbookMembers.clear();
  }

  get changePasswordUsername() {
    return this.$changePasswordUsername;
  }
  setChangePasswordUsername(value: string): void {
    this.$changePasswordUsername = value;
  }
  get changePasswordPassword() {
    return this.$changePasswordPassword;
  }
  setChangePasswordPassword(value: string): void {
    this.$changePasswordPassword = value;
  }
  get changePasswordValidationCode() {
    return this.$changePasswordValidationCode;
  }
  setChangePasswordValidationCode(value: string): void {
    this.$changePasswordValidationCode = value;
  }
  get changePasswordError() {
    return this.$changePasswordError;
  }
  setChangePasswordError(value: string): void {
    this.$changePasswordError = value;
  }

  get loginScreenUsername() {
    return this.$loginScreenUsername;
  }
  setLoginScreenUsername(value: string): void {
    this.$loginScreenUsername = value;
  }
  get loginScreenUsername_() {
    return this.$loginScreenUsername_;
  }
  setLoginScreenUsername_(value: string): void {
    this.$loginScreenUsername_ = value;
  }
  get loginScreenPassword() {
    return this.$loginScreenPassword;
  }
  setLoginScreenPassword(value: string): void {
    this.$loginScreenPassword = value;
  }
  get loginScreenError() {
    return this.$loginScreenError;
  }
  setLoginScreenError(value: string): void {
    this.$loginScreenError = value;
  }

  get showLoading() {
    return this.$showLoading;
  }
  setShowLoading(show: boolean): void {
    this.$showLoading = show;
  }
}
