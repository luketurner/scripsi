import * as LocalForage from 'localforage';
import {debounce} from 'lodash';

import { Backend } from './index';

const getKey = k => 'scripsi|' + k;

export default class LocalBackend extends Backend {

  public name = 'local';

  private client: LocalForage;

  constructor() {
    super();
    this.client = LocalForage.createInstance({
      driver: LocalForage.INDEXEDDB,
      name: 'scripsi'
    });
  }

  public async _load(key: string) {
    return new Promise<string>((resolve, reject) => {
      LocalForage.getItem<string>(getKey(key), (err, val) => {
        return err ? reject(err) : resolve(val);
      });
    });
  }

  public async _save(key, value) {
    return LocalForage.setItem(getKey(key), value);
  }

  public async _reset(key) {
    LocalForage.removeItem(key);
  }
}
