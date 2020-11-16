import { Sticky, Box } from "gestalt";
import { USER_GUI_CONFIG, USER_DISPLAY } from "../../common/config";
import SearchBar from "../SearchBar";
import {
  onSearchHomeText,
  onSearchHomeSubmit,
  onSearchHomeKeyboard,
  onMenuButtonPath,
  onMenuButtonClick,
} from "../../handlers";
import { JsHeading } from "../js_components";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { initializeApp } from "../../initialization";
import { _login, _getUser } from "../../_api";
import MenuBarLink from "../MenuBarLink";
import MenuBarButton from "../MenuBarButton";
import { ButtonIDType } from "../../common/types";
import { useStores } from "../../stores/_RootStoreHook";

const header_size = USER_DISPLAY.header_size;
const color_menu = USER_DISPLAY.colors.menu;
const color_headers = USER_DISPLAY.colors.headers as any;
// const buttons = USER_GUI_CONFIG.buttons;

const DefaultLayout: React.FunctionComponent = (props) => {
  const { dataStore, uiStore, userStore, knowbookStore } = useStores();
  const router = useRouter();

  if (userStore.user === null) {
    initializeApp(dataStore, userStore, knowbookStore);
  }

  const navigationButtonsIds: ButtonIDType[] = [
    ButtonIDType.HOME,
    ButtonIDType.KNOWBOOKS,
    // ButtonIDType.VIZS,
    ButtonIDType.LOGIN,
  ];
  const navigationMenu = (
    <Box color="white" padding={1} display="block">
      <MenuBarLink
        name="NavigationMenuBar"
        buttonsIds={navigationButtonsIds}
        color={color_menu}
        path_handler={onMenuButtonPath(uiStore, userStore)}
      />
    </Box>
  );

  const displayMenuDisplayed = router.pathname.includes("ItemView");
  const displayMenu = displayMenuDisplayed && (
    <Box color="white" padding={1} display="block">
      <MenuBarButton
        name="displayMenuBar"
        buttonsIds={[ButtonIDType.ARTICLE, ButtonIDType.VIZS]}
        color={color_menu}
        onClick_handler={onMenuButtonClick(uiStore)}
      />
    </Box>
  );

  const searchbar = (
    <SearchBar
      placeholder={USER_GUI_CONFIG.searchBar}
      handlerText={onSearchHomeText(uiStore)}
      handlerSubmit={onSearchHomeSubmit(dataStore, uiStore, userStore)}
      handlerKeyboard={onSearchHomeKeyboard(dataStore, uiStore, userStore)}
      value={uiStore.searchPattern}
    />
  );

  // const avatar = (
  //   <AvatarLink
  //     username={dataStore.user === null ? "" : dataStore.user.username}
  //     logged={dataStore.isLogged}
  //     pathname="/User"
  //   />
  // );

  const headerText = (title: string) => {
    return (
      <Box
        color={color_headers}
        borderSize="lg"
        flex="grow"
        rounding={2}
        padding={2}
      >
        <JsHeading size={header_size} align="center">
          {title}
        </JsHeading>
      </Box>
    );
  };

  let header;
  if (router.pathname === "/" || router.pathname === "/index") {
    header = searchbar;
  } else if (router.pathname === "/User") {
    if (userStore.isLogged) {
      header = headerText(
        userStore.user === null ? "" : userStore.user.username
      );
    } else {
      header = headerText(USER_GUI_CONFIG.loginSignup.title);
    }
  } else if (router.pathname === "/Knowbooks") {
    header = headerText(USER_GUI_CONFIG.knowbooks.knowbooks_title);
  } else if (router.pathname === "/Saved") {
    header = headerText(USER_GUI_CONFIG.knowbooks.AllSaved_title);
  } else if (router.pathname === "/None") {
    header = headerText(USER_GUI_CONFIG.knowbooks.None_Title);
  } else {
    header = headerText(router.query.title as string);
  }

  return (
    <Box
      color="white"
      padding={0}
      display="flex"
      direction="column"
      height="98vh"
      alignItems="center"
      overflow="hidden"
    >
      <Box column={12} smColumn={12} mdColumn={12} lgColumn={10}>
        <Sticky top={0}>
          <Box display="flex" alignItems="center" wrap={true}>
            <Box
              padding={2}
              display="inlineBlock"
              column={7}
              smColumn={8}
              mdColumn={8}
              lgColumn={9}
            >
              <Box
                padding={1}
                display="flex"
                flex="grow"
                alignItems="center"
                // justifyContent="start"
              >
                {displayMenu}
                {header}
              </Box>
            </Box>

            <Box
              padding={0}
              column={5}
              smColumn={4}
              mdColumn={4}
              lgColumn={3}
              display="inlineBlock"
              smDisplay="inlineBlock"
              mdDisplay="inlineBlock"
              lgDisplay="inlineBlock"
            >
              {navigationMenu}
            </Box>

            {/* <Box
              padding={1}
              display="inlineBlock"
              column={1}
              smColumn={1}
              mdColumn={1}
              lgColumn={1}
            >
              {avatar}
            </Box> */}
          </Box>
        </Sticky>

        <Box
          color="white"
          padding={0}
          display="flex"
          direction="column"
          height="90vh"
          width="100"
          justifyContent="between"
          overflow="auto"
          //overflow="scrollY"
        >
          {props.children}
        </Box>

        {/* <Sticky bottom={0}>
          <Box
            display="block"
            smDisplay="block"
            mdDisplay="none"
            lgDisplay="none"
          >
            {navigationMenu}
          </Box>
        </Sticky> */}
      </Box>
    </Box>
  );
};

export default observer(DefaultLayout);
// export default DefaultLayout;
