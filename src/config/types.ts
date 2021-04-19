import type { GUI_CONFIG } from "./configGUI";
import type { configDataMobile } from "./configDataMobile";

export enum ConfigLanguage {
  fr = "fr",
  en = "en",
}

export enum ConfigDisplay {
  // small = "Small",
  mobile = "Mobile",
  desktop = "Desktop",
  large = "Large",
}

export interface IparamsPage {
  lang: ConfigLanguage;
  display: ConfigDisplay;
}

export interface IparamsAtom {
  id: AtomID;
  title: string;
}

export enum ButtonIDType {
  HOME = "HOME",
  KNOWBOOKS = "KNOWBOOKS",
  LOGIN = "LOGIN",
  INFO = "INFO",
  SAVE = "SAVE",
  EDIT = "EDIT",
  VIZS = "VIZS",
  ARTICLE = "ARTICLE",
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
  language: string;
  image_url: string;
  image_width: number;
  image_height: number;
  thumbnail_url: string;
  related: string;
}

export interface IKnowbook {
  id: number;
  name: KnowbookID;
  //creation_date: Date;
  //update_date: Date;
  items: AtomID[];
}

export interface IKnowbookFull {
  id: number; //internal ide for back only (database)
  name: KnowbookID;
  items: IAtom[];
}

export interface IRelatedAtom {
  relation: string;
  item: IAtom;
}

export enum LogActionType {
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

export interface INode extends IAtom {
  x: number;
  y: number;
  relation_name: string;
  pos: number;
}

export interface ILink {
  source: INode;
  target: INode;
}

export interface IFeature {
  title: string;
  description: string;
  // image_url: string;
  icon: IconT;
}

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

export type configDataDisplay = typeof configDataMobile;

export type GUI_CONFIG_T = typeof GUI_CONFIG;
