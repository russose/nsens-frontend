import { BaseStore } from "./BaseStore";
import { GraphStore } from "./GraphStore";
import { KnowkookStore } from "./KnowkookStore";
import { SavedStore } from "./SavedStore";
import { UIStore } from "./UIStore";

//RootStore

export interface IStores {
  baseStore: BaseStore;
  uiStore: UIStore;
  savedStore: SavedStore;
  graphStore: GraphStore;
  knowbookStore: KnowkookStore;
}

export class RootStore {
  private $stores: IStores = {
    baseStore: new BaseStore(this),
    savedStore: new SavedStore(this),
    uiStore: new UIStore(this),
    graphStore: new GraphStore(this),
    knowbookStore: new KnowkookStore(this),
  };

  public stores(): IStores {
    return this.$stores;
  }
}

const rootStore: RootStore = new RootStore();

export default rootStore;
