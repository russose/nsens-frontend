import { AtomID } from "../config/globals";
import { IStores } from "../stores/_RootStore";
import { isItemInKnowbook } from "./helpersKnowbooks";

export function initKnowbookEditionElements(
  atomID: AtomID,
  stores: IStores
): void {
  stores.uiStore.setEditKnowbookNewValue("");
  stores.uiStore.editKnowbookMembers.clear();

  const knowbook_id_list = Array.from(stores.knowbookStore.knowbooks.keys());
  knowbook_id_list.forEach((knowbookId) => {
    stores.uiStore.editKnowbookMembers.set(
      knowbookId,
      isItemInKnowbook(atomID, knowbookId, stores)
    );
  });
}
