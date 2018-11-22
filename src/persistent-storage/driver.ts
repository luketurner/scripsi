import * as _ from 'lodash';
import * as uuid from 'uuid';
import * as backends from './backends';
import { MissingStateError } from './errors';

import { action, autorun, computed, observable, reaction, runInAction, spy, toJS } from 'mobx';
import { Settings } from '../settings';
import { DropboxBackendSettings } from '../settings/backends/dropbox';
import { LocalBackendSettings } from '../settings/backends/local';
import { DropboxBackendClient } from './backends/dropbox';
import { LocalBackendClient } from './backends/local';

export interface Persistable {
  currentState: string;
  loadState(newState: string);
  resetState();
}

/**
 * The PersistentStorageDriver class encapsulates logic for persisting application state.
 * It primarily operates in the background, automatically persisting any state changes
 * according to the current persistence settings.
 *
 * Application settings are persisted to the in-browser local storage. Settings storage location
 * is not configurable (yet).
 *
 * Non-setting application state is persisted based on the configuration described in the Settings.
 *
 * Expects both Settings and State to implement Persistable interface -- meaning they expose a "loadState"
 * function (that will be called when state is being restored from persistent storage) and a "currentState"
 * property, which should be an observable string that represents the desired state to be persisted.
 *
 * Once the driver has been created, and state and settings have been fully initialized, call the
 * watchState and watchSettings functions to enable background persistence.
 *
 * @export
 * @class PersistentStorageDriver
 * @template StateType Type of the state object being persisted
 */
export class PersistentStorageDriver<StateType extends Persistable> {
  @observable public lastUpdate: number; // TODO -- should be in settings?

  @observable private clients: Map<string, backends.BackendClient>;
  @observable private state: StateType;
  @observable private settings: Settings;

  private readonly settingsStorageClient = window.localStorage;

  @computed public get hasUnsavedChanges() {
    for (const id of this.settings.backupBackendIds) {
      const client = this.clients.get(id);
      if (client && client.lastUpdate < this.lastUpdate) return true;
    }
    return false;
  }

  @computed public get hasUnsavedPrimary() {
    const client = this.clients.get(this.settings.primaryBackendId);
    if (!client) return false;
    return client.lastUpdate < this.lastUpdate;
  }

  /**
   * Creates a PersistentStorage object.
   *
   * @param {BackendSettings} settingsToWatch
   * @param {StateType} stateToWatch
   * @memberof PersistentStorage
   */
  constructor(settingsToWatch: Settings, stateToWatch: StateType) {

    this.clients = new Map();
    this.state = stateToWatch;
    this.settings = settingsToWatch;

    // Create clients for backends
    autorun(() => {
      for (const [backendId, backendSettings] of settingsToWatch.backends.entries()) {
        const client = { // Note -- using wrapper lambdas to fix type issue.
          dropbox: () => new DropboxBackendClient({settings: backendSettings as DropboxBackendSettings}),
          local: () => new LocalBackendClient({settings: backendSettings as LocalBackendSettings})
        }[backendSettings.type];

        if (!client) { throw new Error('Unknown backend type: ' + backendSettings.type); }

        this.clients.set(backendId, client());
      }

      // TODO -- remove clients for backends that have been deleted?
    });
  }

  public watchState() {

    // Set lastUpdate separately from the debounced save operation so we can use it to check up-to-dateness
    reaction(() => this.state.currentState, () => this.lastUpdate = Date.now(), { fireImmediately: true });

    // "observe" state and trigger save operations
    reaction(() => ({
      backendSettings: this.settings.backends,
      currentState: this.state.currentState,
      enabledBackends: [this.settings.primaryBackendId, ...this.settings.backupBackendIds],
      storagePrefix: this.settings.storagePrefix,
    }), async ({ enabledBackends, backendSettings, storagePrefix, currentState }) => {
      console.debug('Saving state to backends...');
      const lastUpdate = this.lastUpdate;
      const promises = [];
      for (const backendId of enabledBackends) {
        const backendClient = this.clients.get(backendId);
        const storageKey = storagePrefix + backendClient.settings.databaseName;
        promises.push(backendClient.save(storageKey, currentState, lastUpdate));
      }
      await Promise.all(promises);
      console.debug('Saved.');
    }, { delay: 500, fireImmediately: true });
  }

  public watchSettings() {
    autorun(() => {
      console.debug('Saving settings...');
      this.settingsStorageClient.setItem(`${this.settings.storagePrefix}settings`, this.settings.currentState);
    });
  }

  @action('storageDriver.loadSettingsFromBrowser')
  public async loadSettingsFromBrowser() {
    const browserSettings = this.settingsStorageClient.getItem(`${this.settings.storagePrefix}settings`);
    if (browserSettings) {
      this.settings.loadState(browserSettings);
    } else {
      this.settings.resetState();
    }
  }

  @action('storageDriver.loadStateFromBackend')
  public async loadStateFromBackend() {
    const primaryBackendClient = this.clients.get(this.settings.primaryBackendId);
    if (!primaryBackendClient) return console.debug('Cannot load from backend. Cannot find backend for', this.settings.primaryBackendId);
    const storageKey = this.settings.storagePrefix + primaryBackendClient.settings.databaseName;
    const newState = await primaryBackendClient.load(storageKey);
    if (!newState) {
      throw new MissingStateError();
    }
    this.state.loadState(newState);
  }

  @action('storageDriver.authenticateBackend')
  public async authenticateBackend(id: string) {
    const client = this.clients.get(id);
    if (!client) throw new Error(`Unknown backend ${id}`);
    await client.authenticate();
  }
}
