import { IStores } from "../stores/RootStore";
import type { configDataFr } from "./configDataFr";
import type { configDataMobile } from "./configDataMobile";

export interface IPosition {
  x: number;
  y: number;
}

export enum Tlanguage {
  fr = "fr",
  it = "it",
  en = "en",
}

export enum TDisplay {
  mobile = "Mobile",
  desktop = "Desktop",
  large = "Large",
  extra = "Extra",
}

export enum TPages {
  Home = "Home",
  Search = "Search",
  About = "About",
  User = "User",
  ChangePassword = "ChangePassword",

  // ItemArticle = "ItemArticle",
  ItemNetwork = "ItemNetwork",
  Item = "Item",

  StaticKnowbook = "StaticKnowbook",

  Knowbook = "Knowbook",
  KnowbookSpecial = "KnowbookSpecial",
  // KnowbookSaved = "KnowbookSaved",
  // KnowbookNone = "KnowbookNone",

  // KnowbookMostviewed = "KnowbookMostviewed",
}

export enum TPageHeaderModes {
  homeFeaturedKnowbooks = "homeFeaturedKnowbooks",
  homeUserKnowbooks = "homeUserKnowbooks",
  itemAllRelated = "itemAllRelated",
  none = "none",
}

export enum TSpecialPages {
  Mostviewed = "Mostviewed",
  AllSaved = "AllSaved",
  NoKnowbook = "NoKnowbook",
}

export enum initStateCat {
  core = "core",
  // display = "display",
  staticKnowbooksFull = "staticKnowbooksFull",
  userData = "userData",
  Item = "Item",
}

export enum TUiStringStorage {
  searchPattern = "searchPattern",
  articleContent = "articleContent",
  editKnowbookNewValue = "editKnowbookNewValue",
  renameKnowbookNewName = "renameKnowbookNewName",
  loginScreenUsername = "loginScreenUsername",
  loginScreenUsername_ = "loginScreenUsername_",
  loginScreenPassword = "loginScreenPassword",

  loginScreenError = "loginScreenError",
  changePasswordUsername = "changePasswordUsername",
  changePasswordPassword = "changePasswordPassword",
  changePasswordValidationCode = "changePasswordValidationCode",
  changePasswordError = "changePasswordError",
  dropdownselection = "dropdownselection",
}

export enum TUiBooleanStorage {
  editKnowbookOpened = "editKnowbookOpened",
  renameKnowbookOpened = "renameKnowbookOpened",
  showLoading = "showLoading",
  showArticle = "showArticle",
}

export enum TUiNumberStorage {
  R0 = "R0",
  SVGMaxElementCircle = "SVGMaxElementCircle",
}

export type TconfigDataDisplay = typeof configDataMobile;

export type TconfigDataLanguage = typeof configDataFr;

export interface IDate {
  year: number;
  month: number;
  day: number;
}

export interface IGUICONFIG {
  // id: string;
  language: TconfigDataLanguage;
  display: TconfigDataDisplay;

  // currentDisplay: TDisplay;
  // currentLanguage: string; //already covered by IparamsPage.lang
}

export interface IparamsPage {
  lang: Tlanguage;
  // display: ConfigDisplay;
}

export interface IparamsAtom {
  id: AtomID;
  title: string;
}

export interface ICardKnowProps {
  id: AtomID | KnowbookID;
  stores: IStores;
  title: string;
  image_url: string;
  pathname: string;
  queryObject: any;
  amount: number | string;
  edit_handler: handlerT;
  delete_handler: handlerT;
}

export interface IPageSVG {
  mode: TPageHeaderModes;
  header: SVG_T;
  body: SVG_T;
}

export enum TButtonID {
  HOME = "HOME",
  // KNOWBOOKS_USER = "KNOWBOOKS_USER",
  // KNOWBOOKS_FEATURED = "KNOWBOOKS_FEATURED",

  LOGIN = "LOGIN",
  INFO = "INFO",
  SAVE = "SAVE",
  EDIT = "EDIT",
  VIZS = "VIZS",
  ARTICLE = "ARTICLE",

  SEPARATOR = "SEPARATOR",
}

export interface IButton {
  Id: TButtonID;
  iconColor?: IconT; //handler
  disabled?: boolean;
  hidden?: boolean;
  onClick?: handlerT; //handler
}

export type UserID = string;
export type AtomID = string;
export type KnowbookID = string;

export interface IUser {
  //id: UserID;
  username: UserID;
  //language: ConfigDataLanguage;
}

export interface IAtom {
  id: AtomID;
  wikibase_item: string;
  pageid_wp: number;
  title: string;
  title_en: string;
  language: Tlanguage;
  image_url: string;
  image_width: number;
  image_height: number;
  thumbnail_url: string;
  related: string;
}

export interface IKnowbook {
  id: number;
  name: KnowbookID;
  language: Tlanguage;
  //creation_date: Date;
  //update_date: Date;
  items: AtomID[];
}

export interface IKnowbookFull {
  id: number; //internal ide for back only (database)
  name: KnowbookID;
  language: Tlanguage;
  items: IAtom[];
}

export interface IKnowbookStatic extends IKnowbookFull {
  type: StaticKnowbookFamilyType;
  name_display: string;
}

export enum StaticKnowbookFamilyType {
  FEATURED = "FEATURED",
  TREND = "TREND",
  VITAL = "VITAL",
}

export interface IStaticKnowbookDefinition {
  type: StaticKnowbookFamilyType;
  nameOrPeriod: string;
  name_display?: string;
  lang?: Tlanguage;
  items?: AtomID[];
}

export interface IStaticKnowbookWithItemsDefinition {
  type: StaticKnowbookFamilyType;
  nameOrPeriod: string;
  name_display: string;
  lang: Tlanguage;
  items: IAtom[];
}

export interface IRelatedAtom {
  relation: string;
  item: AtomID;
}

export interface IRelatedAtomFull {
  relation: string;
  item: IAtom;
}

export enum TLogAction {
  search = "search",
  save = "save",
  archive = "archive",
  addRenameKnowbook = "addRenameKnowbook",
  addKnowbookItem = "addKnowbookItem",
  removeKnowbookItem = "removeKnowbookItem",
  removeKnowbook = "removeKnowbook",
  createUser = "createUser",
  loginUser = "loginUser",
}

export interface IFeature {
  title: string;
  description: string;
  icon: IconT;
}

export interface ISlider {
  id: string;
  position: number;
  max: number;
  positionOneStep: number;
  maxOneStep: number;
}

// export enum SVGComponentType {
//   item = "item",
//   knowbook = "knowbook",
// }

// export interface SVGComponentT {
//   id: string;
//   type: SVGComponentType;
//   svg: SVG_T;
// }

export interface INode {
  x: number;
  y: number;
  relation_name: string;
  pos: number;
  item: AtomID;
}

export interface ILink {
  source: INode;
  target: INode;
}

export interface IGraph {
  nodes: INode[];
  links: ILink[];
}

export type SVG_T = any;

export type IconT = any;
export type ColorT = any;
export type SizeT = any;
export type RoundingT = any;
export type DirectionT = any;
export type PaddingT = any;
export type handlerT = any;
export type eventT = any;

export type reactComponentT = any;

export type JSONDataT = any;
