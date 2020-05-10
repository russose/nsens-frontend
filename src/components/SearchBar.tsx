import { SearchField } from "gestalt";
import { SyntheticEvent } from "react";
import { observer } from "mobx-react";

interface ISearchBarProps {
  placeholder: string;
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
      placeholder={props.placeholder}
      value={props.value}
    />
  );
};

export default observer(SearchBar);
