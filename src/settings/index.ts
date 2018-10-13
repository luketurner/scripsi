import { observable, autorun, computed } from 'mobx';

import * as uuid from 'uuid';
import { Persistable } from '../persistent-storage/driver';
import { BackendSettings } from './backends';
import { DropboxBackendSettings } from './backends/dropbox';
import { LocalBackendSettings } from './backends/local';

export class Settings implements Persistable {

  @observable public backends: Map<Uuid, BackendSettings>;
  @observable public primaryBackendId: Uuid;
  @observable public backupBackendIds: Uuid[];
  @observable public storagePrefix: string; // prefix for saving/loading settings

  constructor() {
    this.backends = new Map();
    this.backupBackendIds = [];
    this.storagePrefix = 'scripsi:settings:';
  }

  @computed public get currentState() {
    return JSON.stringify(this);
  }

  public loadState(newState: string) {
    this.hydrate(JSON.parse(newState));
  }

  public resetState() {
    const primaryId = uuid.v4();
    this.backends.set(primaryId, new LocalBackendSettings({
      databaseName: 'scripsi',
      name: 'Local Storage',
    }));
    this.backends.set(uuid.v4(), new DropboxBackendSettings({
      databaseName: 'scripsi',
      name: 'Dropbox',
    }));
    this.primaryBackendId = primaryId;
  }

  private hydrate(params: Partial<Settings>) {
    this.backends = new Map(Object.entries(params.backends || {}));
    this.primaryBackendId = params.primaryBackendId;
    this.backupBackendIds = params.backupBackendIds || [];
    this.storagePrefix = params.storagePrefix || this.storagePrefix;
  }
}
