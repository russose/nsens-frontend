import { Text } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { ILink, SizeT } from "../../config/globals";
import { IStores } from "../../stores/RootStore";

interface IProps {
  stores: IStores;
  link: ILink;
  id: string;
}

const NetworkNode: React.FunctionComponent<IProps> = (props) => {
  const label_size: SizeT =
    props.stores.baseStore.GUI_CONFIG.display.atom_sizes.size_text_title;

  const link_label = props.link.target.relation_name;

  return (
    <>
      {
        <div id={props.id}>
          <Text size={label_size} align="center" weight="bold">
            {link_label}
          </Text>
        </div>
      }
    </>
  );
};

export default observer(NetworkNode);
