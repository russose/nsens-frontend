import { Box, Icon, IconButton } from "gestalt";
import { observer } from "mobx-react-lite";
import {
  AtomID,
  CUSTOM_ICONS,
  IconT,
  RoundingT,
  TButtonID,
  TSource,
  buttons_all,
  configGeneral,
  configPaths,
  handlerT,
} from "../config/globals";
import { getSourceFromId } from "../libs/utils";
import { IStores } from "../stores/RootStore";
import Button from "./Button";
import CardGeneric from "./CardGeneric";
import LazyComponent from "./LazyComponent";

interface ICardAtomProps {
  id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  image_handler: handlerT;
  isInAnyKnowbook: boolean;
  edit_handler: handlerT;
  top_handler: handlerT;
  source: TSource;
  size_factor?: number;

  externalyzeTitle?: boolean;
}

const CardAtom: React.FunctionComponent<ICardAtomProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const size_icon: IconT = GUI_CONFIG.display.size_icon_card;
  const size_icon_type: IconT = GUI_CONFIG.display.size_icon_card_type;
  const color_item = configGeneral.colors.item_color;
  const card_sizes = GUI_CONFIG.display.atom_sizes;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;

  const type = getSourceFromId(props.id);
  // let icon = undefined;
  let __path = undefined;

  if (type === TSource.wiki) {
    __path = CUSTOM_ICONS.WIKI;
  } else if (type === TSource.arxiv) {
    __path = CUSTOM_ICONS.GRADUATE_USER;
  } else if (type === TSource.books) {
    __path = CUSTOM_ICONS.BOOKS;
  }

  const TypeIcon = (
    <Icon
      accessibilityLabel="Type of Atom"
      // icon={icon as any}
      dangerouslySetSvgPath={{
        __path: __path,
      }}
      color="dark"
      size={size_icon_type}
    />
  );

  const topIcon = (
    <Button
      stores={props.stores}
      icon={CUSTOM_ICONS.FORK as any}
      label="ItemPageDefault"
      icon_size={size_icon}
      bgColor="lightGray"
      displayLabel={false}
      onClick={props.top_handler}
    />
  );

  let image_url = props.image_url;
  if (props.source === TSource.arxiv) {
    image_url = configPaths.arxiv_image;
  }

  return (
    <LazyComponent
      sizes={card_sizes}
      topMargin={"200"}
      onChangeHandler={() => {
        props.stores.baseStore.setGoodImageInHistoryItem(props.id);
      }}
    >
      <>
        <CardGeneric
          id={props.id}
          stores={props.stores}
          title={props.title}
          image_url={image_url}
          color={color_item}
          sizes={card_sizes}
          rounding={rounding}
          image_handler={props.image_handler}
          TopIcon={topIcon}
          TypeIcon={TypeIcon}
          size_factor={props.size_factor}
          externalyzeTitle={props.externalyzeTitle}
        >
          <Box paddingX={0}>
            <IconButton
              accessibilityLabel="edit"
              icon={buttons_all[TButtonID.EDIT_CONTENT].icon as IconT}
              iconColor={
                props.isInAnyKnowbook
                  ? (configGeneral.colors.iconColorDefaultSelected as any)
                  : (configGeneral.colors.iconColorDefaultNotSelected as any)
              }
              size={size_icon}
              onClick={props.edit_handler}
            />
          </Box>
        </CardGeneric>
      </>
    </LazyComponent>
  );
};

export default observer(CardAtom);
