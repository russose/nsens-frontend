import React from "react";
import { IStores, RootStore } from "./RootStore";

type Maybe<T> = T | null;

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
