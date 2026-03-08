import { TconfigDataDisplay } from "./globals";

export const configDataDesktop: TconfigDataDisplay = {
  // max_nodes_network: 110, //Only Network
  amount_bestPublicKnowbooks: 30,
  layout: {
    heightUser: "65vh", //700,
    heightChangePassword: "40vh",
    heightHeader: 60, //7%
    heightBody: "92vh",
    heightBottom: "6vh",
  },
  rounding_menu: 3,
  rounding_form: 6,
  rounding_item: 6,
  rounding_knowbooks: "circle",
  size_icon_generic: "xs",
  size_icon_menu_navigation: "sm",
  size_icon_card: "xs",
  size_icon_card_type: 12,
  size_text_generic: "100",
  size_text_header: "300",
  size_button_generic: "md",
  size_factor_atom_network: 0.5,
  size_factor_knowbook_network: 0.8,
  dialogs: {
    field_text_size: "md",
    item_checkbox_size: "md",
  },
  atom_sizes: {
    height: 200, //155
    width: 200,
    image_ratio: "80%",
    // lgColumn: 3,
    // mdColumn: 3,
    // smColumn: 4,
    // column: 6,
    lgPadding: 4,
    mdPadding: 4,
    smPadding: 2,
    padding: 2,
    size_text_title: "100",
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
    size_text_title: "100",
  },
};
