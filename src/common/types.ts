import { GUI_CONFIG, LANGUAGE } from "./config";
import { displayMobile } from "./configMobile";

export enum ConfigLanguage {
  fr = "fr",
  en = "en",
}

export enum ConfigDisplay {
  small = "Small",
  mobile = "Mobile",
  desktop = "Desktop",
  large = "Large",
}

export enum ButtonIDType {
  HOME = "HOME",
  KNOWBOOKS = "KNOWBOOKS",
  LOGIN = "LOGIN",
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

export const empty_value_atom = "";
export function newAtom(id: AtomID): IAtom {
  const atom = {
    id: id,
    wikibase_item: empty_value_atom,
    pageid_wp: -1,
    title: empty_value_atom,
    title_en: empty_value_atom,
    language: LANGUAGE,
    image_url: empty_value_atom,
    image_width: -1,
    image_height: -1,
    thumbnail_url: empty_value_atom,
    related: empty_value_atom,
  };
  return atom;
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
  image_url: string;
  icon: IconT;
}

export type GUI_CONFIG_T = typeof GUI_CONFIG;
// export type GUI_CONFIG_T = any;
export type GUI_CONFIG_display_T = typeof displayMobile;

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
