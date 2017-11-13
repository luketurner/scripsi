import { action, observable } from 'mobx';
import { SNode, SNodeOptions } from './node';

export class SNodeStore {
  @observable public rootNode: Uuid;
  @observable public viewRootNode: Uuid;
  @observable public searchQuery: string;
  @observable public index = new Map<Uuid, SNode>();

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
}

const store = new SNodeStore();
export default store;
