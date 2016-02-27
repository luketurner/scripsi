import LocalForage from 'localforage'

const key = 'scripsi'

export default {
  authorize: () => {
    return new Promise((resolve, reject) => resolve())
  },
  load: () => {
    return new Promise((resolve, reject) => {
      LocalForage.getItem(key, (err, val) => {
        return err ? reject(err) : resolve(val)
      })
    })
  },
  save: (val) => {
    return new Promise((resolve, reject) => {
      LocalForage.setItem(key, val, (err, val) => {
        return err ? reject(err) : resolve(val)
      })
    })
  }
}
