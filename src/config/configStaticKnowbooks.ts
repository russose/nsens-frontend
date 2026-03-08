import { KnowbookName, Tlanguage } from "./globals";

export interface IPublicKnowbookDefinition {
  name: KnowbookName;
  language: Tlanguage;
  items_name: string[];
}

export const PLATFORM_OWNER_USERNAME = "-";

export const TREND_KEYWORD = "Top ";

export const trendKnowbooksDefinitions: IPublicKnowbookDefinition[] = [
  {
    name: TREND_KEYWORD + "2016-2023",
    language: null,
    items_name: [],
  },
];
