import React from "react";
import { Box, Avatar } from "gestalt";
import { JsText } from "./js_components";
import Link from "next/link";
import { USER_DISPLAY } from "../common/config";

interface IAvatarLinkProps {
  username: string;
  pathname: string;
  logged: boolean;
  label?: string;
  // queryObject?: ParsedUrlQueryInput;
}

const icon_size = "sm";
const image_path = USER_DISPLAY.paths.user_image;

const AvatarLink: React.FunctionComponent<IAvatarLinkProps> = (props) => {
  return (
    <Box padding={0} display="flex" direction="column" alignItems="center">
      <Box>
        <Link href={{ pathname: props.pathname }}>
          <a>
            <Avatar
              size={icon_size}
              src={image_path}
              name={props.username}
              verified={props.logged}
            />
          </a>
        </Link>
      </Box>
      {/* <Box padding={0}>
        <JsText size={font_size} weight={weight}>
          {props.label}
        </JsText>
      </Box> */}
    </Box>
  );
};

export default AvatarLink;
