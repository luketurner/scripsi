import * as _ from 'lodash';

import { observable, autorunAsync, runInAction, toJS, action } from 'mobx';

import { PersistenceBackends } from './index';
import { MissingStateError } from './errors';
import { SNode } from '../nodes';
import store from '../store';

export class PersistenceStore {
  @observable isUnsaved = false;
  @observable databaseName = 'scripsi';
  @observable enabledBackends: string[] = ['Local'];
  @observable primaryBackend = 'Local';

  constructor() {
    autorunAsync(async () => {

      if (this.isUnsaved) {
        const key = this.databaseName + '|nodes';

        await Promise.all(_.map(this.enabledBackends, async (backendName) => {
          const backend = PersistenceBackends[backendName];

          if (!backend) {
            console.error('Could not find enabled backend:', backendName);
          }

          console.debug('Saving state to backend:', backendName);
          await backend.saveState(key, toJS(store.nodes));
        }));

        runInAction('persistence.setUnsaved', () => this.isUnsaved = false);
      }
    }, 1000);
  }

  @action('persistence.loadState')
  loadState(newState) {
    store.nodes.rootNode = newState.rootNode;
    store.nodes.viewRootNode = newState.viewRootNode;
    
    store.nodes.index.clear();
    Object.entries(newState.index).forEach(([x, y]) => store.nodes.addNode(new SNode(y)));
  }

  async loadFromBackend() {
    const key = this.databaseName + '|nodes';
    const backend = PersistenceBackends[this.primaryBackend];
    const newState = await backend.loadState(key);
    if (!newState) {
      throw new MissingStateError();
    }
    this.loadState(newState);
  }
}

const persistenceStore = new PersistenceStore();

export default persistenceStore;