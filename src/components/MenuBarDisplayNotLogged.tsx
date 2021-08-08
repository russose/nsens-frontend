import { observer } from "mobx-react";
import React from "react";
import { ButtonIDType, configPaths, IButton } from "../config/globals";
import { IStores } from "../stores/RootStore";
import MenuBarButtonLayout from "./layout/MenuBarButtonLayout";
import { configGeneral } from "../config/globals";
import { empty_handler } from "../libs/utils";
import { goUserHandler, isMobile } from "../libs/helpersBase";
import { useRouter } from "next/router";

interface IMenuBarDisplayProps {
  stores: IStores;

  buttons?: IButton[];
  // isMobile: boolean;
}

const MenuBarDisplay: React.FunctionComponent<IMenuBarDisplayProps> = (
  props
) => {
  const router = useRouter();

  const color_menu = configGeneral.colors.menu;
  const rounding = props.stores.baseStore.GUI_CONFIG.display.rounding_menu;

  const display: boolean =
    router.pathname.includes(configPaths.pages.ItemArticle) ||
    router.pathname.includes(configPaths.pages.ItemNetwork) ||
    router.pathname.includes(configPaths.pages.StaticArticles);

  // const display = true;

  const buttons: IButton[] = [
    {
      Id: ButtonIDType.ARTICLE,
      // hidden: router.pathname.includes(configPaths.pages.ItemArticle),
    },
    {
      Id: ButtonIDType.VIZS,
      // hidden: router.pathname.includes(configPaths.pages.ItemNetwork),
    },
    {
      Id: ButtonIDType.SAVE,
      onClick: goUserHandler(props.stores)(),
      iconColor: configGeneral.colors.iconColorDefault,
    },
    {
      Id: ButtonIDType.EDIT,
      onClick: empty_handler,
      hidden: true,
    },
  ];

  let button_updated: IButton[];
  if (props.buttons !== undefined) {
    button_updated = buttons.map((button) => {
      let button_result: IButton;
      props.buttons.forEach((button_provided) => {
        if (button_provided.Id === button.Id) {
          button_result = button;

          // result.Id = button_provided.Id
          if (button_provided.iconColor !== undefined) {
            button_result.iconColor = button_provided.iconColor;
          }
          if (button_provided.disabled !== undefined) {
            button_result.disabled = button_provided.disabled;
          }
          if (button_provided.hidden !== undefined) {
            button_result.hidden = button_provided.hidden;
          }
          if (button_provided.onClick !== undefined) {
            button_result.onClick = button_provided.onClick;
          }
        }
      });
      return button_result;
    });
  } else {
    button_updated = buttons;
  }

  const displayLabel = !isMobile(props.stores);

  const menuBarButton = (
    <MenuBarButtonLayout
      stores={props.stores}
      name="MenuBarDisplay"
      color={color_menu}
      direction="row"
      rounding={rounding}
      buttons={button_updated}
      displayLabel={displayLabel}
    />
  );

  return (
    <>
      {/* {props.isMobile ? (
        <Box column={12}>{menuBarButton}</Box>
      ) : (
        <Box display="flex" direction="column" flex="grow" alignItems="end">
          <Box padding={0} column={4} smColumn={3} mdColumn={3} lgColumn={2}>
            {display && menuBarButton}
          </Box>
        </Box>
      )} */}
      {display && menuBarButton}
    </>
  );
};

export default observer(MenuBarDisplay);
