import { observer } from "mobx-react-lite";
import React from "react";
import DialogEditKnowbooks from "./DialogEditKnowbooks";
import DialogRenameKnowbooks from "./DialogRenameKnowbooks";

const Dialogs: React.FunctionComponent<{}> = (props) => {
  return (
    <>
      <DialogEditKnowbooks />
      <DialogRenameKnowbooks />
    </>
  );
};

export default observer(Dialogs);
