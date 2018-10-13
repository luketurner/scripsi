import * as LocalForage from 'localforage';
import {debounce} from 'lodash';

import { observable } from 'mobx';
import { LocalBackendSettings } from '../../settings/backends/local';
import { BackendClient } from './index';

const getKey = k => 'scripsi|' + k;

export class LocalBackendClient extends BackendClient {

  @observable public settings: LocalBackendSettings;

  private client: LocalForage;

  constructor(params?: Partial<LocalBackendClient>) {
    super(params);
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

  public async _authenticate() {
    return;
  }
}
