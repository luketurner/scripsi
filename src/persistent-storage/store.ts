import * as _ from 'lodash';

import { observable, autorunAsync, runInAction } from 'mobx';

import store from '../store';

export class PersistenceStore {
  @observable isUnsaved = false;

  constructor() {
    autorunAsync(() => {
      if (this.isUnsaved) {
        // TODO -- save me!
        runInAction('persistence.setUnsaved', () => this.isUnsaved = false);
      }
    }, 1000);
  }
}

const persistenceStore = new PersistenceStore();

export default persistenceStore;