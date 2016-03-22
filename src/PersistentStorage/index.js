import Local from './Local'

let stores = {
  local: Local
}

export function loadAppFrom (store) {
  return stores[store].loadApp()
}

export function loadNodeFrom (store, id) {
  return stores[store].loadNode(id)
}

export function saveAppTo (store, data) {
  return stores[store].saveApp(data)
}

export function saveNodeTo (store, data) {
  if (!data.id) {
    return new Promise((resolve, reject) => reject('node data does not have id property'))
  }
  return stores[store].saveNodeTo(data.id, data)
}
