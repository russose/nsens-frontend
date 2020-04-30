import data from "./data_fake.json";
import { IUser } from "../types";

export const usersLoaded = data.users as IUser[];

export const ROOT_URL_WIKIPEDIA = "https://fr.wikipedia.org/w/api.php";

export const ROOT_URL_WIKIPEDIA_EN = "https://en.wikipedia.org/w/api.php";

export const SEARCH_MIN_LENGTH_SEARCH = 4;
