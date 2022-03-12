import { Box, Image, Text } from "gestalt";
import React from "react";
import { isMobile } from "../../libs/helpersBase";
import { IStores } from "../../stores/RootStore";

interface IProps {
  stores: IStores;
  image_path: string;
  text?: string;
  additionnal_element?: any;
}

const AboutTemplate: React.FunctionComponent<IProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const slogan = GUI_CONFIG.language.SEO.description_page_base;
  const ratio_image = GUI_CONFIG.display.About.ratio_image;
  const ratio_presentation = GUI_CONFIG.display.About.ratio_presentation;

  const textSize: any = isMobile(props.stores) ? "300" : "500";
  return (
    <section>
      <Box
        height={ratio_presentation}
        padding={1}
        column={12}
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="evenly"
        overflow="hidden"
      >
        {props.text !== undefined || props.additionnal_element !== undefined ? (
          <Box borderStyle="none" padding={0} column={11}>
            <Text size={textSize} weight="bold" align="center">
              {props.text}
              {props.additionnal_element !== undefined ? (
                props.additionnal_element
              ) : (
                <></>
              )}
            </Text>
          </Box>
        ) : (
          <></>
        )}

        <Box padding={0} height={ratio_image} width="100%">
          <Image
            alt={slogan}
            color="transparent"
            fit="contain"
            naturalHeight={1}
            naturalWidth={1}
            loading="lazy"
            src={props.image_path}
          ></Image>
        </Box>
      </Box>
    </section>
  );
};

export default AboutTemplate;
