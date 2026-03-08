import { Button } from "gestalt";
import { observer } from "mobx-react-lite";
import { configGeneral, configPaths } from "../config/globals";
import { onSubmitChangesEditUserProps } from "../handlers/handlers_User";
import { goPage } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";
import FormEditUserProps from "./FormEditUserProps";

interface IProps {
  stores: IStores;
}

const DialogEditUserProps: React.FunctionComponent<IProps> = (props) => {
  const stores = props.stores;

  const changePassword =
    props.stores.baseStore.GUI_CONFIG.language.user.changePassword;

  const size_button = props.stores.baseStore.GUI_CONFIG.display
    .size_button_generic as any;

  const button_color = configGeneral.colors.button_color_default as any;

  const resetPasswordButton = (
    <Button
      accessibilityLabel="resetPassword"
      text={changePassword}
      size={size_button}
      color={button_color}
      onClick={() => {
        goPage(stores, configPaths.pages.ChangePassword);
      }}
    />
  );

  return (
    <>
      {
        <FormEditUserProps
          // id={stores.uiStore.selectedKnowbook.name}
          stores={stores}
          button={resetPasswordButton}
          handler_confirm={onSubmitChangesEditUserProps(stores)}
        />
      }
    </>
  );
};

export default observer(DialogEditUserProps);
