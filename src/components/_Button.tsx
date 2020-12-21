import React from "react";
import { IconButton } from "gestalt";
import { ButtonIDType } from "../common/types";
import { observer } from "mobx-react-lite";
import Link from "next/link";

export interface IButton {
  Id: ButtonIDType;
  iconColor?: any; //handler
  disabled?: boolean;
  onClick?: any; //handler
}

export const iconColorDefault = "darkGray";

interface IButtonProps {
  icon: any;
  label: string;
  path: string;
  iconColor?: any;
  disabled?: boolean;
  onClick?: () => {};
}

const icon_size = "sm";

const _Button: React.FunctionComponent<IButtonProps> = (props) => {
  const path_ = props.path === undefined ? "" : props.path;
  const iconColor_ =
    props.iconColor === undefined ? iconColorDefault : props.iconColor;
  const disabled_ = props.disabled === undefined ? false : props.disabled;
  const onClick_ = props.onClick === undefined ? null : props.onClick;

  return path_ === "" ? (
    <IconButton
      accessibilityLabel={props.label}
      icon={props.icon}
      iconColor={iconColor_}
      size={icon_size}
      onClick={onClick_}
      disabled={disabled_}
    />
  ) : (
    <Link href={{ pathname: props.path }} passHref>
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
