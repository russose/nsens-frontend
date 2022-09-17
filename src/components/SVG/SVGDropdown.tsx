import { Box, SelectList } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, TUiStringStorage } from "../../config/globals";
import { onDropdownSelection } from "../../handlers/handlers_SVG";
import { capitalizeFirstLetter } from "../../libs/utils";
import { IStores } from "../../stores/RootStore";

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
    // console.log(key);
    // let key_: string;
    // if (key === "") {
    //   key_ = "----";
    // } else {
    //   key_ = key;
    // }
    return {
      label: key === "" ? "----" : capitalizeFirstLetter(key),
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
