import React from "react";
import { DataStore } from "./DataStore";
import { UIStore } from "./UIStore";

type Maybe<T> = T | null;

//RootStore

interface IStores {
  uiStore: UIStore;
  dataStore: DataStore;
}

export class RootStore {
  private $stores: IStores = {
    uiStore: new UIStore(),
    dataStore: new DataStore(),
  };

  public stores(): IStores {
    return this.$stores;
  }

  public getDataStore(): DataStore {
    return this.$stores.dataStore;
  }
}

//Context
interface IContextStores {
  rootStore: Maybe<RootStore>;
}

export const ContextStores = React.createContext<IContextStores>({
  rootStore: null,
});

//Hook
/**
 * Retrieve MobX stores from the context.
 */
export function useStores(): IStores & { rootStore: RootStore } {
  const value = React.useContext(ContextStores);

  if (!value.rootStore) {
    throw new Error(`Root store has not been found`);
  }

  const allStores = {
    ...value.rootStore.stores(),
    rootStore: value.rootStore,
  };

  return allStores;
}
