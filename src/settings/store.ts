import { observable } from 'mobx';

export class SettingStore {
  @observable databaseName;

  constructor() {
    this.databaseName = 'scripsi';
  }
}

const settings = new SettingStore();
export default settings;