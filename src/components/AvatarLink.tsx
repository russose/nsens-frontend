import React from "react";
import { Box, Avatar } from "gestalt";
import Link from "next/link";
import { IStores } from "../stores/_RootStore";

interface IAvatarLinkProps {
  stores: IStores;
  username: string;
  pathname: string;
  logged: boolean;
  label?: string;
  // queryObject?: ParsedUrlQueryInput;
}

const AvatarLink: React.FunctionComponent<IAvatarLinkProps> = (props) => {
  const icon_size = "sm";
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const image_path = GUI_CONFIG.paths.user_image;
  return (
    <Box padding={0} display="flex" direction="column" alignItems="center">
      {/* <Box> */}
      <>
        <Link
          href={{
            // pathname: props.pathname
            pathname: props.stores.userStore.rootPath + props.pathname,
            query: props.stores.userStore.paramsPage as any,
          }}
          passHref
        >
          <a>
            <Avatar
              size={icon_size}
              src={image_path}
              name={props.username}
              verified={props.logged}
            />
          </a>
        </Link>
      </>
      {/* </Box> */}
      {/* <Box padding={0}>
        <JsText size={font_size} weight={weight}>
          {props.label}
        </JsText>
      </Box> */}
    </Box>
  );
};

export default AvatarLink;
