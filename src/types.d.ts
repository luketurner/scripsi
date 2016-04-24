/**
 * Compact interface replacing { [index: string]: MyType } with Dict<MyType>
 * 
 * @interface Dict
 * @template ValType
 */
declare interface Dict<ValType> {
  [index: string]: ValType
}

/**
 * Defines a more explicit interface for Redux actions. 
 * 
 * @interface Action
 * @template T
 */
declare interface Action {
  type: string
  [key: string]: any
}