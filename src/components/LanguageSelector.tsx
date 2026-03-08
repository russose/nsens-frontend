import { Box, RadioButton } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { Tlanguage } from "../config/globals";
import { onChangeLanguage } from "../handlers/handlers_User";
import { IStores } from "../stores/RootStore";

interface ILanguageSelectorProps {
  stores: IStores;
}

const LanguageSelector: React.FunctionComponent<ILanguageSelectorProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const rounding = GUI_CONFIG.display.rounding_menu;

  const languages_list = Object.values(Tlanguage);

  return (
    <Box
      paddingY={2}
      display="flex"
      alignItems="center"
      justifyContent="around"
      borderStyle="shadow"
      rounding={rounding as any}
    >
      {languages_list.map((language: Tlanguage) => {
        return (
          <Box key={`'box'-${language}`} alignItems="center">
            <RadioButton
              checked={props.stores.baseStore.paramsPage.lang === language}
              id={language}
              label={GUI_CONFIG.language.user.languages[language]}
              value=""
              onChange={onChangeLanguage(props.stores, language)}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default observer(LanguageSelector);
