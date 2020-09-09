export enum ConfigDataLanguage {
  fr = "fr",
  en = "en",
}

// export enum ConfigDataCategoryType {
//   PLT = "PLT",
//   ECO = "ECO",
//   INO = "INO",
//   POL = "POL",
//   HUM = "HUM",
//   TBD = "TBD",
// }

// export interface IDataCategory {
//   label: string;
//   color: string;
// }

export interface IConfigMenuBar {
  label: string;
  icon: string;
}

// export interface IConfigCategories {
//   [ConfigDataCategoryType.PLT]: IDataCategory;
//   [ConfigDataCategoryType.ECO]: IDataCategory;
//   [ConfigDataCategoryType.INO]: IDataCategory;
//   [ConfigDataCategoryType.POL]: IDataCategory;
//   [ConfigDataCategoryType.HUM]: IDataCategory;
//   [ConfigDataCategoryType.TBD]: IDataCategory;
// }

// export interface IConfigData {
//   searchBar: string;
//   knowbooks_title: string;
//   empty_tag: string;
//   all_tags: string;
//   menuBar: IConfigMenuBar[];
//   categories: IConfigCategories;
// }

// export interface IConfig {
//   [ConfigDataLanguage.fr]: IConfigData;
//   [ConfigDataLanguage.en]: IConfigData;
// }

/*************************************************** */

export type UserID = string;
export type AtomID = string;
export type KnowbookID = string;

export interface IUser {
  //id: UserID;
  username: UserID;
  //language: ConfigDataLanguage;
}

export interface IAtom {
  //owner: UserID;
  id: AtomID;
  //tags: KnowbookID[];
  wikibase_item: string;
  pageid_wp: number;
  title: string;
  title_en: string;
  image_url: string;
  image_width: number;
  image_height: number;
  thumbnail_url: string;
  // category: ConfigDataCategoryType; //Not used yet
}

// export interface _IAtom {
//   owner: UserID;
//   active?: boolean;
//   id: AtomID;
//   //tags: KnowbookID[];
//   wikibase_item: string;
//   pageid_wp: number;
//   title: string;
//   title_en: string;
//   image_url: string;
//   image_width: number;
//   image_height: number;
//   thumbnail_url: string;
//   // category: ConfigDataCategoryType; //Not used yet
// }

export interface IKnowbook {
  name: KnowbookID;
  //creation_date: Date;
  //update_date: Date;
  items: AtomID[];
}

export interface IKnowbookFull {
  name: KnowbookID;
  //creation_date: Date;
  //update_date: Date;
  items: IAtom[];
}

// export interface IUserData {
//   user: IUser;
//   feed: IAtom[];
//   saved: IAtom[];
//   knowbooks: IKnowbook[];
// }

export const empty_value_atom = "";
export function newAtom(id: AtomID): IAtom {
  const atom = {
    //owner: owner,
    id: id,
    //tags: [],
    // IsSaved: false, //A SUPPRIMER
    wikibase_item: empty_value_atom,
    pageid_wp: -1,
    title: empty_value_atom,
    title_en: empty_value_atom,
    image_url: empty_value_atom,
    image_width: -1,
    image_height: -1,
    thumbnail_url: empty_value_atom,
    // category: ConfigDataCategoryType.TBD,
  };
  return atom;
}

export enum LogActionType {
  search = "search",
  save = "save",
  archive = "archive",
  addKnowbook = "addKnowbook",
  addKnowbookItem = "addKnowbookItem",
  removeKnowbookItem = "removeKnowbookItem",
  removeKnowbook = "removeKnowbook",
  createUser = "createUser",
  loginUser = "loginUser",
}
