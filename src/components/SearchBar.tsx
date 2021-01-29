import { Box, TextField } from "gestalt";
import { handlerT } from "../common/types";

interface ISearchBarProps {
  placeholder: string;
  handlerText: handlerT;
  handlerSubmit: handlerT;
  handlerKeyboard: handlerT;
  value: string;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  return (
    <Box padding={0} flex="grow" alignItems="center">
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
