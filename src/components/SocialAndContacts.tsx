import { Box, Icon, Text } from "gestalt";
import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { configPaths, CONFIG_ENV, getEmail } from "../config/globals";
import { IStores } from "../stores/RootStore";

interface IContactsProps {
  stores: IStores;
}

const SocialAndContacts: React.FunctionComponent<IContactsProps> = (props) => {
  const email = getEmail();
  const twitter_link = "https://twitter.com/_nsens";
  const pinterest_link = "https://pin.it/5G6QCg7";
  const instagram_link = "https://www.instagram.com/_nsens";
  const text_contact = props.stores.baseStore.GUI_CONFIG.language.user.contact;
  const text_social = props.stores.baseStore.GUI_CONFIG.language.user.social;
  const url = "https://www.nsens.org";
  const description =
    props.stores.baseStore.GUI_CONFIG.language.SEO.description_page_base;
  const path_image_full =
    CONFIG_ENV.FRONT_URL + "/" + configPaths.image_landing;

  const icon_size = 32;
  const text_size = "lg";

  const contact_icons = (
    <Box
      padding={0}
      display="flex"
      direction="row"
      flex="grow"
      width="100%"
      justifyContent="around"
    >
      <a href={"mailto:" + email}>
        <Icon
          accessibilityLabel={"email"}
          icon="envelope"
          color="darkGray"
          size={icon_size}
        />
      </a>
      <a href={twitter_link} target="_blank">
        <Icon
          accessibilityLabel={"twitter"}
          icon="twitter"
          color="darkGray"
          size={icon_size}
        />
      </a>
      <a href={instagram_link} target="_blank">
        <Icon
          accessibilityLabel={"Instagram"}
          icon="camera"
          color="darkGray"
          size={icon_size}
        />
      </a>
      <a href={pinterest_link} target="_blank">
        <Icon
          accessibilityLabel={"pinterest"}
          icon="pinterest"
          color="darkGray"
          size={icon_size}
        />
      </a>
    </Box>
  );

  const social_icons = (
    <Box
      padding={0}
      display="flex"
      direction="row"
      flex="grow"
      width="100%"
      justifyContent="around"
    >
      <TwitterShareButton url={url} title={description} hashtags={[""]}>
        <TwitterIcon size={icon_size} round={true} />
      </TwitterShareButton>

      <LinkedinShareButton
        url={url}
        title={"n.Sens"}
        summary={description}
        source={url}
      >
        <LinkedinIcon size={icon_size} round={true} />
      </LinkedinShareButton>

      <FacebookShareButton
        url={url}
        quote={description}
        hashtag="#nsens #wikipedia #knowledge"
      >
        <FacebookIcon size={icon_size} round={true} />
      </FacebookShareButton>

      <WhatsappShareButton url={url} title={description}>
        <WhatsappIcon size={icon_size} round={true} />
      </WhatsappShareButton>

      <PinterestShareButton
        url={url}
        description={description}
        media={path_image_full}
      >
        <PinterestIcon size={icon_size} round={true} />
      </PinterestShareButton>

      <EmailShareButton url={url} subject={description} body={description}>
        <EmailIcon size={icon_size} round={true} />
      </EmailShareButton>
    </Box>
  );

  return (
    <Box
      display="block"
      direction="column"
      alignSelf="center"
      paddingY={0}
      column={12}
      smColumn={8}
      mdColumn={6}
      lgColumn={4}
    >
      <Box padding={1}></Box>
      <Box padding={3}>
        <Text size={text_size} align="center" weight="bold">
          {text_social}
        </Text>
      </Box>
      {social_icons}

      <Box padding={3}></Box>

      <Box padding={3}>
        <Text size={text_size} align="center" weight="bold">
          {text_contact}
        </Text>
      </Box>
      {contact_icons}
    </Box>
  );
};

export default SocialAndContacts;
