import { observable, action } from 'mobx';
import { SNode, SNodeOptions } from './node';

export class SNodeStore {
  @observable rootNode: Uuid;
  @observable viewRootNode: Uuid;
  @observable searchQuery: string;
  @observable index = new Map<Uuid, SNode>();

  @action('nodeStore.setSearchQuery')
  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  @action('nodeStore.addNode')
  addNode(node: SNode): SNode {
    this.index.set(node.id, node);
    return node;
  }

  @action('nodeStore.addNode')
  removeNode(node: SNode): SNode {
    this.index.delete(node.id);
    return node;
  }

  getNode(id: Uuid): SNode {
    const node = this.index.get(id);
    if (!node) throw new Error('Could not find node with id: ' + id);
    return node;
  }
}



const store = new SNodeStore();
export default store;