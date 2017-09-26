import * as LocalForage from 'localforage';
import {debounce} from 'lodash';

const getKey = (k) => 'scripsi|' + k;

const load = (key) => new Promise((resolve, reject) => {
  LocalForage.getItem(getKey(key), (err, val) => {
    return err ? reject(err) : resolve(val);
  });
});

const save = async (key, val) => LocalForage.setItem(getKey(key), val);

const reset = async (key) => LocalForage.removeItem(key);

export default {
  authorize: async () => true,
  loadState: load,
  saveState: save,
  resetState: reset
}
