import { observable } from 'mobx';

export interface DropboxConfig {
  accessToken?: string;
}

export class SettingStore {
  @observable public databaseName: string;
  @observable public dropboxConfig: DropboxConfig;

  constructor() {
    this.databaseName = 'scripsi';
    this.dropboxConfig = {
      accessToken: ''
    };
  }
}

const settings = new SettingStore();
export default settings;
