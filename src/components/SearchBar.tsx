import { Box, TextField } from "gestalt";

interface ISearchBarProps {
  placeholder: string;
  handlerText: any;
  handlerSubmit: any;
  handlerKeyboard: any;
  value: string;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  return (
    <Box flex="grow" alignItems="center">
      <TextField
        id="searchField"
        // size="lg"
        onChange={props.handlerText}
        onBlur={props.handlerSubmit}
        placeholder={props.placeholder}
        value={props.value}
        onKeyDown={props.handlerKeyboard}
      />
    </Box>
  );
};

export default SearchBar;
