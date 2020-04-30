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
}

export const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  return (
    <SearchField
      accessibilityLabel="Search Field"
      id="searchField"
      onChange={props.handler}
      placeholder={props.config.placeholder}
    />
  );
};

export default observer(SearchBar);
