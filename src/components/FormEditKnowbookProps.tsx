import { Box, Button, SelectList, TextArea, TextField } from "gestalt";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  KnowbookID,
  SizeT,
  TSource,
  configGeneral,
  eventT,
  handlerT,
} from "../config/globals";
import { getAndStoreOneKnowbookFull } from "../libs/helpersSavedKnowbooks";
import { IStores } from "../stores/RootStore";
import CardKnow from "./CardKnow";
import DialogPanel from "./DialogPanel";
import { buttons_Knowbook_Card } from "./_buttons_definition";

interface IProps {
  id: KnowbookID;
  stores: IStores;
  handler_confirm: handlerT;
  handler_delete: handlerT;
}

const FormEditKnowbookProps: React.FunctionComponent<IProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.field_text_size;

  const labels_root =
    props.stores.baseStore.GUI_CONFIG.language.editKnowbookProps;

  const size_button = props.stores.baseStore.GUI_CONFIG.display
    .size_button_generic as any;

  const button_color = configGeneral.colors.button_color_default as any;

  const size_select_list = "md";

  const knowbook = props.stores.knowbookStore.getKnowbookFromId(
    props.id,
    true,
    false
  );

  useEffect(() => {
    if (
      props.stores.baseStore.getHistoryItems(knowbook.items).length !==
        knowbook.items.length ||
      knowbook.items.length === 0
    ) {
      // getAndStoreOnePrivateKnowbookFull(props.stores, knowbook);
      getAndStoreOneKnowbookFull(props.stores, props.id);
    }
  }, []);

  let imageInit;
  if (knowbook.items.length === 0) {
    imageInit = "";
  }
  // else if (knowbook.items.length === 1) {
  //   const item = props.stores.baseStore.getHistoryItem(knowbook.items[0]);
  //   if (item !== undefined) {
  //     imageInit = item.image_url;
  //   } else {
  //     imageInit = "";
  //   }
  // }
  else {
    imageInit = knowbook.image_url;
  }

  const [name, setName] = useState(knowbook.name);
  const [description, setDescription] = useState(knowbook.description);
  const [source, SetSource] = useState(knowbook.sourceUrl);
  const [imageUrl, setImageUrl] = useState(imageInit);
  const [isPublic, setIsPublic] = useState(knowbook.public.toString());
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);

  const imageListForSelect = props.stores.baseStore
    .getHistoryItems(knowbook.items)
    .filter((item) => {
      return item.source !== TSource.arxiv;
    })
    .map((item) => {
      // if (item.source !== TSource.arxiv) {
      return { label: item.title, value: item.image_url };
      // }
      // else {
      //   return { label: TSource.arxiv, value: "" };
      // }
    });

  const shareListForSelect = [
    { label: labels_root.shareLabelPublic, value: "true" },
    { label: labels_root.shareLabelPrivate, value: "false" },
  ];

  const onChangeName = (input: {
    value: string;
    syntheticEvent: eventT;
  }): void => {
    setName(input.value);
  };

  const onChangeDescription = (input: {
    value: string;
    syntheticEvent: eventT;
  }): void => {
    setDescription(input.value);
  };

  const onChangeSource = (input: {
    value: string;
    syntheticEvent: eventT;
  }): void => {
    SetSource(input.value);
  };

  const onChangeImage = (input: {
    value: string;
    syntheticEvent: eventT;
  }): void => {
    setImageUrl(input.value);
    props.stores.knowbookStore.setImage(knowbook.id, input.value);
  };

  const onChangePublic = (input: {
    value: string;
    syntheticEvent: eventT;
  }): void => {
    setIsPublic(input.value);
  };

  // const showDeletion: boolean = knowbook.items.length === 0;

  const noItems = knowbook.items.length === 0;

  return (
    <DialogPanel
      stores={props.stores}
      heading={labels_root.heading}
      onDismiss={props.handler_confirm(
        props.id,
        name,
        description,
        source,
        imageUrl,
        isPublic
      )}
    >
      <Box padding={0}>
        <Box
          padding={0}
          display="flex"
          direction="row"
          flex="grow"
          justifyContent="center"
        >
          <Box alignItems="center">
            <CardKnow
              id={props.id.toString()}
              stores={props.stores}
              knowbook={knowbook}
              // title={name}
              // image_url={imageUrl}
              color_image={undefined}
              image_handler={undefined}
              // amount={undefined}
              buttons={buttons_Knowbook_Card(props.stores, knowbook)}
              // nb_saved={knowbook.nb_saved}
              // public={knowbook.public}
            />
          </Box>
        </Box>

        <Box padding={0}></Box>

        <Box padding={2}>
          <SelectList
            id={labels_root.imageLabel}
            label={labels_root.imageLabel}
            value={imageUrl}
            // helperText="helperText"
            onChange={onChangeImage as any}
            size={size_select_list}
          >
            {imageListForSelect.map(({ label, value }) => (
              <SelectList.Option key={label} label={label} value={value} />
            ))}
          </SelectList>
        </Box>

        <Box padding={2}>
          <TextField
            id={props.id.toString()}
            label={labels_root.nameLabel}
            value={name}
            onChange={onChangeName as any}
            type="text"
            autoComplete="off"
            size={texfield_size}
            maxLength={{
              characterCount: configGeneral.maxLengthKnowbookName,
              errorAccessibilityLabel: "text too long",
            }}
          />
        </Box>

        <Box padding={2}>
          <TextField
            id={props.id.toString()}
            label={labels_root.nameSource + " (url starting with https://)"}
            value={source.length === 0 ? "https://" : source}
            onChange={onChangeSource as any}
            type="url"
            autoComplete="off"
            size={texfield_size}
          />
        </Box>

        <Box padding={2}>
          <TextArea
            id={props.id.toString()}
            label={labels_root.descriptionLabel}
            value={description}
            onChange={onChangeDescription as any}
            rows={2}
            maxLength={{
              characterCount: configGeneral.maxLengthKnowbookDescription,
              errorAccessibilityLabel: "text too too long",
            }}
            // size={texfield_size}
          />
        </Box>

        <Box padding={2}>
          <SelectList
            id={labels_root.shareLabelTitle}
            label={labels_root.shareLabelTitle}
            value={isPublic}
            onChange={onChangePublic as any}
            size={size_select_list}
          >
            {shareListForSelect.map(({ label, value }) => (
              <SelectList.Option key={label} label={label} value={value} />
            ))}
          </SelectList>
        </Box>

        {
          <>
            <Box padding={8}></Box>
            <Box
              display="flex"
              direction="row"
              flex="grow"
              justifyContent="center"
            >
              <Box alignItems="center" width={"50%"}>
                <Button
                  accessibilityLabel={labels_root.deletionLabel}
                  text={
                    !deletionConfirmed
                      ? labels_root.deletionLabel
                      : labels_root.deletionLabelConfirmation
                  }
                  size={size_button}
                  onClick={() => {
                    if (deletionConfirmed === false) {
                      setDeletionConfirmed(true);
                    }
                    if (noItems || deletionConfirmed === true) {
                      setDeletionConfirmed(false);
                      props.handler_delete();
                    }
                  }}
                  color={button_color}
                  fullWidth
                />
              </Box>
            </Box>
          </>
        }
      </Box>
    </DialogPanel>
  );
};

export default observer(FormEditKnowbookProps);
