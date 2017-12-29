import * as _ from 'lodash';
import { observable, runInAction, spy } from 'mobx';

import nodeStore, { SNodeStore } from './nodes/store';
import settingStore, { SettingStore } from './settings/store';

export class GlobalStore {
  @observable public settings: SettingStore;
  @observable public nodes: SNodeStore;

  constructor() {
    this.settings = settingStore;
    this.nodes = nodeStore;
  }
}

const store = new GlobalStore();
export default store;
