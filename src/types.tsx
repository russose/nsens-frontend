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

export interface IConfigSearchBar {
  placeholder: string;
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
  searchBar: IConfigSearchBar;
  menuBar: IConfigMenuBar[];
  categories: IConfigCategories;
}

export interface IConfig {
  [ConfigDataLanguage.fr]: IConfigData;
  [ConfigDataLanguage.en]: IConfigData;
}

export type AtomID = string;
export type KnowbookID = number;
export type UserID = number;

export interface IIdentity {
  id: UserID;
  username: string;
  language: ConfigDataLanguage;
  creation_date: number;
}

export interface IKnowbook {
  id: KnowbookID;
  name: string;
  content_atoms: AtomID[];
  content_knowbooks: string[];
}

export interface IAtom {
  id: AtomID;
  saved: boolean; //VRAIMENT UTILE??? REdondant avec le groupe saved
  tags: string[];
  save_date: number;
  wikibase_item: string;
  pageid_wp: number;
  title: string;
  title_en: string;
  image_url: string;
  image_type: string; // A SUPPRIMER
  image_width: number;
  image_height: number;
  thumbnail_url: string;
  thumbnail_width: number; //A garder?
  category: ConfigDataCategoryType;
}

export interface IUserData {
  identity: IIdentity;
  saved: IAtom[];
  knowbooks: IKnowbook[];
  history: IAtom[];
}

export const empty_value_atom = "";
export function newAtom(id: AtomID): IAtom {
  const atom = {
    id: id,
    saved: false,
    tags: [],
    save_date: -1,
    wikibase_item: empty_value_atom,
    pageid_wp: -1,
    title: empty_value_atom,
    title_en: empty_value_atom,
    image_url: empty_value_atom,
    image_type: empty_value_atom,
    image_width: -1,
    image_height: -1,
    thumbnail_url: empty_value_atom,
    thumbnail_width: -1,
    category: ConfigDataCategoryType.TBD,
  };
  return atom;
}
