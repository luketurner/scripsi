import LocalForage from 'localforage'

const key = 'scripsi'

export function authorize () {
  return new Promise((resolve, reject) => resolve())
}

export function get () {
  return new Promise((resolve, reject) => {
    LocalForage.getItem(key, (err, val) => {
      return err ? reject(err) : resolve(val)
    })
  })
}

export function set (val) {
  return new Promise((resolve, reject) => {
    LocalForage.setItem(key, val, (err, val) => {
      return err ? reject(err) : resolve(val)
    })
  })
}
