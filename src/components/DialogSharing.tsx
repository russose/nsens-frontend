import { Box, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { TUiStringStorage } from "../config/globals";
import { closeAllDialogs } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";

import { useRouter } from "next/router";
import DialogPanel from "./DialogPanel";

interface IProps {
  stores: IStores;
  // information: string;
}

const DialogSharing: React.FunctionComponent<IProps> = (props) => {
  const router = useRouter();

  const url = props.stores.uiStore.getUiStringStorage(
    TUiStringStorage.sharingInformation
  );

  // const url_ = "https://www.fr.landing.nsens.org/";

  // const path_image_full =
  //   CONFIG_ENV.FRONT_URL + "/" + configPaths.image_landing;

  // let text_item = router.query.title;
  // if (router.query.type === TKnowbooksPages.Mostviewed) {
  //   text_item =
  //     props.stores.baseStore.GUI_CONFIG.language.SEO.title_description
  //       .KnowbookSpecial.Mostviewed.title;
  // }

  const text_title = props.stores.baseStore.GUI_CONFIG.language.social.title;

  // const description =
  //   props.stores.baseStore.GUI_CONFIG.language.social.description_base +
  //   text_item;
  const size_text = props.stores.baseStore.GUI_CONFIG.display
    .size_text_header as any;

  // const icon_size = 32;

  // const social_icons = (
  //   <Box
  //     padding={0}
  //     display="flex"
  //     direction="row"
  //     flex="grow"
  //     width="100%"
  //     justifyContent="around"
  //   >
  //     <TwitterShareButton url={url} title={description} hashtags={[""]}>
  //       <TwitterIcon size={icon_size} round={true} />
  //     </TwitterShareButton>

  //     <LinkedinShareButton
  //       url={url}
  //       title={"nSens"}
  //       summary={description}
  //       source={url}
  //     >
  //       <LinkedinIcon size={icon_size} round={true} />
  //     </LinkedinShareButton>

  //     <FacebookShareButton
  //       url={url}
  //       quote={description}
  //       hashtag="#nsens #knowledge"
  //     >
  //       <FacebookIcon size={icon_size} round={true} />
  //     </FacebookShareButton>

  //     <WhatsappShareButton url={url} title={description}>
  //       <WhatsappIcon size={icon_size} round={true} />
  //     </WhatsappShareButton>

  //     <PinterestShareButton
  //       url={url}
  //       description={description}
  //       media={path_image_full}
  //     >
  //       <PinterestIcon size={icon_size} round={true} />
  //     </PinterestShareButton>

  //     <EmailShareButton
  //       url={url}
  //       subject={description}
  //       body={description + "\n"}
  //     >
  //       <EmailIcon size={icon_size} round={true} />
  //     </EmailShareButton>
  //   </Box>
  // );

  return (
    <DialogPanel
      stores={props.stores}
      heading={text_title}
      onDismiss={() => {
        closeAllDialogs(props.stores);
      }}
      size="sm"
    >
      {/* <Box width={"100%"}>{social_icons}</Box> */}
      {/* <Box paddingY={3}></Box> */}
      <Text size={size_text} weight={"bold"}>
        {url}
      </Text>
      <Box paddingY={3}></Box>
    </DialogPanel>
  );
};

export default observer(DialogSharing);
