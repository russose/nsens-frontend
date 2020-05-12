export enum ConfigDataLanguage {
  fr = "fr",
  en = "en",
}

export enum ConfigDataCategoryType {
  PLT = "PLT",
  ECO = "ECO",
  INO = "INO",
  POL = "POL",
  HUM = "HUM",
  TBD = "TBD",
}

export interface IDataCategory {
  label: string;
  color: string;
}

export interface IConfigMenuBar {
  label: string;
  icon: string;
}

export interface IConfigCategories {
  [ConfigDataCategoryType.PLT]: IDataCategory;
  [ConfigDataCategoryType.ECO]: IDataCategory;
  [ConfigDataCategoryType.INO]: IDataCategory;
  [ConfigDataCategoryType.POL]: IDataCategory;
  [ConfigDataCategoryType.HUM]: IDataCategory;
  [ConfigDataCategoryType.TBD]: IDataCategory;
}

export interface IConfigData {
  searchBar: string;
  knowbooks_title: string;
  empty_tag: string;
  all_tags: string;
  menuBar: IConfigMenuBar[];
  categories: IConfigCategories;
}

// export interface IMobileDisplayDataData {
//   card_dim: number;
//   size_icon: string;
//   padding_grid: any;
//   title_card_size: string;
//   header_size: string;
// }

export interface IConfig {
  [ConfigDataLanguage.fr]: IConfigData;
  [ConfigDataLanguage.en]: IConfigData;
  //mobile_display: IMobileDisplayDataData;
}

/*************************************************** */

export type AtomID = string;
export type KnowbookID = string;
export type UserID = number;

export interface IIdentity {
  id: UserID;
  username: string;
  language: ConfigDataLanguage;
  creation_date: number;
}

export interface IKnowbook {
  id: KnowbookID;
  name: KnowbookID;
  content_atoms: IAtom[];
  //content_knowbooks: string[];
}

export interface IAtom {
  id: AtomID;
  tags: KnowbookID[];
  save_date: number;
  wikibase_item: string;
  pageid_wp: number;
  title: string;
  title_en: string;
  image_url: string;
  image_width: number;
  image_height: number;
  thumbnail_url: string;
  category: ConfigDataCategoryType;
}

export interface IUserData {
  identity: IIdentity;
  saved: IAtom[];
  history: IAtom[];
}

export const empty_value_atom = "";
export function newAtom(id: AtomID): IAtom {
  const atom = {
    id: id,
    tags: [],
    save_date: -1,
    wikibase_item: empty_value_atom,
    pageid_wp: -1,
    title: empty_value_atom,
    title_en: empty_value_atom,
    image_url: empty_value_atom,
    image_width: -1,
    image_height: -1,
    thumbnail_url: empty_value_atom,
    category: ConfigDataCategoryType.TBD,
  };
  return atom;
}
