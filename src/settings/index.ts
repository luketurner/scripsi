import { computed, observable } from 'mobx';

import { Persistable } from '../persistent-storage/driver';
import { uuid } from '../util/uuid';
import { BackendSettings } from './backends';
import { DropboxBackendSettings } from './backends/dropbox';
import { LocalBackendSettings } from './backends/local';
import { CodeSettings } from './code';
import { SettingsObject } from './settings-object';

export class Settings extends SettingsObject implements Persistable {

  @observable public backends = new Map<Uuid, BackendSettings>();
  @observable public primaryBackendId: Uuid;
  @observable public backupBackendIds: Uuid[] = [];
  @observable public storagePrefix = 'scripsi:settings:'; // prefix for saving/loading settings
  @observable public code = new CodeSettings();

  @computed public get currentState() {
    return JSON.stringify(this);
  }

  public loadState(newState: string) {
    const newStateObject: Partial<Settings> = JSON.parse(newState);

    // Convert backends array from a POJO back to a Map().
    newStateObject.backends = new Map(Object.entries(newStateObject.backends || {}));

    this.hydrate(newStateObject);
  }

  public resetState() {
    const primaryId = uuid();
    this.backends.set(primaryId, new LocalBackendSettings({
      databaseName: 'scripsi',
      name: 'Local Storage',
    }));
    this.backends.set(uuid(), new DropboxBackendSettings({
      databaseName: 'scripsi',
      name: 'Dropbox',
    }));
    this.primaryBackendId = primaryId;
  }
}
