import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import dynamic from "next/dist/shared/lib/dynamic";
import React from "react";
import { IStores } from "../stores/RootStore";
import MenuBarItem_NotLogged from "./MenuBarItem_NotLogged";

const MenuBarItem_Logged_D = dynamic(() => import("./MenuBarItem_Logged"));

interface IProps {
  stores: IStores;
  titleComponent: any;
}

const MenuBarItem: React.FunctionComponent<IProps> = (props) => {
  const rounding = props.stores.baseStore.GUI_CONFIG.display.rounding_menu;
  const isLogged = props.stores.baseStore.isLogged;

  // const source_wikipedia =
  //   props.stores.baseStore.GUI_CONFIG.language.source_wikipedia;

  // const Text = (
  //   <Box paddingY={0} paddingX={1}>
  //     <Link
  //       href={
  //         ROOT_URL_WIKIPEDIA(props.stores.baseStore.paramsPage.lang) +
  //         item_title
  //       }
  //       target="blank"
  //     >
  //       <Text size="100" weight="bold">
  //         {source_wikipedia}
  //       </Text>
  //     </Link>
  //   </Box>
  // );

  const menu = (
    <Box width="100%" paddingX={2}>
      <Box
        display="flex"
        direction="row"
        justifyContent="between"
        alignItems="center"
      >
        {props.titleComponent}
        <Box column={7} smColumn={7} mdColumn={4} lgColumn={3}>
          {!isLogged ? (
            <MenuBarItem_NotLogged
              stores={props.stores}
              rounding={rounding}
              specific_buttons={[]}
            />
          ) : (
            <MenuBarItem_Logged_D stores={props.stores} rounding={rounding} />
          )}
        </Box>
      </Box>
    </Box>
  );

  return menu;
};

export default observer(MenuBarItem);
