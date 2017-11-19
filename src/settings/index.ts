import { observable } from 'mobx';

import { DropboxSettings } from './dropbox';

export class Settings {
  @observable public databaseName: string;
  @observable public dropbox: DropboxSettings;

  constructor() {
    this.databaseName = 'scripsi';
    this.dropbox = new DropboxSettings();
  }
}