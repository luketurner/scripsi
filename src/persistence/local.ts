import LocalForage from 'localforage'
import {debounce} from 'lodash'


let getKey = (k) => 'scripsi|' + k

let load = (key) => {
  return new Promise((resolve, reject) => {
    LocalForage.getItem(getKey(key), (err, val) => {
      return err || !val ? reject(err) : resolve(JSON.parse(<string>(val)))
    })
  })
}

let save = (key, val) => LocalForage.setItem(getKey(key), JSON.stringify(val))

let reset = (key) => LocalForage.removeItem(key)

export default {
  authorize: () => {
    return new Promise((resolve, reject) => resolve())
  },
  loadState: load,
  saveState: save,
  resetState: reset
}
