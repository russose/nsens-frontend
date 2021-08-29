const card_size = 220;
const card_compact_size = "30vw";
// const card_compact_vizs_size = 120;
const card_compact_vizs_size = 120;
// const card_size_ = 250;
// const card_compact_size = card_size_ * 0.8;
// const card_compact_vizs_size = card_size_ * 0.5;

export const configDataMobile = {
  display: {
    amount_item_displayed: 50,
    displayFeedIncrement: 5,
    amount_mostview_for_each_related: 2, //Should be >=1
    feed_time_increment_ms: 500,
  },
  max_nodes_network: 1,
  // min_width_network: 500,
  heightTopAndBottom: 190,
  heightArticle: "90vh",
  heightUser: 500,
  heightChangePassword: "45vh",
  rounding_menu: 4,
  rounding_item: 6,
  size_icon_menu: "lg", //"md" before tests
  size_icon_card: "sm",
  header_size: "sm",
  layout: {
    heightHeader: 60, //7%
    heightBody: "87%",
  },
  dialogs: {
    title_size: "lg",
    texfield_size: "md",
    item_size: "md",
    button_icon_size: "lg",
  },
  atom_sizes: {
    height: card_size,
    image_ratio: "75%",
    lgColumn: 4,
    mdColumn: 4,
    smColumn: 6,
    column: 6,
    lgPadding: 2,
    mdPadding: 2,
    smPadding: 2,
    padding: 2,
    title_card_size: "md",
    max_title_size: 60,
  },
  knowbook_sizes: {
    height: card_size,
    image_ratio: "75%",
    lgColumn: 4,
    mdColumn: 4,
    smColumn: 4,
    column: 4,
    lgPadding: 1,
    mdPadding: 1,
    smPadding: 1,
    padding: 1,
    title_card_size: "sm",
    max_title_size: 40,
  },
  atom_compact_sizes: {
    height: card_compact_size,
    width: card_compact_size,
    lgPadding: 2,
    mdPadding: 2,
    smPadding: 1,
    padding: 1,
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
    ratio_page_number: 1300,
    ratio_page_vh: "0vh",
    ratio_logo: "10vh",
    ratio_image: "25vh",
    header_size: "sm",
    features: {
      lgColumn: 11,
      mdColumn: 11,
      smColumn: 11,
      column: 11,
      padding: 4,
      title_size: "md",
      desciption_size: "md",
    },
  },
};
