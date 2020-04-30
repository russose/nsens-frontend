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

export interface IUserAction {
  id: AtomID;
  date: number;
}

export type AtomID = number;
export type UserID = number;

export interface IAtom {
  id: number;
  wikibase_item: string;
  pageid_wp: AtomID;
  author_id: UserID;
  language: ConfigDataLanguage;
  title: string;
  title_en: string;
  image: string;
  creation_date: number;
  category: ConfigDataCategoryType;
}

export interface IUser {
  id: UserID;
  name: string;
  language: ConfigDataLanguage;
  creation_date: number;
  liked: IUserAction[];
  saved: IUserAction[];
  atoms_cache: IAtom[];
}
