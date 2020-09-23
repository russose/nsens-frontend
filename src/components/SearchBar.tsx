import { Box, TextField, Icon } from "gestalt";

interface ISearchBarProps {
  placeholder: string;
  handlerText: any;
  handlerSubmit: any;
  handlerKeyboard: any;
  value: string;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      // justifyContent="around"
      // borderSize="sm"
    >
      <Box flex="grow">
        <TextField
          id="searchField"
          onChange={props.handlerText}
          onBlur={props.handlerSubmit}
          placeholder={props.placeholder}
          value={props.value}
          onKeyDown={props.handlerKeyboard}
        />
      </Box>
      <Box padding={0} paddingX={2}>
        <Icon icon="search" accessibilityLabel="Search" color="gray" />
      </Box>
    </Box>
  );
};

// export default observer(SearchBar);
export default SearchBar;
