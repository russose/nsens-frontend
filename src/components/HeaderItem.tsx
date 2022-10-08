import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Text } from "gestalt";
import { IStores } from "../stores/RootStore";
import MenuBarItem from "./MenuBarItem";
import { isMobile } from "../libs/helpersBase";

interface IHeaderTitleProps {
  stores: IStores;
  title: string;
}

const HeaderItem: React.FunctionComponent<IHeaderTitleProps> = (props) => {
  const isMobile_ = isMobile(props.stores);

  const titleComponent = (
    <Box paddingY={0} paddingX={3}>
      {/* <Text size="300" weight="bold"> */}
      <Text size={isMobile_ ? "300" : "500"} weight="bold">
        {props.title}
      </Text>
    </Box>
  );

  const header_raw = (
    <MenuBarItem stores={props.stores} titleComponent={titleComponent} />
  );

  const header = (
    <>
      <Box paddingX={0} paddingY={1}>
        {header_raw}
      </Box>
    </>
  );

  return <>{header}</>;
};

export default observer(HeaderItem);
