import { Box, SearchField } from "gestalt";
import React from "react";
import { handlerT } from "../config/globals";

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
      <SearchField
        accessibilityLabel="searchField"
        id="searchField"
        size="md"
        onChange={props.handlerText}
        onKeyDown={props.handlerKeyboard}
        placeholder={props.placeholder}
        value={props.value}
      />
    </Box>
  );
};

export default SearchBar;
