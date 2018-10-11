import * as _ from 'lodash';
import nodeStore from '../nodes/store';
import { BackendSettings } from '../settings/backends';
import settingsStore from '../settings/store';
import * as backends from './backends';
import { MissingStateError } from './errors';

import { action, autorun, computed, observable, reaction, runInAction, spy, toJS } from 'mobx';

export interface Persistable {
  loadState(newState: string);
}

export class PersistentStorage<StateType extends Persistable> {
  @observable public lastUpdate: number; // TODO -- should be in settings?

  @observable private backends: Map<string, backends.Backend>;
  @observable private currentState: StateType;
  @observable private currentSettings: BackendSettings;

  /**
   * Observable serialized state. Can be watched in reactions, etc.
   * Prefer this instead of manually JSON stringifying currentState,
   * because this property is only recomputed when state changes.
   */
  @computed private get currentStateString() {
    return JSON.stringify(this.currentState);
  }

  @computed private get primaryBackend(): backends.Backend {
    return this.getBackend(this.currentSettings.primary);
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
    this.addBackend('local', new backends.LocalBackend());
    this.addBackend('dropbox', new backends.DropboxBackend());

    autorun(() => { // TODO -- will this ever run more than once?
      this.currentSettings = settingsToWatch;
      this.currentState = stateToWatch;
    });

    // Define a "master" state observer. Whenever the underlying state object is changed,
    // or a backend is added/removed, this will re-run and trigger a resave.
    // TODO -- this means when a new backend is added/removed,
    // all existing backends resave unnecessarily. Use separate subscriptions?
    reaction(() => ({
      backends: this.backends,
      state: this.currentStateString
    }), _.debounce(data => this.saveAllBackends(data), 250));
  }

  @action('persistence.addBackend')
  public addBackend(name: string, backend: backends.Backend) { this.backends.set(name, backend); }

  public getBackend(name: string) { return this.backends.get(name); }
  public getAllBackends() { return Array.from(this.backends.entries()); }
  public isPrimaryUnsaved(): boolean { return this.primaryBackend.lastUpdate < this.lastUpdate; }

  public areSecondaryBackendsUnsaved(): boolean {
    for (const name of this.currentSettings.secondary) {
      const backend = this.getBackend(name);
      if (backend && backend.lastUpdate < this.lastUpdate) {
        return true;
      }
    }
    return false;
  }

  public async loadFromBackend() {
    const key = this.currentSettings.databaseName + '|nodes';
    const backend = this.primaryBackend;
    const newState = await backend.load(key);
    if (!newState) {
      throw new MissingStateError();
    }
    this.currentState.loadState(newState);
  }

  private async saveAllBackends(data: { backends: Map<string, backends.Backend>, state: string }) {
    const currentStateString = data.state;
    const lastUpdate = Date.now();
    this.lastUpdate = lastUpdate;
    for (const name of _.uniq(this.currentSettings.secondary.concat([this.currentSettings.primary]))) {
      const backend = this.getBackend(name);
      await this.saveToBackend(backend, name, lastUpdate, currentStateString);
    }
  }

  private async saveToBackend(backend: backends.Backend, name: string, lastUpdate: number, state: string) {
    const key = this.currentSettings.databaseName + '|nodes';
    if (backend.lastUpdate > lastUpdate) {
      // In the future, this may indicate that the backend has changes from another client.
      // tslint:disable-next-line:max-line-length
      return console.error(`Unable to save to backend: ${name}. May overwrite changes from another client. (${backend.lastUpdate} -> ${this.lastUpdate})`);
    }
    if (backend.lastUpdate < lastUpdate) {
      try {
        console.debug(`Saving state to backend: ${name} (${backend.lastUpdate} -> ${this.lastUpdate})`);
        await backend.save(key, state);
        runInAction(() => backend.lastUpdate = lastUpdate);
      } catch (err) {
        console.error(`Unable to save to backend: ${name}. (${backend.lastUpdate} -> ${this.lastUpdate})`, err);
      }
    }
  }
}

// Create singleton storage instance for node database
export const nodeStorage = new PersistentStorage(settingsStore.settings.backends, nodeStore);
