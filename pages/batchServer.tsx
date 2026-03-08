import { GetStaticProps } from "next/types";
import React from "react";
import { AtomID, IKnowbook } from "../src/config/types";
import { api_getUser } from "../src/libs/apiUser";
import {
  api_addItemInKnowbook,
  api_addKnowbook,
  api_getKnowbooksList,
  api_removeItemFromKnowbook,
  api_save,
  api_unsave,
  api_updateKnowbook,
} from "../src/libs/apiUserData";
import { IPageBatch, I_getStaticProps } from "../src/libs/getDataBatchServer";

export async function prepareActions(props: IPageBatch): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  const user = await api_getUser();

  if (user === undefined) {
    console.error("You have to login first");
  } else {
    console.log(
      "You are logged for the user:",
      user.email,
      " - username:",
      user.username
    );

    if (props.knowbooks.length === 0) {
      console.log("your are going to do nothing");
      return;
    }

    // console.log("your are going to do the following actions:");
    props.knowbooks.forEach((knowbookFull) => {
      console.log(
        "Create knowbook:",
        knowbookFull.name,
        "in",
        knowbookFull.language,
        "with",
        knowbookFull.items.length,
        "items"
      );
    });
  }
}

let toPrepareActions = true;

export async function performActions(props: IPageBatch): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  if (props.knowbooks.length === 0) {
    console.log("Nothing is done");
    return;
  }

  for (const knowbook of props.knowbooks) {
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

      console.log("content removed!");
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
      // public: true,
    });
    console.log(
      "knowbook created with its content:",
      knowbook.name,
      knowbook.language
    );
  }
  console.log("Batch completed.");
}

const BatchServer: React.FunctionComponent<IPageBatch> = (props) => {
  if (toPrepareActions) {
    prepareActions(props);
    toPrepareActions = false;
  }

  return (
    <>
      <br /> <br />
      Batch Mode. See console to see which actions will be done...
      <br /> <br /> <br />
      <button
        onClick={() => {
          performActions(props);
        }}
      >
        Process...
      </button>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
// export const getStaticPaths: GetStaticPaths = async (context) => {
//   return await I_getStaticPaths(context);
// };

export default BatchServer;
