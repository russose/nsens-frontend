import { KnowkookStore } from "./KnowkookStore";
import { UserStore } from "./UserStore";
import { DataStore } from "./DataStore";
import { UIStore } from "./UIStore";
import { GraphStore } from "./GraphStore";

//RootStore

export interface IStores {
  uiStore: UIStore;
  dataStore: DataStore;
  graphStore: GraphStore;
  userStore: UserStore;
  knowbookStore: KnowkookStore;
}

export class RootStore {
  private $stores: IStores = {
    dataStore: new DataStore(),
    uiStore: new UIStore(),
    graphStore: new GraphStore(),
    userStore: new UserStore(),
    knowbookStore: new KnowkookStore(),
  };

  public stores(): IStores {
    return this.$stores;
  }

  // public getDataStore(): DataStore {
  //   return this.$stores.dataStore;
  // }
}

const rootStore: RootStore = new RootStore();

export default rootStore;
