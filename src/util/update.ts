const _update = require('react-addons-update')

export function updateArray<T1, T2> (value: T1[], spec: __React.UpdateArraySpec): T2[] {
  return _update(value, spec)
}
export function update<T1, T2> (value: T1, spec: __React.UpdateSpec): T2 {
  return _update(value, spec)
}