import React from "react";
import { Box, IconButton, Text } from "gestalt";
import { ColorT, IconT, IparamsAtom, SizeT } from "../config/globals";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { configGeneral, configPaths } from "../config/globals";
import { IStores } from "../stores/RootStore";

interface IButtonProps {
  stores: IStores;
  icon: IconT;
  label: string;
  path: string;
  iconColor?: ColorT;
  disabled?: boolean;

  displayLabel: boolean;

  onClick?: () => void;
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const icon_size: SizeT = GUI_CONFIG.display.size_icon_menu;
  const path_empty = configPaths.pages.empty;
  const path_ = props.path === undefined ? path_empty : props.path;
  const iconColor_ =
    props.iconColor === undefined
      ? configGeneral.colors.iconColorDefaultNotSelected
      : props.iconColor;
  const disabled_ = props.disabled === undefined ? false : props.disabled;
  const onClick_ = props.onClick === undefined ? () => {} : props.onClick;

  let query_;
  if (
    props.path === configPaths.pages.ItemArticle ||
    props.path === configPaths.pages.ItemNetwork
  ) {
    const paramsItem: IparamsAtom = props.stores.uiStore.selectedAtom;
    query_ = { ...props.stores.baseStore.paramsPage, ...paramsItem };
  } else {
    query_ = props.stores.baseStore.paramsPage;
  }

  let labetText = <></>;
  if (props.displayLabel) {
    labetText = (
      <Box paddingY={0}>
        <Text size={"sm"} weight="bold">
          {props.label}
        </Text>
      </Box>
    );
  }

  return path_ === path_empty ? (
    <Box paddingX={0} display="flex" direction="column" alignItems="center">
      <IconButton
        accessibilityLabel={props.label}
        icon={props.icon}
        iconColor={iconColor_}
        size={icon_size}
        onClick={onClick_}
        disabled={disabled_}
      />
      {labetText}
    </Box>
  ) : (
    <Box paddingY={0} display="flex" direction="column" alignItems="center">
      <Link
        prefetch={false}
        href={{
          pathname: configPaths.rootPath + props.path,
          // query: props.stores.baseStore.paramsPage as any,
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
      {labetText}
    </Box>
  );
};

export default observer(Button);
