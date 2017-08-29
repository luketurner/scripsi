import { observable, action } from 'mobx';
import { SNode } from './node';

export class SNodeStore {
  @observable rootNode: SNode;
  @observable searchQuery: string;

  @action('uiState.setSearchQuery')
  setSearchQuery(query: string) {
    this.searchQuery = query;
  }
}

const store = new SNodeStore();

store.rootNode = new SNode({
  content: '{"entityMap":{},"blocks":[{"key":"50fo4","text":"Welcome to Scripsi. Press Enter to create a new node and start typing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
});

export default store;