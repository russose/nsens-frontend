import { Sticky, Box, Container } from "gestalt";
import MenuBar from "../MenuBar";
import { USER_GUI_CONFIG, USER_DISPLAY } from "../../config";
import { useStores } from "../../states/_RootStore";
import SearchBar from "../SearchBar";
import { onSearchHome } from "../../_handlers";
import { JsHeading } from "../js_components";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

const header_size = USER_DISPLAY.header_size;

const DefaultLayout: React.FunctionComponent = (props) => {
  const { uiStore } = useStores();

  const navigationMenu = (
    <Box color="white" padding={1} display="block">
      <MenuBar
        label_active="Saved"
        buttons_config={USER_GUI_CONFIG.menuBar}
        pathnames={["/", "/Knowbooks", "/User", "/More"]}
        queryObjects={[{ a: "n" }, {}, {}, {}]}
      />
    </Box>
  );

  const searchbar = (
    <SearchBar
      placeholder={USER_GUI_CONFIG.searchBar}
      handler={onSearchHome(uiStore)}
      value={uiStore.searchPattern}
    />
  );

  const headerText = (title: string) => {
    return (
      <Box color="lightGray" borderSize="lg" rounding={2} padding={2}>
        <JsHeading size={header_size} align="center">
          {title}
        </JsHeading>
      </Box>
    );
  };

  const router = useRouter();
  let Header;
  if (router.pathname === "/" || router.pathname === "/index") {
    Header = searchbar;
  } else if (router.pathname === "/Knowbooks") {
    Header = headerText(USER_GUI_CONFIG.knowbooks_title);
  } else if (router.pathname === "Saved") {
    Header = headerText(USER_GUI_CONFIG.AllSaved_title);
  } else if (router.pathname === "None") {
    Header = headerText(USER_GUI_CONFIG.None_Title);
  } else {
    Header = headerText(router.query.k as string);
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
              {Header}
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
