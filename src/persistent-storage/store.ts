import * as _ from 'lodash';

import { action, autorunAsync, observable, runInAction, toJS } from 'mobx';

import { SNode } from '../nodes';
import store from '../store';
import { InvalidPersistenceOperation, MissingStateError } from './errors';

import * as backends from './backends';

export class PersistenceStore {
  @observable public databaseName = 'scripsi';
  @observable public backends: Map<string, backends.Backend>;
  @observable public lastUpdate: number;

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
      await Promise.all(_.map(this.backends.values(), async backend => this.saveToBackend(backend, lastUpdate, state)));
    }, 1000);
  }

  @action('persistence.addBackend')
  public addBackend(backend: backends.Backend) {
    this.backends.set(backend.name, backend);
  }

  @action('persistence.loadState')
  public loadState(newState) {
    store.nodes.rootNode = newState.rootNode;
    store.nodes.viewRootNode = newState.viewRootNode;

    store.nodes.index.clear();
    Object.entries(newState.index).forEach(([x, y]) => store.nodes.addNode(new SNode(y)));
  }

  public async loadFromBackend() {
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
  public enableBackend(backendName: string): backends.Backend {
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

  public getPrimaryBackend(): backends.Backend {
    for (const entry of this.backends.values()) {
      if (entry.isPrimary && entry.isEnabled) {
        return entry;
      }
    }
  }

  public *getSecondaryBackends(): IterableIterator<backends.Backend> {
    for (const entry of this.backends.values()) {
      if (!entry.isPrimary) {
        yield entry;
      }
    }
  }

  public isPrimaryUnsaved(): boolean {
    return this.getPrimaryBackend().lastUpdate < this.lastUpdate;
  }

  public *getUnsavedSecondaryBackends(): IterableIterator<backends.Backend> {
    for (const entry of this.getSecondaryBackends()) {
      if (entry.isEnabled && entry.lastUpdate < this.lastUpdate) {
        yield entry;
      }
    }
  }

  public areSecondaryBackendsUnsaved(): boolean {
    return !this.getUnsavedSecondaryBackends().next().done;
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
        console.error(`Unable to save to backend: ${backend.name}. (${backend.lastUpdate} -> ${this.lastUpdate})`, err);
      }
    }
  }
}

const persistenceStore = new PersistenceStore();

export default persistenceStore;
