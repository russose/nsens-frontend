import { observer } from "mobx-react-lite";
import React from "react";
import { TButtonID, configPaths, IButton } from "../config/globals";
import { IStores } from "../stores/RootStore";
import MenuBarButtonLayout from "./layout/MenuBarButtonLayout";
import { configGeneral } from "../config/globals";
import { empty_handler } from "../libs/utils";
import { goUserHandler, isMobile } from "../libs/helpersBase";
import { useRouter } from "next/router";

interface IMenuBarDisplayProps {
  stores: IStores;

  buttons?: IButton[];
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
    router.pathname.includes(configPaths.pages.StaticArticle);
  // const display = true;

  const display_viz: boolean = router.pathname.includes(
    configPaths.pages.ItemNetwork
  );

  const buttons: IButton[] = [
    {
      Id: TButtonID.VIZS,
      iconColor: display_viz
        ? configGeneral.colors.iconColorDefaultSelected
        : configGeneral.colors.iconColorDefaultNotSelected,
      // hidden: router.pathname.includes(configPaths.pages.ItemNetwork),
    },
    {
      Id: TButtonID.ARTICLE,
      iconColor: !display_viz
        ? configGeneral.colors.iconColorDefaultSelected
        : configGeneral.colors.iconColorDefaultNotSelected,
      // hidden: router.pathname.includes(configPaths.pages.ItemArticle),
    },
    {
      Id: TButtonID.SEPARATOR,
      onClick: undefined,
      // iconColor: configGeneral.colors.iconColorDefaultNotSelected,
      iconColor: "white",
      disabled: true,
    },
    {
      Id: TButtonID.SAVE,
      onClick: goUserHandler(props.stores)(),
      iconColor: configGeneral.colors.iconColorDefaultNotSelected,
    },
    {
      Id: TButtonID.EDIT,
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

  return <>{display && menuBarButton}</>;
};

export default observer(MenuBarDisplay);
