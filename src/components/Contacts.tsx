import { Box, Icon, IconButton, Text } from "gestalt";
import React from "react";
import { SizeT } from "../config/globals";
import _Button from "./_Button";
import _ButtonWithLabel from "./_ButtonWithLabel";

interface IContactsProps {
  text: string;
  email: string;
  twitter_link: string;
  icon_size: SizeT;
  text_size: SizeT;
}

const Contacts: React.FunctionComponent<IContactsProps> = (props) => {
  return (
    <>
      <Box
        padding={0}
        display="flex"
        direction="column"
        alignItems="center"
        column={8}
        smColumn={4}
        mdColumn={3}
        lgColumn={2}
      >
        <Box padding={5}>
          <Text size={props.text_size} weight="bold">
            {props.text}
          </Text>
        </Box>
        <Box
          padding={0}
          display="flex"
          direction="row"
          flex="grow"
          width="100%"
          justifyContent="around"
        >
          <a href={"mailto:" + props.email}>
            <Icon
              accessibilityLabel={"email"}
              icon="envelope"
              color="darkGray"
              size={props.icon_size}
            />
          </a>
          <a href={props.twitter_link} target="_blank">
            <Icon
              accessibilityLabel={"twitter"}
              icon="twitter"
              color="darkGray"
              size={props.icon_size}
            />
          </a>
        </Box>
      </Box>

      {/* <_ButtonWithLabel
        icon="envelope"
        direction="column"
        href={"mailto:" + props.email}
        text={props.emailText}
        icon_size={props.icon_size}
        text_size={props.text_size}
      /> */}
    </>
  );
};

export default Contacts;
