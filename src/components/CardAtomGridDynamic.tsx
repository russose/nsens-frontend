import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import React from "react";
import { IAtom } from "../config/globals";
import { IStores } from "../stores/RootStore";

const CardAtomGrid_Logged_D = dynamic(() => import("./CardAtomGrid_Logged"), {
  ssr: false,
});
const CardAtomGrid_NotLogged_D = dynamic(
  () => import("./CardAtomGrid_NotLogged"),
  {
    ssr: false,
  }
);
const CardAtomGrid_Logged_D_SSR = dynamic(
  () => import("./CardAtomGrid_Logged"),
  {
    ssr: true,
  }
);
const CardAtomGrid_NotLogged_D_SSR = dynamic(
  () => import("./CardAtomGrid_NotLogged"),
  {
    ssr: true,
  }
);

interface IProps {
  stores: IStores;
  id: string;
  atoms: IAtom[];
  SSR?: boolean;
}

const CardAtomGridDynamic: React.FunctionComponent<IProps> = (props) => {
  const with_ssr = props.SSR === undefined ? false : props.SSR;
  let content;
  if (!props.stores.baseStore.isLogged) {
    content = with_ssr ? (
      <>
        <CardAtomGrid_NotLogged_D_SSR
          id={props.id + "_NotLogged"}
          stores={props.stores}
          atoms={props.atoms}
        />
      </>
    ) : (
      <>
        <CardAtomGrid_NotLogged_D
          id={props.id + "_NotLogged"}
          stores={props.stores}
          atoms={props.atoms}
        />
      </>
    );
  } else {
    content = with_ssr ? (
      <>
        <CardAtomGrid_Logged_D_SSR
          id={props.id + "_Logged"}
          stores={props.stores}
          atoms={props.atoms}
        />
      </>
    ) : (
      <>
        <CardAtomGrid_Logged_D
          id={props.id + "_Logged"}
          stores={props.stores}
          atoms={props.atoms}
        />
      </>
    );
  }

  return content;
};

export default observer(CardAtomGridDynamic);
