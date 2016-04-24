import LocalForage from 'localforage'

let getKey = (k) => 'scripsi|' + k

let load = (key) => {
  return new Promise((resolve, reject) => {
    LocalForage.getItem(getKey(key), (err, val) => {
      return err || !val ? reject(err) : resolve(JSON.parse(<string>(val)))
    })
  })
}

let save = (key, val) => {
  return new Promise((resolve, reject) => {
    LocalForage.setItem(getKey(key), JSON.stringify(val), (err, newVal) => {
      return err ? reject(err) : resolve(newVal)
    })
  })
}

export default {
  authorize: () => {
    return new Promise((resolve, reject) => resolve())
  },
  loadState: () => load('state'),
  saveState: (val) => save('state', val)
}