import { IStores } from "../stores/RootStore";
import type { configDataFr } from "./configDataFr";
import type { configDataMobile } from "./configDataMobile";

export interface IPosition {
  x: number;
  y: number;
}

// export interface IStar {
//   position: IPosition;
//   opacity: number;
// }

export enum Tlanguage {
  fr = "fr",
  it = "it",
  en = "en",
}

export enum TDisplay {
  mobile = "mobile",
  desktop = "desktop",
  // large = "Large",
  // extra = "Extra",
}

export interface IScreen {
  name: TDisplay;
  width: number;
  height: number;
}

export const SCREENSHOTS_LIST = {
  desktop: {
    name: TDisplay.desktop,
    width: 1440, //1024,
    height: 900, //768,
  },
  mobile: {
    name: TDisplay.mobile,
    width: 360,
    height: 640,
  },
};

export interface IScenarioStep {
  id: TScenarioStepID;
  url: string;
  text: string;
  additionnal_element?: any;
}

export enum TScenarioStepID {
  knowbook = "knowbook",
  knowbooks = "knowbooks",
  mostviewed = "mostviewed",
  search = "search",
  itemCircle = "itemCircle",
  itemNetwork = "itemNetwork",
  itemArticle = "itemArticle",
  language = "language",
  home = "home",
}

export enum TPages {
  Home = "Home",
  KnowbooksSaved = "KnowbooksSaved",
  KnowbooksMine = "KnowbooksMine",
  Search = "Search",
  // About = "About",
  User = "User",
  ChangePassword = "ChangePassword",
  ItemNetwork = "ItemNetwork",
  Knowbooks = "Knowbooks",
  Knowbook = "Knowbook",
  KnowbookSpecial = "KnowbookSpecial",
}

// export enum TPageHeaderModes {
//   // homeFeaturedKnowbooks = "homeFeaturedKnowbooks",
//   // homeUserKnowbooks = "homeUserKnowbooks",
//   itemAllRelated = "itemAllRelated",
//   none = "none",
// }

// export enum TKnowbooksPages {
//   Mostviewed = "Mostviewed",
//   AllSaved = "AllSaved",
//   NoKnowbook = "NoKnowbook",
// }

export enum TKnowbooksPages {
  publicKnowbooks = "publicKnowbooks",
  myKnowbooks = "myKnowbooks",
  staticKnowbooks = "staticKnowbooks",
  Mostviewed = "Mostviewed",
  AllSaved = "AllSaved",
  // NoKnowbook = "NoKnowbook",
}

export interface IKnowbookQuery {
  type: TKnowbooksPages;
  title: KnowbookName;
  // owner: number;
  id: KnowbookID;
}

// export enum TKnowbooksStores {
//   followedPublicKnowbooks = "followedPublicKnowbooks",
//   publicKnowbooks = "publicKnowbooks",
//   knowbooks = "knowbooks",
// }

export enum initStateCat {
  core = "core",
  // staticKnowbooksFull = "staticKnowbooksFull",
  userData = "userData",
  itemRelated = "itemRelated",
  staticKnowbooks = "staticKnowbooks",

  alreadyRendered = "alreadyRendered",
}

export enum TUiStringStorage {
  searchPattern = "searchPattern",
  articleContent = "articleContent",
  // editKnowbookNewValue = "editKnowbookNewValue",
  // renameKnowbookNewName = "renameKnowbookNewName",
  sharingInformation = "sharingInformation",
  loginScreenEmail = "loginScreenEmail",
  loginScreenUsername_ = "loginScreenUsername_",
  loginScreenPassword = "loginScreenPassword",

  loginScreenError = "loginScreenError",
  changePasswordEmail = "changePasswordEmail",
  changePasswordPassword = "changePasswordPassword",
  changePasswordValidationCode = "changePasswordValidationCode",
  changePasswordError = "changePasswordError",
  currentHomeTab = "currentHomeTab",
}

export enum TUiBooleanStorage {
  // renameKnowbookOpened = "renameKnowbookOpened",
  showLoading = "showLoading",
  showEditKnowbooks = "showEditKnowbooks",
  showWikiArticle = "showWikiArticle",

  showArxivCentent = "showArxivCentent",

  showBookCentent = "showBookCentent",
  showHistory = "showHistory",

  showSharing = "showSharing",

  showEditKnowbookProps = "showEditKnowbookProps",
  showEditUserProps = "showEditUserProps",
  renderGraphNetwork = "renderGraphNetwork",
}

export enum TUiNumberStorage {
  currentHomeTabIndex = "currentHomeTabIndex",
  currentSearchTabIndex = "currentSearchTabIndex",
  indexLastBestKnowbooks = "indexLastBestKnowbooks",
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
  id: string;
}

export interface IparamsPage {
  lang: Tlanguage;
  display: TDisplay;
}

export interface IparamsAtom {
  id: AtomID;
  title: string;
}

// export interface IPageSVG {
//   mode: TPageHeaderModes;
//   header: SVG_T;
//   body: SVG_T;
// }

export enum TButtonID {
  HOME = "HOME",
  LOGIN = "LOGIN",
  INFO = "INFO",
  FOLLOW_PUBLIC = "FOLLOW_PUBLIC",
  EDIT_CONTENT = "EDIT_CONTENT",
  NETWORK = "NETWORK",

  ARTICLE = "ARTICLE",
  BACK = "BACK",
  ARTICLE_BACK = "ARTICLE_BACK",
  ARTICLE_NEXT = "ARTICLE_NEXT",
  HISTORY = "HISTORY",
  DELETE = "DELETE",
  EDIT_KNOWBOOK = "EDIT_KNOWBOOK",
  LINK = "LINK",

  EDIT_USER = "EDIT_USER",

  LOGOUT = "LOGOUT",

  KNOWBOOKS_BEST = "KNOWBOOKS_BEST",

  KNOWBOOK_FOLLOWED = "KNOWBOOK_FOLLOWED",

  KNOWBOOK_MINE = "KNOWBOOK_MINE",

  SEARCH = "SEARCH",
}

export interface IButton {
  Id: TButtonID;
  onClick: handlerT; //handler
  iconColor?: IconT; //handler
  disabled?: boolean;
  hidden?: boolean;
  // tooltip?: string;
}

export type UserID = number;
export type AtomID = string;
export type KnowbookName = string;

export type KnowbookID = number;

export type NodeID = AtomID | KnowbookID;

// export interface IPublicKnowbookKey {
//   name: KnowbookID;
//   owner: number;
// }

export enum TSource {
  wiki = "wiki",
  arxiv = "arxiv",
  books = "books",
}

export enum TPrefixSource {
  // wiki = "wiki",
  arxiv = "arx_",
  books = "bks_",
}

export interface ISearchResults {
  [TSource.wiki]: AtomID[];
  [TSource.books]: AtomID[];
  [TSource.arxiv]: AtomID[];
  knowbooksIds: KnowbookID[];
}

export interface IUser {
  userId?: UserID;
  email: string;
  username: string;
  banned?: boolean;
  publicKnowbooks: string;
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
  // thumbnail_url: string;
  related: string;
  source: TSource;

  //Only Arxiv
  url: string;
  author: string;
  summary: string;
  attachment: string;
}

// export interface IAtom {
//   id: AtomID;
//   wikibase_item: string;
//   pageid_wp: number;
//   title: string;
//   title_en: string;
//   language: Tlanguage;
//   image_url: string;
//   image_width: number;
//   image_height: number;
//   thumbnail_url: string;
//   related: string;
// }

// export enum StaticKnowbookFamilyType {
//   FEATURED = "FEATURED",
//   TREND = "TREND",
//   VITAL = "VITAL",
// }

// export interface ICardKnowProps {
//   id: AtomID | KnowbookID;
//   stores: IStores;
//   title: string;
//   image_url: string;
//   image_handler: handlerT;
//   color_image?: string;
//   amount: number | string;
//   buttons: IButton[];

//   nb_saved: number;
//   public: boolean;
//   size_factor?: number;
// }

export interface ICardKnowProps {
  id: AtomID | KnowbookID;
  stores: IStores;
  knowbook: IKnowbook;
  // title: string;
  // image_url: string;
  image_handler: handlerT;
  color_image?: string;
  // amount: number | string;
  buttons: IButton[];
  // nb_saved: number;
  // public: boolean;
  size_factor?: number;
}

export interface IKnowbookProps {
  name?: KnowbookName;
  description?: string;
  sourceUrl?: string;
  public?: boolean;
  image_url?: string;
}

export interface IKnowbook {
  id: KnowbookID;
  name: KnowbookName;
  description: string;
  sourceUrl: string;
  owner: number;
  owner_username?: string;
  language: Tlanguage;
  public: boolean;
  image_url: string;
  // image_rank: number;
  items: AtomID[];
  nb_saved: number;
}

// export interface IKnowbookStatic {
//   type: StaticKnowbookFamilyType;
//   name: string;
//   name_display: string;
//   language: Tlanguage;
//   image_url?: string;
//   items?: AtomID[];
// }

export interface IKnowbookFull {
  id: KnowbookID;
  name: KnowbookName;
  description: string;
  sourceUrl: string;
  owner: number;
  owner_username?: string;
  language: Tlanguage;
  public: boolean;
  image_url: string;
  // image_rank: number;
  items: IAtom[];
  nb_saved: number;
}

// export interface IKnowbookFullStatic {
//   type: StaticKnowbookFamilyType;
//   name: string;
//   name_display: string;
//   language: Tlanguage;
//   image_url?: string;
//   items: IAtom[];
// }

// export interface IKnowbookStatic extends IKnowbookFull {
//   type: StaticKnowbookFamilyType;
//   name_display: string;
// }

export interface IRelatedAtom {
  relation: string;
  item: AtomID;
}

export interface IRelatedAtomFull {
  relation: string;
  item: IAtom;
}

// export interface ISlider {
//   id: string;
//   position: number;
//   max: number;
//   positionOneStep: number;
//   maxOneStep: number;
// }

export enum TRelationName {
  group = "group identifier for graph",
  hide_relation = "hide_relation",
}

export interface INode {
  // x?: number; //To be deleted when old viz removed
  // y?: number; //To be deleted when old viz removed
  relation_name: string;
  pos: number;
  // item: AtomID;
  id: string;
}

export interface ILink {
  source: INode;
  target: INode;
}

export interface IGraph {
  nodes: INode[];
  links: ILink[];
}

export enum TKnowbookUpdateAction {
  // wiki = "wiki",
  add = "add",
  delete = "delete",
}

export interface IKnowbookUpdate {
  KnowbookId: KnowbookID;
  KnowbookName: KnowbookName;
  itemId: AtomID;
  action: TKnowbookUpdateAction;
}

// export type SVG_T = any;
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

/** LOGS ****/

export enum TLogAction {
  search = "search",
  arxivDownload = "arxivDownload",
  arxivMoreInfo = "arxivMoreInfo",
  booksGoToAmazon = "booksGoToAmazon",
  error = "error",
  misc = "misc",
}

export interface ILog {
  action: TLogAction;
  details: string;
  anonymous?: boolean;
}
