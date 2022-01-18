import { Box, SelectList } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, TUiStringStorage } from "../config/types";
import { onDropdownSelection } from "../handlers/handlers_Searchbar_Navigation";
import { capitalizeFirstLetter } from "../libs/utils";
import { IStores } from "../stores/RootStore";

interface IProps {
  stores: IStores;
}

const SVGDropdown: React.FunctionComponent<IProps> = (props) => {
  const width = props.stores.baseStore.GUI_CONFIG.display.dropdown.width;
  const height = props.stores.baseStore.GUI_CONFIG.display.dropdown.height;
  const deltaPosition: IPosition =
    props.stores.baseStore.GUI_CONFIG.display.dropdown.delta_position;
  const values: string[] = [
    "",
    ...Array.from(props.stores.graphStore.relatedMap.keys()),
  ];
  const options = values.sort().map((key) => {
    return {
      label: capitalizeFirstLetter(key),
      value: key,
    };
  });

  return (
    <g transform={`translate(${deltaPosition.x}, ${deltaPosition.y}) `}>
      <foreignObject x={0} y={0} width={width} height={height}>
        <Box color="transparent" paddingX={0} height={height}>
          <SelectList
            id="SVGDropdown"
            options={options}
            // label="Filter relations"
            value={props.stores.uiStore.getUiStringStorage(
              TUiStringStorage.dropdownselection
            )}
            size="md"
            onChange={onDropdownSelection(props.stores) as any}
          />
        </Box>
      </foreignObject>
    </g>
  );
};

export default observer(SVGDropdown);
