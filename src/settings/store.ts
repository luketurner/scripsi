import { observable } from 'mobx';

export interface DropboxConfig {
  accessToken?: string
}

export class SettingStore {
  @observable databaseName: string;
  @observable dropboxConfig: DropboxConfig;

  constructor() {
    this.databaseName = 'scripsi';
    this.dropboxConfig = {
      accessToken: ''
    }
  }
}

const settings = new SettingStore();
export default settings;