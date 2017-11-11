import * as _ from 'lodash';

import { observable, autorunAsync, runInAction, toJS, action } from 'mobx';

import { Backend } from './backends';
import { MissingStateError, InvalidPersistenceOperation } from './errors';
import { SNode } from '../nodes';
import store from '../store';

import * as backends from './backends';

export class PersistenceStore {
  @observable databaseName = 'scripsi';
  @observable backends: Map<string, Backend>;
  @observable lastUpdate: number;

  constructor() {
    this.backends = new Map();

    const defaultLocalBackend = new backends.LocalBackend();
    defaultLocalBackend.isPrimary = true;
    defaultLocalBackend.isEnabled = true;

    this.addBackend(defaultLocalBackend);
    this.addBackend(new backends.DropboxBackend());

    autorunAsync(async () => {
      const state = toJS(store.nodes);
      const lastUpdate = this.lastUpdate;
      await Promise.all(_.map(this.backends.values(), backend => this.saveToBackend(backend, lastUpdate, state)));
    }, 1000);
  }

  private async saveToBackend(backend, lastUpdate, state) {

    const key = this.databaseName + '|nodes';

    if (!backend.isEnabled) {
      return;
    }

    if (backend.lastUpdate > lastUpdate) {
      // In the future, this may indicate that the backend has changes from another client.
      return console.error(`Unable to save to backend: ${backend.name}. May overwrite changes from another client. (${backend.lastUpdate} -> ${this.lastUpdate})`);          
    }

    if (backend.lastUpdate < lastUpdate) {
      try {
        console.debug(`Saving state to backend: ${backend.name} (${backend.lastUpdate} -> ${this.lastUpdate})`, state);
        await backend.save(key, state);
        backend.lastUpdate = lastUpdate;
      } catch (err) {
        console.error(`Unable to save to backend: ${backend.name}. ${err}. (${backend.lastUpdate} -> ${this.lastUpdate})`);
      }
    }
  }

  @action('persistence.addBackend')
  addBackend(backend: Backend) {
    this.backends.set(backend.name, backend);
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
    const backend = this.getPrimaryBackend();
    const newState = await backend.load(key);
    if (!newState) {
      throw new MissingStateError();
    }
    this.loadState(newState);
  }

  // @action('persistence.invalidateBackend')
  // invalidateBackend(backendName: string): Backend {
  //   const backend = this.backends.get(backendName);

  //   if (!backend) {
  //     throw new InvalidPersistenceOperation(`Cannot invalidate unknown backend: ${backendName}`);
  //   }

  //   if (!backend.isEnabled) {
  //     throw new InvalidPersistenceOperation(`Cannot invalidate disabled backend: ${backendName}`);
  //   }

  //   backend.isOutdated = true;
  //   return backend;
  // }

  @action('persistence.enableBackend')
  enableBackend(backendName: string): Backend {
    const backend = this.backends.get(backendName);

    if (!backend) {
      throw new InvalidPersistenceOperation(`Cannot enable unknown backend: ${backendName}`);
    }

    if (backend.isEnabled) {
      throw new InvalidPersistenceOperation(`Backend is already enabled: ${backendName}`);
    }

    console.debug(`Enabling persistence backend: ${backendName} (primary=${backend.isPrimary})`);
    backend.isEnabled = true;
    return backend;
  }

  getPrimaryBackend(): Backend {
    for (const entry of this.backends.values()) {
      if (entry.isPrimary && entry.isEnabled) {
        return entry;
      }
    }
  }

  *getSecondaryBackends(): IterableIterator<Backend> {
    for (const entry of this.backends.values()) {
      if (!entry.isPrimary) {
        yield entry;
      }
    }
  }

  isPrimaryUnsaved(): boolean {
    return this.getPrimaryBackend().lastUpdate < this.lastUpdate;
  }

  *getUnsavedSecondaryBackends(): IterableIterator<Backend> {
    for (const entry of this.getSecondaryBackends()) {
      if (entry.isEnabled && entry.lastUpdate < this.lastUpdate) {
        yield entry;
      }
    }
  }

  areSecondaryBackendsUnsaved(): boolean {
    return !this.getUnsavedSecondaryBackends().next().done;
  }
}

const persistenceStore = new PersistenceStore();

export default persistenceStore;