import LocalForage from 'localforage'

let getKey = (k) => 'scripsi|' + k

let load = (key) => {
  return new Promise((resolve, reject) => {
    LocalForage.getItem(getKey(key), (err, val) => {
      return err || !val ? reject(err) : resolve(val)
    })
  })
}

let save = (key, val) => {
  return new Promise((resolve, reject) => {
    LocalForage.setItem(getKey(key), val, (err, newVal) => {
      return err ? reject(err) : resolve(newVal)
    })
  })
}

export default {
  authorize: () => {
    return new Promise((resolve, reject) => resolve())
  },
  loadApp: () => load('_app'),
  loadNode: (id) => load(id),
  saveApp: (val) => save('_app', val),
  saveNode: (id, val) => save(id, val)
}
