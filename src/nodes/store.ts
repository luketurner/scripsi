import { action, computed, observable } from 'mobx';
import { Persistable } from '../persistent-storage/driver';
import { SNode, SNodeOptions } from './node';

export class SNodeStore implements Persistable {
  @observable public rootNode: Uuid;
  @observable public viewRootNode: Uuid;
  @observable public searchQuery: string;
  @observable public index = new Map<Uuid, SNode>();

  @computed public get currentState() {
    return JSON.stringify(this);
  }

  @action('nodeStore.setSearchQuery')
  public setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  @action('nodeStore.addNode')
  public addNode(node: SNode): SNode {
    this.index.set(node.id, node);
    return node;
  }

  @action('nodeStore.addNode')
  public removeNode(node: SNode): SNode {
    this.index.delete(node.id);
    return node;
  }

  public getNode(id: Uuid): SNode {
    const node = this.index.get(id);
    if (!node) throw new Error('Could not find node with id: ' + id);
    return node;
  }

  public loadState(newState: string) {
    const state = JSON.parse(newState);
    this.rootNode = state.rootNode;
    this.viewRootNode = state.viewRootNode;

    this.index.clear();
    for (const node of Object.values(state.index)) {
      this.addNode(new SNode(node));
    }
  }
}
