import React from "react";
import { PageLayoutStore } from "./PageLayoutStore";
import { DataStore } from "./DataStore";

type Maybe<T> = T | null;

//RootStore

interface IStores {
  pageLayoutStore: PageLayoutStore;
  dataStore: DataStore;
}

export class RootStore {
  private $stores: IStores = {
    pageLayoutStore: new PageLayoutStore(),
    dataStore: new DataStore()
  };

  public stores(): IStores {
    return this.$stores;
  }
}

//Context
interface IContextStores {
  rootStore: Maybe<RootStore>;
}

export const ContextStores = React.createContext<IContextStores>({
  rootStore: null
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
    rootStore: value.rootStore
  };

  return allStores;
}
