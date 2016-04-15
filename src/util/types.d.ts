/**
 * Compact interface replacing { [index: string]: MyType } with Dict<MyType>
 * 
 * @interface Dict
 * @template ValType
 */
declare interface Dict<ValType> {
  [index: string]: ValType
}