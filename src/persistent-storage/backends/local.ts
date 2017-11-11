import * as LocalForage from 'localforage';
import {debounce} from 'lodash';

import { Backend } from './index';

const getKey = (k) => 'scripsi|' + k;

export default class LocalBackend extends Backend {

  name = 'local';

  async _load(key) {
    return new Promise((resolve, reject) => {
      LocalForage.getItem(getKey(key), (err, val) => {
        return err ? reject(err) : resolve(val);
      });
    })
  }

  async _save(key, value) {
    console.log('len', JSON.stringify(value).length);
    return LocalForage.setItem(getKey(key), 'asdf');
  }

  async _reset(key) {
    LocalForage.removeItem(key);
  }
}