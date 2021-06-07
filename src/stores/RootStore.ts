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
    baseStore: new BaseStore(),
    savedStore: new SavedStore(),
    uiStore: new UIStore(),
    graphStore: new GraphStore(),
    knowbookStore: new KnowkookStore(),
  };

  public stores(): IStores {
    return this.$stores;
  }
}

const rootStore: RootStore = new RootStore();

export default rootStore;
