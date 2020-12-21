import { FeedStore } from "./FeedStore";
import { GraphStore } from "./GraphStore";
import { KnowkookStore } from "./KnowkookStore";
import { SavedStore } from "./SavedStore";
import { UIStore } from "./UIStore";
import { UserStore } from "./UserStore";

//RootStore

export interface IStores {
  uiStore: UIStore;
  savedStore: SavedStore;
  graphStore: GraphStore;
  userStore: UserStore;
  knowbookStore: KnowkookStore;
  feedStore: FeedStore;
}

export class RootStore {
  private $stores: IStores = {
    savedStore: new SavedStore(),
    uiStore: new UIStore(),
    graphStore: new GraphStore(),
    userStore: new UserStore(),
    knowbookStore: new KnowkookStore(),
    feedStore: new FeedStore(),
  };

  public stores(): IStores {
    return this.$stores;
  }

  // public getSavedStore(): SavedStore {
  //   return this.$stores.savedStore;
  // }
}

const rootStore: RootStore = new RootStore();

export default rootStore;
