import { TconfigDataDisplay } from "./globals";

const card_compact_vizs_size = 120;

export const configDataDesktop: TconfigDataDisplay = {
  display: {
    displayFeedIncrement: 20,
    amount_related_displayed: 50,
  },
  // max_nodes_network: 110, //Only Network
  // heightTopAndBottom: 250, //Only Network
  rounding_menu: 4,
  rounding_item: 6,
  rounding_item_viz: 4,
  rounding_knowbooks: "circle",
  size_icon_menu: "xs",
  size_icon_card: "xs",
  header_title_size: "sm",
  layout: {
    heightUser: 700,
    heightChangePassword: "40vh",
    heightHeader: 60, //7%
    heightBody: "92vh", //"93%",
    heightBottom: "6vh",
    // heightSlideArticle: "80vh",
    SVG_R_Max: 400,
    SVG_R_Ratio: 0.8, //0.9, //0.8,
    SVG_deltaStepGrid_Ratio: 1.2,
    SVG_Slider_Circle_Ratio: 1.2,
    SVG_Slider_Grid_Ratio: 1.0,
    SVG_Element_Circle_Density: 0.7,
    SVG_Root_Ratio: 0.6,
    fontsize: "13",
    ratio_H_W_Item: 1.33,
  },
  dialogs: {
    title_size: "lg",
    texfield_size: "md",
    item_size: "md",
    button_icon_size: "lg",
  },
  dropdown: {
    width: 200,
    height: 50,
    delta_position: { x: -20, y: -30 },
  },
  atom_sizes: {
    height: 155, //220
    image_ratio: "80%",
    lgColumn: 3,
    mdColumn: 3,
    smColumn: 4,
    column: 6,
    lgPadding: 4,
    mdPadding: 4,
    smPadding: 2,
    padding: 2,
    title_card_size: "sm",
    max_title_size: 30,
  },
  knowbook_sizes: {
    height: 150,
    width: 150,
    image_ratio: "75%",
    // lgColumn: 3,
    // mdColumn: 3,
    // smColumn: 4,
    // column: 6,
    lgPadding: 4,
    mdPadding: 4,
    smPadding: 2,
    padding: 2,
    title_card_size: "sm", //"md"
    max_title_size: 40,
  },
  About: {
    ratio_presentation: "65vh",
    ratio_image: "70%",
  },
  atom_compact_vizs_sizes: {
    height: card_compact_vizs_size,
    width: card_compact_vizs_size,
    lgPadding: 2,
    mdPadding: 2,
    smPadding: 1,
    padding: 1,
    title_card_size: "sm",
    max_title_size: 27,
  },
};
