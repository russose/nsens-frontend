import React from "react";
import { IconButton } from "gestalt";
import { ButtonIDType, ColorT, handlerT, IconT, SizeT } from "../common/types";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { IStores } from "../stores/_RootStore";
import { IparamsAtom } from "../stores/UIStore";

export interface IButton {
  Id: ButtonIDType;
  iconColor?: IconT; //handler
  disabled?: boolean;
  onClick?: handlerT; //handler
}

export const iconColorDefault = "darkGray";

interface IButtonProps {
  stores: IStores;
  icon: IconT;
  label: string;
  path: string;
  iconColor?: ColorT;
  disabled?: boolean;
  onClick?: () => {};
}

const _Button: React.FunctionComponent<IButtonProps> = (props) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const icon_size: SizeT = GUI_CONFIG.display.size_icon_menu;
  const path_empty = GUI_CONFIG.paths.pages.empty;
  const path_ = props.path === undefined ? path_empty : props.path;
  const iconColor_ =
    props.iconColor === undefined ? iconColorDefault : props.iconColor;
  const disabled_ = props.disabled === undefined ? false : props.disabled;
  const onClick_ = props.onClick === undefined ? null : props.onClick;

  let query_;
  if (
    props.path === GUI_CONFIG.paths.pages.ItemArticle ||
    props.path === GUI_CONFIG.paths.pages.ItemNetwork
  ) {
    const paramsItem: IparamsAtom = props.stores.uiStore.selectedAtom;
    query_ = { ...props.stores.userStore.paramsPage, ...paramsItem };
  } else {
    query_ = props.stores.userStore.paramsPage;
  }

  return path_ === path_empty ? (
    <IconButton
      accessibilityLabel={props.label}
      icon={props.icon}
      iconColor={iconColor_}
      size={icon_size}
      onClick={onClick_}
      disabled={disabled_}
    />
  ) : (
    <Link
      href={{
        pathname: props.stores.userStore.rootPath + props.path,
        // query: props.stores.userStore.paramsPage as any,
        query: query_ as any,
      }}
      passHref
    >
      <a>
        <IconButton
          accessibilityLabel={props.label}
          icon={props.icon}
          iconColor={iconColor_}
          size={icon_size}
        />
      </a>
    </Link>
  );
};

export default observer(_Button);
