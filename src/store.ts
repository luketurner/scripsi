import { observable, runInAction, spy } from 'mobx';
import * as _ from 'lodash';

import settingStore, { SettingStore } from './settings/store';
import nodeStore, { SNodeStore } from './nodes/store';
import persistenceStore, { PersistenceStore } from './persistent-storage/store';

export class GlobalStore {
  @observable settings: SettingStore;
  @observable nodes: SNodeStore;
  @observable persistence: PersistenceStore;

  constructor() {
    this.settings = settingStore;
    this.nodes = nodeStore;
    this.persistence = persistenceStore;
    
    spy(event => {
      if (event.type === 'action' && event.name.startsWith('node')) {
        runInAction('persistence.setUnsaved', () => this.persistence.isUnsaved = true);
      }
    });
  }
}

const store = new GlobalStore();
export default store;