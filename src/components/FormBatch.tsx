import { Box, Button, Switch, Text, TextArea } from "gestalt";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { IPublicKnowbookDefinition } from "../config/configStaticKnowbooks";
import {
  AtomID,
  IAtom,
  IKnowbook,
  IKnowbookFull,
  TSource,
  Tlanguage,
  eventT,
} from "../config/globals";
import {
  api_addItemInKnowbook,
  api_addKnowbook,
  api_getKnowbooksList,
  api_getSavedList,
  api_removeItemFromKnowbook,
  api_save,
  api_unsave,
  api_updateKnowbook,
} from "../libs/apiUserData";
import { fetchOneKnowbookFromDefinitions } from "../libs/getDataBatch";
import { IStores } from "../stores/RootStore";
import { api_getCleanImageFromWeb_blocking } from "../libs/apiItems";

interface IProps {
  stores: IStores;
}

async function fetchKnowbooksFromDefinitions(
  knowbookDefinitions: IPublicKnowbookDefinition[]
): Promise<IKnowbookFull[]> {
  let outputKnowbooks: IKnowbookFull[] = [];
  console.log("Knowbooks definitions:", knowbookDefinitions);

  for (const definition of knowbookDefinitions) {
    const knowbook: IKnowbookFull = await fetchOneKnowbookFromDefinitions(
      definition
    );

    if (knowbook !== undefined) {
      console.log(
        "FETCHED =>",
        "Knowbook:",
        knowbook.name,
        "in",
        knowbook.language,
        "with",
        knowbook.items.length,
        "items"
      );

      outputKnowbooks = outputKnowbooks.concat(knowbook);
    } else {
      // console.log(
      //   "error in fetching knowbook from definition for:",
      //   definition
      // );
    }
  }

  return outputKnowbooks;
}

async function createKnowbooksFromDefinitions(
  knowbooks: IKnowbookFull[],
  isPublic: boolean
): Promise<void> {
  if (knowbooks.length === 0) {
    console.log("Nothing is done");
    return;
  }

  for (const knowbook of knowbooks) {
    const knowbookID = await api_addKnowbook(knowbook.name, knowbook.language);
    console.log(knowbook.name, "created");

    if (knowbookID === undefined) {
      console.log(knowbook.name, "already exists, remove its content first...");

      const knowbooks_all: IKnowbook[] = await api_getKnowbooksList(
        knowbook.language
      );
      const items: AtomID[] = knowbooks_all.filter((kb) => {
        return kb.name === knowbook.name;
      })[0].items;
      console.log("Following items to be removed:", items);

      for (const atomId of items) {
        const knowbook_ = await api_removeItemFromKnowbook(
          knowbook.name,
          atomId,
          knowbook.language
        );
        if (knowbook_ === undefined) {
          console.error("error in removing item:", atomId);
        }

        const item_ = await api_unsave(atomId, knowbook.language);

        if (item_ === undefined) {
          console.log(
            atomId,
            "not unsaved since already used in another knowbook"
          );
        }
      }

      console.log("items removed!");
    }

    for (const item of knowbook.items) {
      const item_ = await api_save(item);
      const kb_ = await api_addItemInKnowbook(
        knowbook.name,
        item.id,
        knowbook.language
      );
    }

    const kb = await api_updateKnowbook(knowbook.name, knowbook.language, {
      image_url: knowbook.items[0].image_url,
      public: isPublic,
    });
    console.log(
      "knowbook created with its content:",
      knowbook.name,
      knowbook.language
    );
  }
  console.log("Batch treatment completed.");
}

async function refreshImagesAllSaved(): Promise<void> {
  console.log("Refreshing images...");

  const lang_list: Tlanguage[] = Object.values(Tlanguage);
  for (const lang of lang_list) {
    api_getSavedList(lang).then((items) => {
      // for (const item of items) {

      api_getCleanImageFromWeb_blocking(items, lang).then(
        (items_with_good_images: IAtom[]) => {
          const items_with_good_images_wiki = items_with_good_images.filter(
            (item) => {
              return item.source === TSource.wiki;
            }
          );

          const items_with_good_images_Map = new Map<AtomID, IAtom>();
          for (const item_with_good_image of items_with_good_images_wiki) {
            items_with_good_images_Map.set(
              item_with_good_image.id,
              item_with_good_image
            );
          }

          for (const item_original of items) {
            if (
              item_original.image_url !==
              items_with_good_images_Map.get(item_original.id).image_url
            ) {
              console.log("###############################################");
              console.log("original:", item_original.title);
              console.log("new:", item_original.image_url);
              console.log(
                items_with_good_images_Map.get(item_original.id).image_url
              );

              if (true) {
                api_save(items_with_good_images_Map.get(item_original.id));
              }
            }
          }
          console.log("Completed for all items in:", lang);
        }
      );

      // }
    });
  }
}

function safeParseJSON(input: string): object {
  try {
    const result = JSON.parse(input);
    return result;
  } catch {
    // console.log("error in parsing...");
    return undefined;
  }
}

const FormBatch: React.FunctionComponent<IProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const size_button = GUI_CONFIG.display.size_button_generic as any;
  const button_color = "gray";

  const [definition, setDefinition] = useState("");
  const [knowbooks, setKnowbooks] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const onChangeDefinition = (input: {
    value: string;
    syntheticEvent: eventT;
  }): void => {
    setDefinition(input.value);
  };

  const onChangePublic = (input: {
    value: string;
    syntheticEvent: eventT;
  }): void => {
    setIsPublic(input.value as any);
  };

  return (
    <Box padding={0}>
      <Box padding={2}></Box>

      <Box padding={1} display="flex" direction="row" justifyContent="around">
        <Text weight="bold">isPublic ? :</Text>
        <Box paddingX={1}>
          <Switch
            switched={isPublic}
            onChange={onChangePublic as any}
            id="switchIsPublic"
          />
        </Box>

        <Box paddingX={1}>
          <Button
            accessibilityLabel="Prepare Knowbooks Definition"
            text={"1 - Prepare Knowbooks Definition"}
            onClick={() => {
              fetchKnowbooksFromDefinitions(
                safeParseJSON(definition) as IPublicKnowbookDefinition[]
              ).then((fetchedKnowbooks: IKnowbookFull[]) => {
                setKnowbooks(JSON.stringify(fetchedKnowbooks));
              });
            }}
            // onClick={props.handler_button_prepar}
            // size={size_button}
            color={button_color}
            fullWidth
          />
        </Box>
        <Box paddingX={1}>
          <Button
            accessibilityLabel="Perform Knowbooks Definition"
            text={"2 - Perform Knowbooks Definition"}
            size={size_button}
            onClick={() => {
              createKnowbooksFromDefinitions(
                safeParseJSON(knowbooks) as IKnowbookFull[],
                isPublic
              );
            }}
            // onClick={props.handler_button}
            color={button_color}
            fullWidth
          />
        </Box>

        <Box paddingX={1}>
          <Button
            accessibilityLabel="Refresh Images"
            text={"Refresh Images"}
            size={size_button}
            onClick={() => {
              refreshImagesAllSaved();
            }}
            color={button_color}
            fullWidth
          />
        </Box>
      </Box>

      <Box padding={2}></Box>

      <Box padding={2}>
        <TextArea
          id={"batch"}
          label={"Knowbooks definition"}
          placeholder='Format should be [{"name": "tbc","language": "fr","items_name": ["item1","item2"]}, {},etc...]'
          value={definition}
          onChange={onChangeDefinition as any}
          rows={20}
        />
      </Box>

      <Box padding={2}>
        <Text weight="bold">Output:</Text>
        <Box padding={1}></Box>
        <Text weight="normal">See console...</Text>
      </Box>
    </Box>
  );
};

export default observer(FormBatch);
