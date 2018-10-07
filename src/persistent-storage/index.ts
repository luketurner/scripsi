import * as _ from 'lodash';
import nodeStore, { SNodeStore } from '../nodes/store';
import { BackendSettings } from '../settings/backends';
import settingsStore from '../settings/store';
import * as backends from './backends';
import { InvalidPersistenceOperation, MissingStateError } from './errors';

import { action, autorun, computed, observable, reaction, runInAction, spy, toJS } from 'mobx';

export interface Persistable {
  loadState(newState: string);
}

export class PersistentStorage<StateType extends Persistable> {
  @observable public lastUpdate: number;
  @observable public backends: Map<string, backends.Backend>;
  @observable private settings: BackendSettings;
  @observable private currentState: StateType;

  /**
   * Observable serialized state. Can be watched in reactions, etc.
   * Prefer this instead of manually JSON stringifying currentState,
   * because this property is only recomputed when state changes.
   */
  @computed private get currentStateString() {
    return JSON.stringify(this.currentState);
  }

  /**
   * Creates a PersistentStorage object.
   *
   * @param {BackendSettings} settingsToWatch
   * @param {StateType} stateToWatch
   * @memberof PersistentStorage
   */
  constructor(settingsToWatch: BackendSettings, stateToWatch: StateType) {

    this.backends = new Map();
    this.addBackend(new backends.LocalBackend());
    this.addBackend(new backends.DropboxBackend());

    autorun(() => { // TODO -- will this ever run more than once?
      this.settings = settingsToWatch;
      this.currentState = stateToWatch;
    });

    // Define a "master" state observer. Whenever the underlying state object is changed,
    // or a backend is added/removed, this will re-run and trigger a resave.
    // TODO -- this means when a new backend is added/removed,
    // all existing backends resave unnecessarily. Use separate subscriptions?
    reaction(() => ({
      state: this.currentStateString,
      backends: this.getBackends()
    }), _.debounce(data => this.saveAllBackends(data), 250));
  }

  @action('persistence.addBackend')
  public addBackend(backend: backends.Backend) {
    this.backends.set(backend.name, backend);
  }

  @action('persistence.useBackendSettings')
  public useBackendSettings(settings: BackendSettings) {
    this.settings = settings;
  }

  public getBackend(name: string) {
    return this.backends.get(name);
  }

  public async saveToBackend(backendName: string, lastUpdate: number, state: string) {
    const backend = this.getBackend(backendName);
    const key = this.settings.databaseName + '|nodes';
    if (backend.lastUpdate > lastUpdate) {
      // In the future, this may indicate that the backend has changes from another client.
      // tslint:disable-next-line:max-line-length
      return console.error(`Unable to save to backend: ${backend.name}. May overwrite changes from another client. (${backend.lastUpdate} -> ${this.lastUpdate})`);
    }
    if (backend.lastUpdate < lastUpdate) {
      try {
        console.debug(`Saving state to backend: ${backend.name} (${backend.lastUpdate} -> ${this.lastUpdate})`);
        await backend.save(key, state);
        runInAction(() => backend.lastUpdate = lastUpdate);
      } catch (err) {
        console.error(`Unable to save to backend: ${backend.name}. (${backend.lastUpdate} -> ${this.lastUpdate})`, err);
      }
    }
  }

  public *getBackends(): IterableIterator<backends.Backend> {
    const primary = this.getPrimaryBackend();
    if (primary) yield primary;
    yield* this.getSecondaryBackends();
  }

  public getPrimaryBackend(): backends.Backend {
    return this.getBackend(this.settings.primary);
  }

  public *getSecondaryBackends(): IterableIterator<backends.Backend> {
    for (const backendName of this.settings.secondary) {
      yield this.getBackend(backendName);
    }
  }

  public async loadFromBackend() {
    const key = this.settings.databaseName + '|nodes';
    const backend = this.getPrimaryBackend();
    const newState = await backend.load(key);
    if (!newState) {
      throw new MissingStateError();
    }
    this.currentState.loadState(newState);
  }

  public isPrimaryUnsaved(): boolean {
    return this.getPrimaryBackend().lastUpdate < this.lastUpdate;
  }

  public *getUnsavedSecondaryBackends(): IterableIterator<backends.Backend> {
    for (const backend of this.getSecondaryBackends()) {
      if (backend.lastUpdate < this.lastUpdate) {
        yield backend;
      }
    }
  }

  public areSecondaryBackendsUnsaved(): boolean {
    return !this.getUnsavedSecondaryBackends().next().done;
  }

  private async saveAllBackends(data) {
    const currentStateString = data.state;
    const lastUpdate = Date.now();
    this.lastUpdate = lastUpdate;
    for (const backend of data.backends) {
      await this.saveToBackend(backend.name, lastUpdate, currentStateString);
    }
  }
}

// Create singleton storage instance for node database
export const nodeStorage = new PersistentStorage(settingsStore.settings.backends, nodeStore);
