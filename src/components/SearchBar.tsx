import { Box, IconButton } from "gestalt";
import React from "react";
import { handlerT } from "../common/types";
import { JsSearchField } from "./_js_components";

interface ISearchBarProps {
  placeholder: string;
  handlerText: handlerT;
  handlerSubmit: handlerT;
  handlerKeyboard: handlerT;
  value: string;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  return (
    <Box padding={0} display="flex" alignItems="center">
      {/* <TextField
        id="searchField"
        // size="lg"
        onChange={props.handlerText}
        onBlur={props.handlerSubmit}
        placeholder={props.placeholder}
        value={props.value}
        onKeyDown={props.handlerKeyboard}
      /> */}
      <JsSearchField
        accessibilityLabel="searchField"
        id="searchField"
        size="md"
        onChange={props.handlerText}
        // onBlur={props.handlerSubmit}
        onKeyDown={props.handlerKeyboard}
        placeholder={props.placeholder}
        value={props.value}
      />
      <Box padding={1}>
        <IconButton
          accessibilityLabel="Button searchField"
          icon="search"
          iconColor="darkGray"
          bgColor="lightGray"
          size="sm"
          onClick={props.handlerSubmit}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
