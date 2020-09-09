import { Sticky, Box } from "gestalt";
import MenuBar from "../MenuBar";
import { USER_GUI_CONFIG, USER_DISPLAY } from "../../common/config";
import { useStores } from "../../stores/_RootStore";
import SearchBar from "../SearchBar";
import { onSearchHome } from "../../handlers";
import { JsHeading } from "../js_components";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import { initializeApp } from "../../initialization";
import { _login, _getUser } from "../../_api";
import AvatarLink from "../AvatarLink";
import { CONFIG_OPS } from "../../common/config_env";

const header_size = USER_DISPLAY.header_size;
const color_menu = USER_DISPLAY.colors.menu;
const color_headers = USER_DISPLAY.colors.headers as any;

const DefaultLayout: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();
  const router = useRouter();

  if (dataStore.user === null) {
    initializeApp(dataStore);
  }

  const navigationMenu = (
    <Box color="white" padding={1} display="block">
      <MenuBar
        buttons_config={USER_GUI_CONFIG.menuBar}
        pathnames={["/", "/Knowbooks", "/Vizs"]}
        color={color_menu}
        loginPath="/User"
        isLogged={dataStore.isLogged}
      />
    </Box>
  );

  const searchbar = (
    <SearchBar
      placeholder={USER_GUI_CONFIG.searchBar}
      handler={onSearchHome(dataStore, uiStore)}
      value={uiStore.searchPattern}
    />
  );

  const avatar = (
    <AvatarLink
      username={dataStore.user === null ? "" : dataStore.user.username}
      logged={dataStore.isLogged}
      pathname="/User"
    />
  );

  const headerText = (title: string) => {
    return (
      <Box color={color_headers} borderSize="lg" rounding={2} padding={2}>
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
    if (dataStore.isLogged) {
      header = headerText(
        dataStore.user === null ? "" : dataStore.user.username
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
    header = headerText(router.query.k as string);
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
          <Box display="flex" alignItems="center">
            <Box
              padding={2}
              display="inlineBlock"
              column={12}
              smColumn={12}
              mdColumn={8}
              lgColumn={8}
            >
              {header}
            </Box>
            <Box
              column={0}
              smColumn={0}
              mdColumn={4}
              lgColumn={4}
              display="none"
              smDisplay="none"
              mdDisplay="inlineBlock"
              lgDisplay="inlineBlock"
            >
              {navigationMenu}
            </Box>
            <Box
              padding={2}
              display="inlineBlock"
              column={2}
              smColumn={2}
              mdColumn={1}
              lgColumn={1}
            >
              {avatar}
            </Box>
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

        <Sticky bottom={0}>
          <Box
            display="block"
            smDisplay="block"
            mdDisplay="none"
            lgDisplay="none"
          >
            {navigationMenu}
          </Box>
        </Sticky>
      </Box>
    </Box>
  );
};

export default observer(DefaultLayout);
