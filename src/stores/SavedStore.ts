import { KnowkookStore } from "./KnowkookStore";
import { GraphStore } from "./GraphStore";
import { observable, action, makeObservable } from "mobx";
import { IAtom, AtomID } from "../common/types";
import { _save, _unsave, _saveRelated } from "../_api";
import { FeedStore } from "./FeedStore";

export class SavedStore {
  private $saved = observable.map<AtomID, IAtom>();

  constructor() {
    makeObservable<SavedStore>(this, {
      setSaved: action,
      clearSaved: action,
      addSaved: action,
      removeSaved: action,
    });
  }

  get saved() {
    return this.$saved;
  }
  getSavedList(): IAtom[] {
    return Array.from(this.saved.values());
  }
  setSaved(atoms: IAtom[]): void {
    atoms.forEach((item) => this.$saved.set(item.id, item));
  }
  clearSaved(): void {
    this.$saved.clear();
  }

  addSaved(itemId: AtomID, graphStore: GraphStore, feedStore: FeedStore): void {
    let title: string;

    // if (itemId === undefined || !this.isLogged) {
    if (itemId === undefined) {
      return;
    }
    //Items in feed items
    if (feedStore.feed.has(itemId)) {
      const atom = feedStore.feed.get(itemId);
      title = atom.title;
      if (atom !== undefined) {
        _save(atom)
          .then(
            action(() => {
              this.$saved.set(atom.id, atom);
              // console.log("saved successfully");
            })
          )
          .catch(() => {
            // this.$saved.delete(itemId);
            console.log("network error, error in saved");
          });
      } else {
        // console.log("impossible to save");
        return;
      }
    }
    //Items in graph items
    else {
      const graph = graphStore.graph;
      // const item_from_graph_with_id_list: IAtom[] = this.graph.nodes.filter(
      const item_from_graph_with_id_list: IAtom[] = graph.nodes.filter(
        (item) => {
          return item.id === itemId;
        }
      );
      if (
        item_from_graph_with_id_list !== undefined &&
        item_from_graph_with_id_list.length === 1
      ) {
        const atom: IAtom = item_from_graph_with_id_list[0];
        title = atom.title;
        _save(atom)
          .then(
            action(() => {
              this.$saved.set(atom.id, atom);
              // console.log("saved successfully");
            })
          )
          .catch(() => {
            // this.$saved.delete(itemId);
            // console.log("network error, error in saved");
          });
      } else {
        // console.log("impossible to save");
        return;
      }
    }

    //Store related items
    _saveRelated(itemId, title)
      .then(() => {})
      .catch(() => {
        console.log("impossible to store related items");
      });
  }

  removeSaved(itemId: AtomID, knowbookStore: KnowkookStore): void {
    // if (itemId === undefined || !this.isLogged) {
    if (itemId === undefined) {
      return;
    }

    if (!knowbookStore.IsItemInAnyKnowbook(itemId)) {
      // const atom_backup: IAtom | undefined = this.$saved.get(itemId);
      // if (atom_backup === undefined) {
      //   return;
      // }
      // this.$saved.delete(itemId);
      _unsave(itemId)
        .then(
          action(() => {
            this.$saved.delete(itemId);
            // console.log("unsaved successfully");
          })
        )
        .catch(() => {
          // this.$saved.set(itemId, atom_backup);
          console.log("network error, error in unsaved");
        });
    } else {
      console.log("impossible to unsave: Atoms present in Custom Knowbooks");
    }
  }

  getSavedAtomsFromIds(list_atoms: AtomID[]): IAtom[] {
    if (list_atoms === undefined || list_atoms.length === 0) {
      return [];
    }

    const result = list_atoms.map((id) => {
      if (this.$saved.has(id)) {
        return this.$saved.get(id);
      } else {
        return undefined;
      }
    });
    const result_no_undefined = result.filter((item) => {
      return item !== undefined;
    }) as IAtom[];

    return result_no_undefined;
  }
}
