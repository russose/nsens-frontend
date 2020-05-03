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

// export interface IUserAction {
//   id: AtomID;
//   date: number;
// }

export type AtomID = number;
export type UserID = number;

export interface IAtom {
  id: AtomID;
  saved: boolean; //VRAIMENT UTILE???
  tags: string[];
  save_date: number;
  wikibase_item: string;
  pageid_wp: AtomID;
  title: string;
  title_en: string;
  image: string;
  category: ConfigDataCategoryType;
}

export interface IUserData {
  id: UserID;
  username: string;
  language: ConfigDataLanguage;
  creation_date: number;
  //saved: IUserAction[];
  saved: IAtom[];
  atoms_cache: IAtom[];
}
