import Local from './Local'

let stores = {
  local: Local
}

const defaultData = {
  id: '12345',
  content: 'Anode',
  type: 'ListItem',
  children: [
    {
      id: '12355',
      content: 'Inode',
      type: 'ListItem',
      children: []
    },
    {
      id: '12355',
      content: 'Inode',
      type: 'ListItem',
      children: []
    }
  ]
}

export function loadFrom (store) {
  return stores[store].load()
    .then((data) => data || defaultData)
}

export function saveTo (store, data) {
  return stores[store].save(data)
}
