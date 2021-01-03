import React from "react";
import { Box, Avatar } from "gestalt";
import Link from "next/link";
import { GUI_CONFIG } from "../common/config";

interface IAvatarLinkProps {
  username: string;
  pathname: string;
  logged: boolean;
  label?: string;
  // queryObject?: ParsedUrlQueryInput;
}

const AvatarLink: React.FunctionComponent<IAvatarLinkProps> = (props) => {
  const icon_size = "sm";
  const image_path = GUI_CONFIG.paths.user_image;
  return (
    <Box padding={0} display="flex" direction="column" alignItems="center">
      {/* <Box> */}
      <>
        <Link href={{ pathname: props.pathname }} passHref>
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
