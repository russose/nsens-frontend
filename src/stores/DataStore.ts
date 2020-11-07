import { observable, action, computed, makeObservable } from "mobx";
import {
  IAtom,
  AtomID,
  IUser,
  IKnowbook,
  IGraph,
  ILink,
  INode,
  LogActionType,
  newAtom,
  KnowbookID,
} from "../common/types";
import {
  _save,
  _unsave,
  _log,
  _addItemInKnowbook,
  _addKnowbook,
  _removeItemFromKnowbook,
  _randomFromWeb,
  _searchFromWeb,
  _getRelatedFromWeb,
  _getItemsFromTitlesFromWeb,
  _saveRelated,
  _getRelated,
  _renameKnowbook,
  _removeKnowbook,
} from "../_api";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
} from "d3-force";

export class DataStore {
  private $user: IUser | null = null; //when username="", it means the user is not logged!
  private $feed = observable.map<AtomID, IAtom>();
  private $saved = observable.map<AtomID, IAtom>();
  private $knowbooks = observable.map<KnowbookID, IKnowbook>();

  private $graph: IGraph = { nodes: [], links: [] };

  constructor() {
    makeObservable<DataStore, "$user" | "$graph">(this, {
      $user: observable,
      $graph: observable,
      setGraph: action,
      graph: computed,
      updateGraphItem: action,
      isLogged: computed,
      setUser: action,
      setFeed: action,
      setSaved: action,
      clearSaved: action,
      // knowbooks: computed,
      setKnowbooks: action,
      clearKnowbooks: action,
      setFeedFromRandom: action,
      setFeedFromSearch: action,
      addSaved: action,
      removeSaved: action,
      addItemInKnowbook: action,
      removeItemFromKnowbook: action,
      renameKnowbook: action,
      deleteKnowbook: action,
    });
  }

  get graph() {
    return this.$graph;
  }
  setGraph(graph: IGraph): void {
    if (graph === undefined) {
      return;
    }
    this.$graph = graph;
  }

  updateGraphItem(
    itemID: AtomID,
    title: string,
    width: number,
    height: number
  ): void {
    const width_node = 100;
    const forceManyStrength = -50;
    const forceColiideRadius = width_node;
    const forceLinkDistance = width_node * 1;
    const forceLinkIterations = 5;
    const forceAlphaMin = 0.001;
    const forceAlphaDecay = 0.1;

    this.getGraphDataItem(itemID, title)
      // _getRelated(itemID)
      .then(
        action((items: IAtom[]) => {
          if (items === undefined) {
            return;
          }
          const graph = this.buildGraphItem(items);
          this.setGraph(graph);

          const nodes = graph.nodes;
          const links = graph.links;

          let self = this;
          const simulation = forceSimulation(nodes)
            .force("center", forceCenter(width / 2, height / 2))
            .force("collision", forceCollide().radius(forceColiideRadius))
            .force("charge", forceManyBody().strength(forceManyStrength))
            .force(
              "link",
              forceLink(links)
                .distance(forceLinkDistance)
                // .strength(1)
                .iterations(forceLinkIterations)
            )
            .on("tick", function () {
              self.setGraph({ nodes: nodes, links: links });
            })
            .alphaMin(forceAlphaMin) //To converge quickly, default is 0.001
            .alphaDecay(forceAlphaDecay);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  buildGraphItem(items: IAtom[]): IGraph {
    const graph_map = new Map<string, INode[]>();
    const items_INode: INode[] = items.map((item) => {
      return {
        x: 0,
        y: 0,
        ...item,
      };
    });
    const node_root = items_INode[0];
    items_INode.shift(); //remove node_root from items_INode

    items_INode.forEach((node) => {
      const key = node.related;

      if (!graph_map.has(key)) {
        graph_map.set(key, [node]);
      } else {
        const nodes_list: INode[] = graph_map.get(key);
        nodes_list.push(node);
        graph_map.set(key, nodes_list);
      }
    });
    const nodes: INode[] = [node_root];
    const links: ILink[] = [];

    // const cluster_amount = Array.from(graph_map.keys()).length
    // let pos_cluster = 0;
    // const ecart = 200;
    // const initial_cluster_position = Array.from({length: cluster_amount}, (x, i) => ecart * i);

    graph_map.forEach((nodes_list_prop, key) => {
      //NodeGroup Element
      // pos_cluster = pos_cluster + ecart;
      const node_prop: INode = {
        x: 0,
        y: 0,
        ...newAtom(key),
      };
      node_prop["title"] = key.split("|")[1];
      node_prop["related"] = "prop";

      if (nodes_list_prop.length > 1) {
        // if (true) {
        nodes.push(node_prop);
        links.push({
          source: nodes[0],
          target: node_prop,
        });

        nodes_list_prop.forEach((node) => {
          nodes.push(node);
          links.push({
            source: node_prop,
            target: node,
          });
        });
      } else {
        const node = nodes_list_prop[0];
        nodes.push(node);
        links.push({
          source: nodes[0],
          target: node,
        });
      }
    });
    return { nodes: nodes, links: links };
  }

  //Important: graph[0] doiut toujours avoir le RootItem!
  async getGraphDataItem(itemID: AtomID, title: string): Promise<IAtom[]> {
    const items_all = await _getRelatedFromWeb(itemID);
    const items = items_all.filter((item) => {
      const filter =
        !item.title_en.includes("Category:") && !item.title_en.includes("Wiki");
      return filter;
    });

    const rootItemList: IAtom[] = await _getItemsFromTitlesFromWeb(title);
    const rootItem = rootItemList[0];

    if (rootItem !== undefined) {
      //add root at the beginning
      items.unshift(rootItem);
    } else {
      console.log("graph broken!");
    }

    return items;
  }

  /**
   * User
   */
  get isLogged(): boolean {
    if (this.user === undefined || this.user === null) {
      return false;
    }
    if (this.user.username === "") {
      return false;
    } else {
      return true;
    }
  }

  get user() {
    return this.$user;
  }
  setUser(user: IUser): void {
    this.$user = user;
  }
  /**
   * Feed
   */
  get feed() {
    return this.$feed;
  }
  getFeedList(): IAtom[] {
    return Array.from(this.feed.values());
  }
  setFeed(feed: IAtom[]): void {
    if (feed === undefined) {
      return;
    }
    this.$feed.clear();
    feed.forEach((item) => this.$feed.set(item.id, item));
  }
  /**
   * Saved
   */
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
  /**
   * Knowbook
   */
  get knowbooks() {
    return this.$knowbooks;
  }
  setKnowbooks(knowbooks: IKnowbook[]): void {
    knowbooks.forEach((item) => {
      this.$knowbooks.set(item.name, item);
    });
  }
  clearKnowbooks(): void {
    this.$knowbooks.clear();
  }

  /*****************FEED**************************** */

  setFeedFromRandom(): void {
    _randomFromWeb()
      .then((atoms) => {
        this.setFeed(atoms);
      })
      .catch((error) => {
        // console.log("error in find random");
        // console.log(error);
      });
  }
  setFeedFromRelated(): void {
    _getRelated("all")
      .then((atoms) => {
        if (atoms.length === 0) {
          this.setFeedFromRandom();
        } else {
          this.setFeed(atoms);
        }
      })
      .catch((error) => {
        // console.log("error in find random");
        // console.log(error);
      });
  }
  setFeedFromSearch(searchPattern: string): void {
    if (searchPattern === undefined) {
      return;
    }

    _searchFromWeb(searchPattern)
      .then((atoms) => {
        this.setFeed(atoms);
      })
      .then(() => {
        if (this.isLogged) {
          _log(LogActionType.search, searchPattern);
        }
      })
      .catch((error) => {
        // console.log("error in seach from pattern");
      });
  }

  /******************SAVED************************** */

  addSaved(itemId: AtomID): void {
    if (itemId === undefined || !this.isLogged) {
      return;
    }
    //Items in feed items
    if (this.$feed.has(itemId)) {
      const atom = this.$feed.get(itemId);
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
      const item_from_graph_with_id_list: IAtom[] = this.graph.nodes.filter(
        (item) => {
          return item.id === itemId;
        }
      );
      if (
        item_from_graph_with_id_list !== undefined &&
        item_from_graph_with_id_list.length === 1
      ) {
        const atom: IAtom = item_from_graph_with_id_list[0];
        _save(atom)
          .then(
            action(() => {
              this.$saved.set(atom.id, atom);
              console.log(atom);
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
    _saveRelated(itemId)
      .then(() => {})
      .catch(() => {
        console.log("impossible to store related items");
      });
  }

  removeSaved(itemId: AtomID): void {
    if (itemId === undefined || !this.isLogged) {
      return;
    }

    if (!this.IsItemInAnyKnowbook(itemId)) {
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

  /*******************KNOWBOOKS*************************** */

  renameKnowbook(name: KnowbookID, new_name: KnowbookID) {
    if (!this.$knowbooks.has(name) || this.$knowbooks.has(new_name)) {
      return;
    }

    _renameKnowbook(name, new_name)
      .then(
        action(() => {
          const knowbooks_list: IKnowbook[] = [];
          this.$knowbooks.forEach((knowbook, key_name) => {
            if (key_name !== name) {
              knowbooks_list.push(knowbook);
            } else {
              const knowbook_with_new_name = knowbook;
              knowbook_with_new_name.name = new_name;
              knowbooks_list.push(knowbook_with_new_name);
            }
          });
          this.clearKnowbooks();
          this.setKnowbooks(knowbooks_list);
        })
      )
      .catch((error) => {
        // console.log("error in renaming knowbook");
      });
  }

  deleteKnowbook(name: KnowbookID) {
    if (!this.knowbooks.has(name)) {
      return;
    }
    if (this.getKnowbookAtomsList(name).length !== 0) {
      return;
    }
    _removeKnowbook(name)
      .then(
        action(() => {
          this.knowbooks.delete(name);
        })
      )
      .catch((error) => {
        // console.log("error in removing knowbook");
      });
  }

  //if the knowbook doesn't extist, create it
  addItemInKnowbook(knowbookID: KnowbookID, atomId: AtomID) {
    if (knowbookID === undefined || atomId === undefined) {
      // console.log("undefined values");
      return;
    }
    //We do not check that atomId is in saved since it is blocked by the UI and the back check it by construction
    if (this.knowbooks.has(knowbookID)) {
      let knowbook_updated = this.knowbooks.get(knowbookID);
      if (knowbook_updated !== undefined) {
        if (knowbook_updated.items.includes(atomId)) {
          return;
        }
        // const knowbook_backup: IKnowbook = knowbook_updated;
        knowbook_updated.items.push(atomId);
        // this.knowbooks.set(knowbookID, knowbook_updated);

        _addItemInKnowbook(knowbookID, atomId)
          .then(
            action(() => {
              if (knowbook_updated !== undefined) {
                this.knowbooks.set(knowbookID, knowbook_updated);
                // console.log("item added in knowbook successfully");
                // return;
              }
            })
          )
          .catch((error) => {
            // this.knowbooks.set(knowbookID, knowbook_backup);
            console.log("error in adding item in knowbook");
            // return;
          });
      }
    } else {
      const newKnowbook: IKnowbook = {
        id: -1, //id not used in front but only in back
        name: knowbookID,
        items: [atomId],
      };
      // this.knowbooks.set(knowbookID, newKnowbook);
      _addKnowbook(knowbookID)
        .then(() => {
          _addItemInKnowbook(knowbookID, atomId)
            .then(
              action(() => {
                this.knowbooks.set(knowbookID, newKnowbook);
                // console.log(
                //   "knowbook created, item added in knowbook successfully"
                // );
                return;
              })
            )
            .catch(() => {
              console.log("error in adding item in knowbook");
            });
        })
        .catch(() => {
          // this.knowbooks.delete(knowbookID);
          console.log("error in creating knowbook");
          return;
        });
    }
  }

  //Update both Knowbooks and saved (tags)
  removeItemFromKnowbook(knowbookID: KnowbookID, atomId: AtomID) {
    if (knowbookID === undefined || atomId === undefined) {
      console.log("undefined values");
      return;
    }

    if (this.knowbooks.has(knowbookID)) {
      let knowbook_updated = this.knowbooks.get(knowbookID);
      if (knowbook_updated !== undefined) {
        // const knowbook_backup: IKnowbook = knowbook_updated;
        knowbook_updated.items = knowbook_updated.items.filter((itemId) => {
          return itemId !== atomId;
        });
        // this.knowbooks.set(knowbookID, knowbook_updated);

        _removeItemFromKnowbook(knowbookID, atomId)
          .then(
            action(() => {
              if (knowbook_updated !== undefined) {
                this.knowbooks.set(knowbookID, knowbook_updated);
                // console.log("item removed in knowbook successfully");
              }
              return;
            })
          )
          .catch(() => {
            // this.knowbooks.set(knowbookID, knowbook_backup);
            console.log("error in removing item from knowbook");
            return;
          });
      } else {
        console.log("undefined values");
        return;
      }
    } else {
      console.log("impossible to remove from knowbook");
      return;
    }
  }

  getKnowbookAtomsList(knowbookID: KnowbookID): IAtom[] {
    let my_knowbook: IKnowbook | undefined;

    if (this.knowbooks.has(knowbookID)) {
      my_knowbook = this.knowbooks.get(knowbookID);

      return my_knowbook !== undefined
        ? this.getSavedAtomsFromIds(my_knowbook.items)
        : [];
    } else {
      // console.log("impossible to provide Atoms List from knowbook");
      return [];
    }
  }

  isItemInKnowbook(atomId: AtomID, knowbookId: KnowbookID): boolean {
    const knowbook = this.knowbooks.get(knowbookId);
    if (knowbook !== undefined) {
      const knowbookContentId = knowbook.items;
      return knowbookContentId.includes(atomId);
    } else {
      console.log("knowbook doesn't exist");
      return false;
    }
  }

  IsItemInAnyKnowbook(atomId: AtomID): boolean {
    if (atomId === undefined) {
      return false;
    }

    const knowbookIds: KnowbookID[] = Array.from(this.knowbooks.keys());
    for (let knowbookId of knowbookIds) {
      const inside = this.isItemInKnowbook(atomId, knowbookId);
      if (inside) {
        return true;
      }
    }
    return false;
  }

  ItemsInNoKnowbook(): IAtom[] {
    const itemsIdList: AtomID[] = [];

    this.saved.forEach((item) => {
      const knowbookIds: KnowbookID[] = Array.from(this.knowbooks.keys());
      for (let knowbookId of knowbookIds) {
        const inside = this.isItemInKnowbook(item.id, knowbookId);
        if (inside) {
          return;
        }
      }
      itemsIdList.push(item.id);
      return;
    });

    return this.getSavedAtomsFromIds(itemsIdList);
  }
}
