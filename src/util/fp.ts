import * as _ from 'lodash'

type Path = string | Array<string>
type UpdateFunction<T> = { (oldVal: T): T }

/**
 * Performs an immutable update operation. Returns the updated object, while
 * leaving the original intact. Use it to update the Redux state.
 * 
 * @export
 * @template ObjType
 * @template PropType
 * @param {ObjType} object The object to update (is not mutated)
 * @param {Path} path The path (array or string) to update on the object
 * @param {UpdateFunction<PropType>} updater Function which takes the old value as an argument and returns the new value to insert
 * @returns {ObjType} A new version of the provided object with the given value mutated
 */
export function update<ObjType,PropType>(object: ObjType, path: Path, updater: UpdateFunction<PropType>): ObjType {
  return <ObjType>_.merge({}, object, _.update({}, path, updater))
}

/**
 * Performs an immutable set operation. Returns the new object without mutating
 * the original.
 * 
 * @export
 * @template ObjType
 * @template PropType
 * @param {ObjType} object Object to set value on
 * @param {Path} path path of value to set
 * @param {PropType} value new value
 * @returns {ObjType} A new version of the provided object with the given value overwritten
 */
export function set<ObjType,PropType>(object: ObjType, path: Path, value: PropType): ObjType {
  return update(object, path, () => value)
}

/**
 * Performs an immutable insertion.
 * 
 * @export
 * @template ItemType
 * @param {Array<ItemType>} list Original array
 * @param {number} index Index at which to insert new value
 * @param {ItemType} item value to insert into array
 * @returns {Array<ItemType>} New version of the original array with the new value inserted
 */
export function insert<ItemType>(list: Array<ItemType>, index: number, item: ItemType): Array<ItemType> {
  let newList = _.clone(list)
  newList.splice(index, 0, item)
  return newList
}

export function append<ItemType>(list: Array<ItemType>, item: ItemType): Array<ItemType> {
  let newList = _.clone(list)
  newList.push(item)
  return newList
}