import { TconfigDataDisplay } from "./globals";

const card_compact_vizs_size = 120;

export const configDataDesktop: TconfigDataDisplay = {
  display: {
    displayFeedIncrement: 20,
    amount_related_displayed: 50,
  },
  max_nodes_network: 110, //Only Network
  heightTopAndBottom: 250, //Only Network
  heightUser: 500,
  heightChangePassword: "40vh",
  rounding_menu: 4,
  rounding_item: 6,
  rounding_knowbooks: "circle",
  size_icon_menu: "xs",
  size_icon_card: "xs",
  header_title_size: "sm",
  layout: {
    heightHeader: 60, //7%
    heightBody: "90vh", //"93%",
    SVG_R_Max: 400,
    SVG_R_Ratio: 0.9, //0.8,
    SVG_Element_Circle_Density: 0.7,
    SVG_Root_Ratio: 0.6,
    fontsize: "12",
    ratio_H_W_Item: 1.33,
  },
  dialogs: {
    title_size: "lg",
    texfield_size: "md",
    item_size: "md",
    button_icon_size: "lg",
  },
  // svgHeader: {
  //   delta_x: 130,
  //   position: { x: 70, y: 70 },
  // },
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
    height: 155,
    image_ratio: "75%",
    lgColumn: 3,
    mdColumn: 3,
    smColumn: 4,
    column: 6,
    lgPadding: 4,
    mdPadding: 4,
    smPadding: 2,
    padding: 2,
    title_card_size: "sm", //"md"
    max_title_size: 40,
  },
  About: {
    ratio_page_vh: "90vh",
    ratio_page_number: 0,
    ratio_logo: "8vh",
    ratio_image: "30vh",
    header_size: "md",
    features: {
      lgColumn: 3,
      mdColumn: 3,
      smColumn: 10,
      column: 10,
      padding: 3,
      title_size: "lg",
      desciption_size: "lg",
    },
  },
  atom_compact_vizs_sizes: {
    height: card_compact_vizs_size,
    width: card_compact_vizs_size,
    lgPadding: 2,
    mdPadding: 2,
    smPadding: 1,
    padding: 1,
    title_card_size: "sm",
    max_title_size: 33,
  },
};
