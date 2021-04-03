import { displayMobile } from "./configMobile";

export type GUI_CONFIG_display_T = typeof displayMobile;

const card_size = "15vh";
const card_compact_size = "10vh";
const card_compact_vizs_size = 120;

// const card_size = 250;
// const card_compact_size = card_size * 0.8;
// const card_compact_vizs_size = card_size * 0.5;

export const displayDesktop: GUI_CONFIG_display_T = {
  //card_height: 250,
  amount_item_displayed: 30,
  max_nodes_network: 110,
  // min_width_network: 500,
  heightTopAndBottom: 200,
  rounding_menu: 6,
  rounding_item: 6,
  size_icon_menu: "sm",
  size_icon_card: "xs",
  header_size: "sm",
  dialogs: {
    title_size: "lg",
    texfield_size: "md",
    item_size: "md",
    button_icon_size: "md",
  },
  atom_sizes: {
    height: card_size,
    image_ratio: "80%",
    lgColumn: 3,
    mdColumn: 3,
    smColumn: 4,
    column: 6,
    lgPadding: 6,
    mdPadding: 4,
    smPadding: 2,
    padding: 2,
    title_card_size: "sm",
    max_title_size: 60,
  },
  knowbook_sizes: {
    height: card_size,
    image_ratio: "75%",
    lgColumn: 3,
    mdColumn: 3,
    smColumn: 4,
    column: 6,
    lgPadding: 6,
    mdPadding: 4,
    smPadding: 2,
    padding: 2,
    title_card_size: "sm",
    max_title_size: 20,
  },
  atom_compact_sizes: {
    height: card_compact_size,
    width: card_compact_size,
    lgPadding: 2,
    mdPadding: 2,
    smPadding: 2,
    padding: 2,
    title_card_size: "sm",
    max_title_size: 20,
  },
  knowbook_compact_sizes: {
    height: card_compact_size,
    width: card_compact_size,
    // image_ratio: "80%",
    lgPadding: 2,
    mdPadding: 2,
    smPadding: 2,
    padding: 2,
    title_card_size: "sm",
    max_title_size: 20,
  },
  atom_compact_vizs_sizes: {
    height: card_compact_vizs_size,
    width: card_compact_vizs_size,
    lgPadding: 2,
    mdPadding: 2,
    smPadding: 1,
    padding: 1,
    title_card_size: "sm",
    max_title_size: 20,
  },
  landing: {
    ratio_page: "100vh",
    ratio_logo: "10vh",
    ratio_image: "40vh",
    header_size: "md",
    features: {
      lgColumn: 2,
      mdColumn: 5,
      smColumn: 5,
      column: 5,
      padding: 3,
      title_size: "lg",
      desciption_size: "lg",
    },
  },
};
