import type { configDataFr } from "./configDataFr";
import type { configDataMobile } from "./configDataMobile";

export enum ConfigLanguage {
  fr = "fr",
  it = "it",
  en = "en",
}

export enum ConfigDisplay {
  mobile = "Mobile",
  desktop = "Desktop",
  large = "Large",
  extra = "Extra",
}

export enum initStateCat {
  core = "core",
  // display = "display",
  // staticKnowbooks = "staticKnowbooks",
  userData = "userData",
}

export type configDataDisplay = typeof configDataMobile;

export type configDataLanguage = typeof configDataFr;

export interface IDate {
  year: number;
  month: number;
  day: number;
}

export interface IGUICONFIG {
  // id: string;
  language: configDataLanguage;
  display: configDataDisplay;

  currentDisplay: ConfigDisplay;
  // currentLanguage: string; //already covered by IparamsPage.lang
}

export interface IparamsPage {
  lang: ConfigLanguage;
  // display: ConfigDisplay;
}

export interface IparamsAtom {
  id: AtomID;
  title: string;
}

export enum ButtonIDType {
  HOME = "HOME",
  KNOWBOOKS_USER = "KNOWBOOKS_USER",
  KNOWBOOKS_FEATURED = "KNOWBOOKS_FEATURED",

  LOGIN = "LOGIN",
  INFO = "INFO",
  SAVE = "SAVE",
  EDIT = "EDIT",
  VIZS = "VIZS",
  ARTICLE = "ARTICLE",

  SEPARATOR = "SEPARATOR",
}

export interface IButton {
  Id: ButtonIDType;
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
  language: ConfigLanguage;
  image_url: string;
  image_width: number;
  image_height: number;
  thumbnail_url: string;
  related: string;
}

export interface IKnowbook {
  id: number;
  name: KnowbookID;
  language: ConfigLanguage;
  //creation_date: Date;
  //update_date: Date;
  items: AtomID[];
}

export interface IKnowbookFull {
  id: number; //internal ide for back only (database)
  name: KnowbookID;
  language: ConfigLanguage;
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
  lang?: ConfigLanguage;
  items?: AtomID[];
}

export interface IRelatedAtom {
  relation: string;
  item: AtomID;
}

export interface IRelatedAtomFull {
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

export interface IFeature {
  title: string;
  description: string;
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
