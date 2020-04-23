import { SearchField } from "gestalt";
import { IConfigSearchBar } from "../types";
import { SyntheticEvent } from "react";
import { observer } from "mobx-react";

interface ISearchBarProps {
  config: IConfigSearchBar;
  handler: (args: {
    value: string;
    syntheticEvent: SyntheticEvent<any>;
  }) => void;
  value: string;
}

export const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  return (
    <SearchField
      accessibilityLabel="Search Field"
      id="searchField"
      onChange={props.handler}
      placeholder={props.config.placeholder}
      value={props.value}
    />
  );
};

export default observer(SearchBar);
