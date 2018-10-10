import { observable } from 'mobx';

import { Backend } from '../../persistent-storage/backends';
import { DropboxSettings } from './dropbox';

export class BackendSettings {
  @observable public databaseName: string;
  @observable public primary: string;
  @observable public secondary: string[];
  @observable public dropbox: DropboxSettings;

  constructor() {
    this.databaseName = 'scripsi';
    this.primary = 'local'; // TODO -- get from PersistentStore?
    this.secondary = [];
    this.dropbox = new DropboxSettings();
  }
}
