import { observer } from "mobx-react-lite";
import {
  onDeleteKnowbook,
  onSubmitChangesEditKnowbooksProps,
} from "../handlers/handlers_Knowbooks";
import { IStores } from "../stores/RootStore";
import FormEditKnowbookProps from "./FormEditKnowbookProps";

interface IProps {
  stores: IStores;
}

const DialogEditKnowbookProps: React.FunctionComponent<IProps> = (props) => {
  const stores = props.stores;

  return (
    <>
      <FormEditKnowbookProps
        id={stores.uiStore.selectedKnowbook}
        stores={stores}
        handler_confirm={onSubmitChangesEditKnowbooksProps(stores)}
        handler_delete={onDeleteKnowbook(stores)(
          stores.uiStore.selectedKnowbook
        )}
      />
    </>
  );
};

export default observer(DialogEditKnowbookProps);
