import { observer } from "mobx-react-lite";
import React from "react";
import DialogEditKnowbooks from "./DialogEditKnowbooks";
import DialogLoading from "./DialogLoading";
import DialogRenameKnowbooks from "./DialogRenameKnowbooks";

const Dialogs: React.FunctionComponent<{}> = (props) => {
  return (
    <>
      <DialogEditKnowbooks />
      <DialogRenameKnowbooks />
      <DialogLoading />
    </>
  );
};

export default observer(Dialogs);
