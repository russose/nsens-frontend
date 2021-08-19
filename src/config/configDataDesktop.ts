import { configDataDisplay } from "./globals";

const card_size = 220;
const card_compact_size = "10vh";
const card_compact_vizs_size = 120;
// const card_size = 250;
// const card_compact_size = card_size * 0.8;
// const card_compact_vizs_size = card_size * 0.5;

export const configDataDesktop: configDataDisplay = {
  displayFeedIncrement: 2,
  amount_item_displayed: 50,
  max_nodes_network: 110,
  // min_width_network: 500,
  heightTopAndBottom: 200,
  heightArticle: "87vh",
  heightUser: 500,
  heightChangePassword: "40vh",
  rounding_menu: 4,
  rounding_item: 6,
  size_icon_menu: "xs",
  size_icon_card: "sm",
  header_size: "sm",
  layout: {
    heightHeader: 60, //7%
    heightBody: "93%",
  },
  dialogs: {
    title_size: "lg",
    texfield_size: "md",
    item_size: "md",
    button_icon_size: "lg",
  },
  atom_sizes: {
    height: card_size,
    image_ratio: "80%",
    lgColumn: 3,
    mdColumn: 3,
    smColumn: 4,
    column: 6,
    lgPadding: 4,
    mdPadding: 4,
    smPadding: 2,
    padding: 2,
    title_card_size: "md",
    max_title_size: 60,
  },
  knowbook_sizes: {
    height: card_size,
    image_ratio: "75%",
    lgColumn: 3,
    mdColumn: 3,
    smColumn: 4,
    column: 6,
    lgPadding: 4,
    mdPadding: 4,
    smPadding: 2,
    padding: 2,
    title_card_size: "md",
    max_title_size: 40,
  },
  atom_compact_sizes: {
    height: card_compact_size,
    width: card_compact_size,
    lgPadding: 2,
    mdPadding: 2,
    smPadding: 2,
    padding: 2,
    title_card_size: "sm",
    max_title_size: 33,
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
};
