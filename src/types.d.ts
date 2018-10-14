/**
 * Compact interface replacing { [index: string]: MyType } with Dict<MyType>
 * 
 * @interface Dict
 * @template ValType
 */
declare interface Dict<ValType> {
  [index: string]: ValType
}

type Uuid = string;

 // from https://stackoverflow.com/questions/48215950/exclude-property-from-type/48216010#48216010
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
