import * as _ from 'lodash';
import { observable, runInAction, spy } from 'mobx';

import nodeStore, { SNodeStore } from './nodes/store';
import persistenceStore, { PersistenceStore } from './persistent-storage/store';
import settingStore, { SettingStore } from './settings/store';

export class GlobalStore {
  @observable public settings: SettingStore;
  @observable public nodes: SNodeStore;
  @observable public persistence: PersistenceStore;

  constructor() {
    this.settings = settingStore;
    this.nodes = nodeStore;
    this.persistence = persistenceStore;

    spy(event => {
      if (event.type === 'action' && event.name.startsWith('node')) {
        runInAction('persistence.setLastUpdate', () => this.persistence.lastUpdate = Date.now());
      }
    });
  }
}

const store = new GlobalStore();
export default store;
